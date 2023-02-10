import visible from '../mixins/visible'

export default {
	mixins: [visible],
	props: {
		title: String,
		message: String,
		showCancelButton: Boolean,
		clickMaskClose: { type: Boolean, default: true },
		clickConfirmClose: { type: Boolean, default: true }
	},
	data() {
		return {
			currentTitle: this.title || '',
			currentMessage: this.message || ''
		}
	},
	watch: {
		title(newValue, oldValue) {
			if (newValue !== oldValue) this.currentTitle = newValue
		},
		message(newValue, oldValue) {
			if (newValue !== oldValue) this.currentMessage = newValue
		}
	},
	methods: {
		onClickMask() {
			if (this.clickMaskClose) this.hide()
		},
		show(title, message) {
			this.currentTitle = message ? title : ''
			this.currentMessage = message || title || ''
			visible.methods.show.call(this)
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
