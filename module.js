const { resolve } = require('path')

module.exports = function nuxtTailwindUIModule(moduleOptions = {}) {
	const { components, tailwindcss, tailwindui = {} } = this.options
	const options = Object.assign({}, moduleOptions, tailwindui)

	// Devlopment
	const dev = tailwindui.dev || process.env.NUXT_TAILWIND_UI_DEV === '1'

	// Add tailwindcss components dir
	tailwindcss.config.purge.push(resolve(__dirname, './components/**/*.{js,vue}'))

	// Add component dir
	components.dirs.push(resolve(__dirname, './components'))

	// Add plugin
	this.addPlugin({
		src: resolve(__dirname, dev ? './plugin.dev.js' : './plugin.js'),
		ssr: false,
		fileName: 'nuxt-tailwind-ui.js',
		options
	})
}

module.exports.meta = require('./package.json')
