const { resolve } = require('path')

module.exports = function nuxtTailwindUIModule(moduleOptions = {}) {
	const { components, tailwindcss, tailwindui = {} } = this.options
	const options = Object.assign({}, moduleOptions, tailwindui)

	// Add tailwindcss components dir
	tailwindcss.config.purge.push(resolve(__dirname, './components/**/*.{js,vue}'))

	// Add component dir
	components.dirs.push(resolve(__dirname, './components'))

	// Add component alias
	this.extendBuild((config) => {
		// Self alias
		config.resolve.alias['@nuxt-tailwind-ui'] = resolve(__dirname, './')
		// Add feather-icons loader
		const svgRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'))
		// const featherIconsDir = resolve(__dirname, './node_modules/feather-icons/dist/icons')
		if (svgRule) svgRule.test = /\.(png|jpe?g|gif|webp|avif)$/i
		config.module.rules.push({ test: /\.svg$/i, use: [{ loader: 'svg-sprite-loader' }] })
	})

	// Add plugin
	this.addPlugin({
		src: resolve(__dirname, './plugin.js'),
		ssr: false,
		fileName: 'nuxt-tailwind-ui.js',
		options
	})
}

module.exports.meta = require('./package.json')
