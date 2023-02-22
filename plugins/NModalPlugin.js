import Vue from 'vue'
import NModal from '../components/NModal'

function NModalPlugin() {
	this.component = null
	this.name = '$nModal'
}

function createNModal(plugin, propsData, events) {
	if (plugin.component) return plugin.component
	const VueExtend = Vue.extend(NModal)
	plugin.component = new VueExtend({ propsData }).$mount()
	if (events) for (let type in events) plugin.component.$once(type, events[type])
	plugin.component.$once('hide', () => {
		if (!plugin.component) return
		document.body.removeChild(plugin.component.$el)
		plugin.component.$destroy()
		plugin.component = null
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
	confirm(title, message, icon = 'help-circle') {
		return new Promise((resolve) =>
			createNModal(
				this,
				{ title, message, showCancelButton: true, icon, bodyClass: 'gap-3' },
				{ confirm: () => resolve(true), cancel: () => resolve(false) }
			).show()
		)
	},
	success(title, message, icon = 'check-circle') {
		createNModal(this, { title, message, icon, bodyClass: 'gap-3 text-green-500' }).show()
	},
	error(title, message, icon = 'alert-triangle') {
		createNModal(this, { title, message, icon, bodyClass: 'gap-3 text-red-500' }).show()
	},
	warn() {},
	info() {}
}

export default NModalPlugin
