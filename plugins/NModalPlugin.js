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
	show(title, message, options = {}) {
		createNModal(this, options).show(title, message)
	},
	hide() {
		if (this.component) this.component.hide(), (this.component = null)
	},
	confirm(title, message, icon = 'help-circle') {
		return new Promise((resolve) =>
			createNModal(
				this,
				{ showCancelButton: true, icon, rootClass: 'w-2/5', bodyClass: 'gap-3' },
				{ confirm: () => resolve(true), cancel: () => resolve(false) }
			).show(title, message)
		)
	},
	success(title, message, icon = 'check-circle') {
		createNModal(this, { icon, rootClass: 'w-2/5', bodyClass: 'gap-3 text-green-500' }).show(title, message)
	},
	error(title, message, icon = 'alert-triangle') {
		createNModal(this, { icon, rootClass: 'w-2/5', bodyClass: 'gap-3 text-red-500' }).show(title, message)
	},
	warn() {},
	info() {}
}

export default NModalPlugin
