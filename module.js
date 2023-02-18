import { resolve } from 'path'
import defu from 'defu'

import Glob from 'glob'
import pify from 'pify'

import { relativeTo } from '@nuxt/utils'

const glob = pify(Glob)

module.exports = function nuxtTailwindUIModule(_moduleOptions = {}) {
	const { runtimeConfig, tailwindcss, tailwindui = {} } = this.options
	const { resolver } = this.nuxt

	// Resolve dir
	const rootDir = resolve(__dirname, './')
	const svgDir = resolve(__dirname, './app/svg')
	const componentsDir = resolve(__dirname, './components')
	const featherIconsDir = resolve(__dirname, './node_modules/feather-icons/dist/icons')

	// Combine options
	const moduleOptions = {
		...tailwindui,
		..._moduleOptions,
		...(runtimeConfig && runtimeConfig.tailwindui)
	}

	// Apply defaults
	const options = defu(moduleOptions, {
		svg: {
			preload: [],
			loader: {
				//Include Dirs
				// include: null,
				//Exclude Dirs
				// exclude: null
			}
		}
	})

	// Resolve svg include
	const svgIncludes = (options.svg.loader.include || []).map((dir) => resolver.resolveAlias(dir))
	if (svgIncludes && svgIncludes.length > 0) {
		this.nuxt.hook('builder:prepared', async (builder) => {
			for (let i = 0, l = svgIncludes.length; i < l; i++) {
				let svgs = await glob(svgIncludes[i] + '/**/*.svg')
				if (svgs && svgs.length > 0) {
					options.svg.preload = options.svg.preload.concat(
						svgs.map((svg) => relativeTo(resolver.options.rootDir, svg).replace(/\\+/g, '/'))
					)
				}
			}
		})
	}

	// Add component dir
	// components.dirs.push(componentsDir)

	// Add tailwindcss components dir
	const componentsGlob = [componentsDir + '/**/*.{js,vue}', rootDir + '/utils/tailwindui.js']
	if (tailwindcss) {
		let purge = tailwindcss.config && tailwindcss.config.purge
		tailwindcss.config.purge = (purge || []).concat(componentsGlob)
	} else {
		this.options.tailwindcss = {
			config: {
				purge: componentsGlob
			}
		}
	}

	// Add component alias
	this.extendBuild((config) => {
		// Self alias
		config.resolve.alias['@nuxt-tailwind-ui'] = rootDir
		// Add feather-icons loader
		const svgRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'))
		if (svgRule) svgRule.test = /\.(png|jpe?g|gif|webp|avif)$/i
		config.module.rules.push({
			use: [{ loader: 'svg-sprite-loader' }],
			test: /\.svg$/i,
			...options.svg.loader,
			include: [svgDir, featherIconsDir].concat(svgIncludes)
		})
	})

	// Add plugin
	this.addPlugin({
		src: rootDir + '/plugin.js',
		ssr: false,
		fileName: 'nuxt-tailwind-ui.js',
		options
	})
}

module.exports.meta = require('./package.json')
