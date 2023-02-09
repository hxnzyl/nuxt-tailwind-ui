const pluginFiles = require.context('./plugins', true, /\.js$/)
const componentFiles = require.context('./components', true, /\.vue$/)

const injectPlugins = pluginFiles.keys().reduce((plugins, path) => plugins.concat(pluginFiles(path).default), [])

const exportComponents = componentFiles
	.keys()
	.reduce(
		(components, path, component) => (((component = componentFiles(path).default), (components[component.name] = component)), components),
		{
			install(Vue) {
				injectPlugins.forEach((Plugin, plugin) => ((plugin = new Plugin()), (Vue.prototype[plugin.name] = plugin)))
				Object.keys(exportComponents).forEach((name, index) => index && Vue.component(name, exportComponents[name]))
			}
		}
	)

export default exportComponents
