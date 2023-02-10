const { resolve } = require('path')

module.exports = function nuxtTailwindUIModule(moduleOptions = {}) {
	const { components, tailwindcss, build, tailwindui = {} } = this.options
	const options = Object.assign({}, moduleOptions, tailwindui)

	// Add tailwindcss components dir
	tailwindcss.config.purge.push(resolve(__dirname, './components/**/*.{js,vue}'))

	// Add component dir
	components.dirs.push(resolve(__dirname, './components'))

	// Add component alias
	build.extend = (config) => {
		config.resolve.alias['@nuxt-tailwind-ui'] = resolve(__dirname, './')
	}

	// Add plugin
	this.addPlugin({
		src: resolve(__dirname, './plugin.js'),
		ssr: false,
		fileName: 'nuxt-tailwind-ui.js',
		options
	})
}

module.exports.meta = require('./package.json')
