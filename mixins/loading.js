export default {
	props: {
		loading: Boolean
	},
	watch: {
		loading(loading) {
			this.currentLoading = loading
		}
	},
	data() {
		return {
			currentLoading: this.loading
		}
	},
	methods: {
		showLoading() {
			this.currentLoading = true
		},
		hideLoading() {
			this.$nextTick(() => (this.currentLoading = false))
		}
	}
}
