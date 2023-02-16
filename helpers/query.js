import qs from 'query-string'
import { normalizeString } from '../utils/string'

/**
 * 查询辅助
 *
 * @param {Object} queryData {'查询名': '默认查询值'}
 * @param {Object} queryData {'查询名': '默认查询值'}
 * @returns
 */
export default function (queryData = {}, querying = false) {
	return {
		watchQuery: true,
		data() {
			let { query } = this.$route
			//初始化分页参数
			let pageIndex = query.pageIndex || queryData.pageIndex
			let pageSize = query.pageSize || queryData.pageSize
			//正确化分页参数
			pageIndex = (pageIndex && parseInt(pageIndex, 10)) || 1
			pageSize = (pageSize && parseInt(pageSize, 10)) || 10
			//自定义数据
			let queryObject = { pageIndex, pageSize }
			Object.keys(queryData).forEach(
				(key) => (queryObject[key] = query[key] == null || query[key] === '' ? queryData[key] : normalizeString(query[key]))
			)
			return { queryObject, querying }
		},
		computed: {
			queryString() {
				return qs.stringify(this.queryObject)
			}
		},
		methods: {
			replaceQueryObject(object) {
				this.showLoading()
				this.$router.push('?_=' + Date.now() + '&' + qs.stringify(Object.assign({ ...this.queryObject }, object)))
				this.$nuxt.$once('routeChanged', this.hideLoading)
			},
			showLoading() {
				this.querying = true
			},
			hideLoading() {
				this.$nextTick(() => (this.querying = false))
			}
		}
	}
}
