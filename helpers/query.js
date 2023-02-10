import qs from 'query-string'
import { normalizeString } from '../utils/string'

/**
 * 查询辅助
 *
 * @param {Object} queryData {'查询名': '默认查询值'}
 * @returns
 */
export default function (queryData = {}) {
	return {
		watchQuery: true,
		data() {
			let { query } = this.$route
			let { pageIndex, pageSize } = query
			//分页组件参数
			pageIndex = (pageIndex && parseInt(pageIndex, 10)) || 1
			pageSize = (pageSize && parseInt(pageSize, 10)) || 10
			//自定义数据
			let queryObject = { pageIndex, pageSize }
			Object.keys(queryData).forEach(
				(key) => (queryObject[key] = query[key] == null || query[key] === '' ? queryData[key] : normalizeString(query[key]))
			)
			return { queryObject }
		},
		computed: {
			queryString() {
				return qs.stringify(this.queryObject)
			}
		},
		methods: {
			replaceQueryObject(object) {
				if (this.$router) this.$router.push('?' + qs.stringify(Object.assign({ ...this.queryObject }, object)))
			}
		}
	}
}
