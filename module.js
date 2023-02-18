const { resolve } = require('path')
const { defu } = require('defu')

module.exports = function nuxtTailwindUIModule(_moduleOptions = {}) {
	const { runtimeConfig, components, tailwindcss, tailwindui = {} } = this.options

	// Resolve dir
	const rootDir = resolve(__dirname, './')
	const svgDir = resolve(__dirname, './assets/svg')
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
			//Include Dirs
			// include: null,
			//Exclude Dirs
			// exclude: null
		}
	})

	// Add component dir
	components.dirs.push(componentsDir)

	// Add tailwindcss components dir
	const componentsGlob = componentsDir + '/**/*.{js,vue}'
	if (tailwindcss) {
		let purge = tailwindcss.config && tailwindcss.config.purge
		tailwindcss.config.purge = (purge || []).concat(componentsGlob)
	} else {
		this.options.tailwindcss = {
			config: {
				purge: [componentsGlob]
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
			...options.svg,
			include: [svgDir, featherIconsDir].concat(options.svg.include || [])
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
