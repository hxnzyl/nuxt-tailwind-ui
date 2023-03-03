//nuxt默认配置
const dotenv = require('dotenv')
// const { resolve } = require('path')
const nuxtEnv = dotenv.config({ path: `.env.${process.env.MODE}` }).parsed

export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// ssr: https://nuxtjs.org/docs/configuration-glossary/configuration-ssr
	ssr: false,

	//环境变量，在一些扩展项中使用。如store,vue-router
	env: { ...nuxtEnv },

	//公有配置，this.$config
	// publicRuntimeConfig: {},

	//私有配置，敏感配置或服务端配置
	// privateRuntimeConfig: {},

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: nuxtEnv.APP_NAME,
		htmlAttrs: { lang: 'zh-cn' },
		// link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// tailwindcss Defaults options
	tailwindcss: {
		viewer: false,
		// or 'media' or 'class'
		// darkMode: 'class',
		config: {
			content: [
				'./aliasComponents/**/*.js',
				'./layouts/**/*.vue',
				'./pages/**/*.vue',
				'./plugins/**/*.js',
				'./nuxt.config.js'
			],
			plugins: []
		},
		corePlugins: {
			//@link https://www.tailwindcss.cn/docs/filter
			filter: false,
			//@link https://www.tailwindcss.cn/docs/screen-readers
			accessibility: false,
			//@link https://www.tailwindcss.cn/docs/backdrop-filter
			backdropSepia: false
		}
	},

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: {},

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		//https://go.nuxtjs.dev/tailwindcss
		//'nuxt' of 'this' issue: @link https://github.com/nuxt/framework/issues/9115
		'@nuxtjs/tailwindcss',
		//nuxt-tailwind-ui
		'./module'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		postcss: {
			plugins: {
				'postcss-import': {}, //预处理器, @link https://www.tailwindcss.cn/docs/using-with-preprocessors
				tailwindcss: {},
				'postcss-url': false,
				'postcss-nested': {},
				'postcss-responsive-type': {},
				'postcss-hexrgba': {},
				autoprefixer: {
					grid: true
				}
			}
		}
	}
}
