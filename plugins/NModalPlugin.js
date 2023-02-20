import Vue from 'vue'
import NModal from '../components/NModal'

function NModalPlugin() {
	this.component = null
	this.name = '$nModal'
}

function createNModal(plugin, propsData) {
	if (plugin.component) return plugin.component
	const VueExtend = Vue.extend(NModal)
	plugin.component = new VueExtend({ propsData }).$mount()
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
	show(title, message) {
		createNModal(this, { title, message }).show()
	},
	hide() {
		if (this.component) this.component.hide(), (this.component = null)
	},
	confirm() {},
	success(title, message) {
		createNModal(this, { title, message, icon: 'check-circle', bodyClass: 'gap-4 text-green-500' }).show()
	},
	error(title, message) {
		createNModal(this, { title, message, icon: 'alert-triangle', bodyClass: 'gap-4 text-red-500' }).show()
	},
	warn() {},
	info() {}
}

export default NModalPlugin
