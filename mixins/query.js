import qs from 'query-string'

export default {
	props: {
		//查询对象
		queryObject: Object,
		//查询名称
		queryName: String
	},
	methods: {
		changeQueryObject(value) {
			if (this.queryName) {
				this.$nuxt.$loading.set(0)
				this.$router.push('?_=' + Date.now() + '&' + qs.stringify(Object.assign({ ...this.queryObject }, { [this.queryName]: value })))
			}
		}
	}
}
