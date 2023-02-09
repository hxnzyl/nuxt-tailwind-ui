import Vue from 'vue'
import NModalNormal from '../components/NModal'
import NModalError from '../components/NModalError'
import NModalSuccess from '../components/NModalSuccess'

const NModalComponents = { NModalNormal, NModalError, NModalSuccess }

function NModalPlugin() {
	this.component = null
	this.name = '$nModal'
}

function createNModal(plugin, component) {
	if (plugin.component) return plugin.component
	const VueExtend = Vue.extend(NModalComponents[component])
	plugin.component = new VueExtend().$mount()
	plugin.component.$once('hide', () => {
		if (plugin.component) {
			document.body.removeChild(plugin.component.$el)
			plugin.component.$destroy()
			plugin.component = null
		}
	})
	document.body.appendChild(plugin.component.$el)
	return plugin.component
}

NModalPlugin.prototype = {
	show(...args) {
		createNModal(this, 'NModalNormal').show.apply(null, args)
	},
	hide() {
		if (this.component) this.component.hide(), (this.component = null)
	},
	confirm() {},
	success(...args) {
		createNModal(this, 'NModalSuccess').show.apply(null, args)
	},
	error(...args) {
		createNModal(this, 'NModalError').show.apply(null, args)
	},
	warn() {},
	info() {}
}

export default NModalPlugin
