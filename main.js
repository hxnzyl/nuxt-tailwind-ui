//#region Require svg
// Extends icons svg
const extendsIconsFiles = require.context('./app/svg', false, /\.svg$/)
extendsIconsFiles.keys().map(extendsIconsFiles)
//#endregion Require svg

//#region Require plugins
const plugins = {}

const pluginFiles = require.context('./plugins', true, /\.js$/)
pluginFiles.keys().forEach((path, plugin) => ((plugin = new (pluginFiles(path).default)()), (plugins[plugin.name] = plugin)))
//#endregion Require plugins

//#region Require components
const components = {}

// ui components
const componentsFiles = require.context('./components', true, /\.vue$/)
componentsFiles.keys().forEach((path, component) => ((component = componentsFiles(path).default), (components[component.name] = component)))

// alias components
const aliasesFiles = require.context('./aliasComponents', true, /\.js$/)
aliasesFiles.keys().forEach((path, component) => ((component = aliasesFiles(path).default), (components[component.name] = component)))
//#endregion Require components

export default {
	// import { ComponentName } from 'nuxt-tailwind-ui'
	...components,
	// import NuxtTailwindUI from 'nuxt-tailwind-ui'
	// Vue.use(NuxtTailwindUI)
	install(Vue) {
		for (let name in components) Vue.component(name, components[name])
		for (let name in plugins) Vue.prototype[name] = plugins[name]
	}
}
