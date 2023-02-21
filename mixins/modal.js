import visible from './visible'

export default {
	mixins: [visible],
	props: {
		title: String,
		message: String,
		bodyClass: String,
		showCancelButton: Boolean,
		icon: String,
		iconSize: { type: String, default: 'lg' },
		showHeader: { type: Boolean, default: true },
		showFooter: { type: Boolean, default: true },
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
		//@overwrite visible.show
		show(title, message) {
			if (!title) title = this.title
			if (!message) message = this.message
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
