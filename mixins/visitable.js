import { getMouseElement } from '../utils/dom'

export default {
	model: {
		prop: 'value',
		event: 'toggle'
	},
	props: {
		//是否显示
		value: [Number, Boolean],
		//是否一直显示
		visible: Boolean,
		//显示位置
		position: { type: String, default: 'bottom' }
	},
	watch: {
		value(newValue, oldValue) {
			if (newValue !== oldValue) this.updateVisible(false, newValue)
		}
	},
	data() {
		return {
			currentVisible: 0
		}
	},
	mounted() {
		this.updateVisible(true, this.value)
	},
	methods: {
		updateVisible(init, value) {
			this.currentVisible = value + 0
			if (init) this.visible || value ? this.show() : this.hide()
			else value ? this.show() : this.hide()
		},
		show() {
			if (this.visible || this.formDisabled) return
			this.currentVisible++
			this.$emit('toggle', true)
			this.$emit('show')
		},
		hide() {
			if (this.visible || this.formDisabled) return
			this.currentVisible = 0
			this.$emit('toggle', false)
			this.$emit('hide')
		},
		leave(event) {
			if (this.visible || !this.currentVisible || this.formDisabled) return
			let { root } = this.$refs
			if (!root) return
			let rootElement = root.$el || root
			let mouseElement = getMouseElement(event)
			if (!mouseElement || !rootElement.contains(mouseElement)) this.hide()
		},
		toggle() {
			if (this.currentVisible) this.hide()
			else this.show()
		}
	}
}
