export default {
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: Boolean,
		title: String,
		message: String,
		showCancelButton: Boolean,
		clickMaskClose: { type: Boolean, default: true },
		clickConfirmClose: { type: Boolean, default: true }
	},
	data() {
		return {
			currentValue: this.value || false,
			currentTitle: this.title || '',
			currentMessage: this.message || ''
		}
	},
	watch: {
		value(val) {
			if (val !== this.currentValue) this.currentValue = val
		},
		title(val) {
			if (val !== this.currentTitle) this.currentTitle = val
		},
		message(val) {
			if (val !== this.currentMessage) this.currentMessage = val
		}
	},
	methods: {
		onClickMask() {
			if (this.clickMaskClose) this.hide()
		},
		show(title, message) {
			this.currentValue = true
			this.currentTitle = message ? title : ''
			this.currentMessage = message || title || ''
			this.$emit('change', true)
		},
		hide() {
			this.currentValue = false
			this.currentMessage = ''
			this.$emit('change', false)
		},
		confirm() {
			if (this.clickConfirmClose) this.hide()
			this.$emit('confirm')
		},
		cancel() {
			this.hide()
			this.$emit('cancel')
		}
	}
}
