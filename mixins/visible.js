import { getMouseElement } from '../utils/dom'

export default {
	props: {
		//是否显示
		value: [Number, Boolean],
		//是否一直显示
		visible: Boolean,
		//显示位置
		position: { type: String, default: 'bottom' }
	},
	model: {
		prop: 'value',
		event: 'toggle'
	},
	watch: {
		value(newValue, oldValue) {
			if (newValue != oldValue) this.updateValue(false, newValue)
		}
	},
	data() {
		return {
			currentVisible: this.value || this.visible ? 1 : 0
		}
	},
	mounted() {
		this.updateValue(true, this.value)
	},
	methods: {
		updateValue(init, value) {
			init || this.toggle()
		},
		show() {
			if (this.visible) return
			this.currentVisible++
			this.$emit('toggle', true)
			this.$emit('show')
			//如果是表单相关组件引入时显示视为focus
			if (this.NForm) this.validate('focus')
		},
		hide() {
			if (this.visible) return
			this.currentVisible = 0
			this.$emit('toggle', false)
			this.$emit('hide')
			//如果是表单相关组件引入时隐藏视为blur
			if (this.NForm) this.validate('blur')
		},
		leave(event) {
			if (this.visible || !this.currentVisible) return
			let { root } = this.$refs
			if (!root) return
			let mouseElement = getMouseElement(event)
			if (!mouseElement || !Array.from(root.childNodes).concat(root).includes(mouseElement)) this.hide()
		},
		toggle() {
			if (this.visible) return
			if (this.currentVisible) this.show()
			else this.hide()
		}
	}
}
