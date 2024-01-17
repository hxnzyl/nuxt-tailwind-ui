import Vue from 'vue'
import NModal from '../components/NModal'

function NModalPlugin() {
	this.components = {} //所有弹窗实例集合
	this.componentIndex = 0 //当前弹窗的索引
	this.name = '$nModal'
}

function createNModal(plugin, propsData, events) {
	const VueExtend = Vue.extend(NModal)
	let component = new VueExtend({ propsData }).$mount()
	let componentIndex = plugin.componentIndex
	if (events) for (let type in events) component.$once(type, events[type])
	component.$once('hide', () => {
		if (!component) return
		document.body.removeChild(component.$el)
		component.$destroy()
		component = null
		delete plugin.components[componentIndex]
	})
	document.body.appendChild(component.$el)
	return (plugin.components[plugin.componentIndex++] = component)
}

NModalPlugin.prototype = {
	show(title, message, options = {}) {
		createNModal(this, options).show(title, message)
	},
	hide() {
		const component = this.components[this.componentIndex]
		if (component) component.hide(), delete this.components[this.componentIndex]
	},
	confirm(title, message, icon = 'help-circle') {
		return new Promise((resolve) =>
			createNModal(
				this,
				{ showCancelButton: true, icon, rootClass: 'w-1/5', bodyClass: 'gap-3' },
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
