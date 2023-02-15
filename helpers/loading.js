/**
 * 加载中辅助
 *
 * @param {Boolean} loading 默认加载状态
 * @returns
 */
export default function (loading = false) {
	return {
		data() {
			return {
				loading
			}
		},
		// created() {
		// 	if (loading) this.$nuxt.$once('routeChanged', this.hideLoading)
		// },
		methods: {
			showLoading() {
				this.loading = true
			},
			hideLoading() {
				this.$nextTick(() => (this.loading = false))
			}
		}
	}
}
