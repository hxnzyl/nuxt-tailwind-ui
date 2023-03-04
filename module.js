import { resolve } from 'path'
import defu from 'defu'

import Glob from 'glob'
import pify from 'pify'

import consola from 'consola'

import { relativeTo } from '@nuxt/utils'

const glob = pify(Glob)

const meta = require('./package.json')

module.exports = function nuxtTailwindUIModule(_moduleOptions = {}) {
	const { runtimeConfig, css, tailwindcss, tailwindui = {} } = this.options
	const { resolver } = this.nuxt

	// Resolve dir
	const rootDir = resolve(__dirname, './')
	const svgDir = resolve(__dirname, './app/svg')
	const componentsDir = resolve(__dirname, './components')

	// Combine options
	const moduleOptions = {
		...tailwindui,
		..._moduleOptions,
		...(runtimeConfig && runtimeConfig.tailwindui)
	}

	// Apply defaults
	const options = defu(moduleOptions, {
		svg: {
			//开启预加载后,loader.include中的文件将被require
			preload: true,
			//开启预加载后,preloadFiles中的文件将被require
			preloadFiles: [],
			//svg加载器
			loader: {
				//Include Dirs
				// include: null,
				//Exclude Dirs
				// exclude: null
			}
		}
	})

	// Add Global Css
	css.push(resolve(__dirname, './assets/scss/animate.scss'))

	// Resolve svg include
	const svgIncludes = ['node_modules/feather-icons/dist/icons']
		.concat(options.svg.loader.include || [])
		.map((dir) => resolver.resolveAlias(dir))
	if (options.svg.preload) {
		this.nuxt.hook('builder:prepared', async (builder) => {
			for (let i = 0, l = svgIncludes.length; i < l; i++) {
				let svgs = await glob(svgIncludes[i].replace(/\\/g, '/') + '/**/*.svg')
				if (svgs && svgs.length > 0) {
					svgs.forEach((svg) =>
						options.svg.preloadFiles.push(
							relativeTo(resolver.options.rootDir, svg)
								.replace(/\\+/g, '/')
								// -> node_modules
								.replace('./node_modules/', '')
								// -> @
								.replace('./', '@/')
						)
					)
				}
			}
		})
	}

	// Add tailwindcss components dir
	const content = [componentsDir + '/**/*.{js,vue}', rootDir + '/utils/tailwindui.js']
	if (tailwindcss) {
		if (tailwindcss.config) {
			tailwindcss.config.content = (tailwindcss.config.content || []).concat(content)
		} else {
			tailwindcss.config = { content }
		}
	} else {
		this.options.tailwindcss = {
			config: {
				content
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
			include: svgIncludes.concat(svgDir)
		})
	})

	// Add plugin
	this.addPlugin({
		src: rootDir + '/plugin.js',
		ssr: false,
		fileName: 'nuxt-tailwind-ui.js',
		options
	})

	consola.info(meta.name + ': v' + meta.version)
}

module.exports.meta = meta
