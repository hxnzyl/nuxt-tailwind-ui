// feather icons svg
const featherIconsFiles = require.context('feather-icons/dist/icons', false, /\.svg$/)

// Extends icons svg
const extendsIconsFiles = require.context('./icons', false, /\.svg$/)

const svgImport = (context) => context.keys().map(context)
svgImport(featherIconsFiles)
svgImport(extendsIconsFiles)

const pluginFiles = require.context('./plugins', true, /\.js$/)
const componentFiles = require.context('./components', true, /\.vue$/)
const aliasComponentsFiles = require.context('./aliasComponents', true, /\.js$/)

const injectPlugins = pluginFiles.keys().reduce((plugins, path) => plugins.concat(pluginFiles(path).default), [])

const exportComponents = {
	install(Vue) {
		injectPlugins.forEach((Plugin, plugin) => ((plugin = new Plugin()), (Vue.prototype[plugin.name] = plugin)))
		Object.keys(exportComponents).forEach((name, index) => index && Vue.component(name, exportComponents[name]))
	}
}

aliasComponentsFiles
	.keys()
	.forEach((path, component) => ((component = aliasComponentsFiles(path).default), (exportComponents[component.name] = component)))

componentFiles
	.keys()
	.forEach((path, component) => ((component = componentFiles(path).default), (exportComponents[component.name] = component)))

export default exportComponents
