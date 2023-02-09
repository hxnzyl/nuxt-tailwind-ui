import { getMouseElement } from '../utils/dom'

export default {
	props: {
		value: [String, Boolean],
		position: { type: String, default: 'bottom' }
	},
	model: {
		prop: 'value',
		event: 'toggle'
	},
	watch: {
		value(newValue, oldValue) {
			if (newValue != oldValue) {
				if (newValue) this.show()
				else this.hide()
			}
		}
	},
	data() {
		return {
			visibleNum: this.value ? 1 : 0
		}
	},
	methods: {
		show() {
			this.visibleNum++
			this.$emit('toggle', true)
			this.$emit('show')
		},
		hide() {
			this.visibleNum = 0
			this.$emit('toggle', false)
			this.$emit('hide')
		},
		leave(event) {
			if (!this.visibleNum) return
			let { visible } = this.$refs
			let mouseElement = getMouseElement(event)
			if (!mouseElement || !Array.from(visible.childNodes).concat(visible).includes(mouseElement)) this.hide()
		},
		toggle() {
			if (this.visibleNum) this.hide()
			else this.show()
		}
	}
}
