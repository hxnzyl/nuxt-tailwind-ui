import { getMouseElement } from '../utils/dom'

export default {
	model: {
		prop: 'value',
		event: 'toggle'
	},
	props: {
		//是否显示
		value: Boolean,
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
			currentVisible: false
		}
	},
	mounted() {
		this.updateVisible(true, this.value)
	},
	methods: {
		updateVisible(init, value) {
			if (!init && Boolean(value) === this.currentVisible) return
			if (init) this.visible && this.show()
			else if (value) this.show()
			else this.hide()
		},
		async show() {
			if (this.visible || this.currentVisible || this.formDisabled) return false
			this.currentVisible = true
			if (this.animateEnter) await this.animate(this.animateEnter)
			this.$emit('toggle', true)
			this.$emit('show')
			return true
		},
		async hide() {
			if (this.visible || !this.currentVisible || this.formDisabled) return false
			if (this.animateLeave) await this.animate(this.animateLeave)
			this.currentVisible = false
			this.$emit('toggle', false)
			this.$emit('hide')
			return true
		},
		leave(event) {
			if (this.visible || !this.currentVisible || this.formDisabled) return false
			let { root } = this.$refs
			if (!root) return
			let rootElement = root.$el || root
			let mouseElement = getMouseElement(event)
			if (!mouseElement || !rootElement.contains(mouseElement)) this.hide()
			return true
		},
		toggle() {
			return this.currentVisible ? this.hide() : this.show()
		}
	}
}
