export default {
	props: {
		//允许使用动画
		allowAnimate: { type: Boolean, default: true },
		//进场动画名
		animateEnter: { type: String, default: 'zoomIn' },
		//离场动画名
		animateLeave: { type: String, default: 'zoomOut' }
	},
	data() {
		return {
			animateTimer: null
		}
	},
	methods: {
		/**
		 * 执行动画
		 */
		animate(name) {
			return new Promise((resolve) => {
				if (!this.allowAnimate || this.animateTimer) return resolve(false)
				let { root } = this.$refs
				if (!root) return resolve(false)
				let rootElement = root.$el || root
				rootElement.classList.add('animate__animated', 'animate__' + name)
				rootElement.style.setProperty('--animate-duration', '0.15s')
				this.animateTimer = setTimeout(() => {
					rootElement.classList.remove('animate__animated', 'animate__' + name)
					rootElement.style.removeProperty('--animate-duration')
					this.animateTimer = null
					resolve(true)
				}, 150)
			})
		}
	}
}
