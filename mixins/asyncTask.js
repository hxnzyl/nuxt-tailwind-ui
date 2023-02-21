/**
 * 让组件也具备获取异步数据的能力
 */

import loading from './loading'

export default {
	mixins: [loading],
	props: {
		//异步任务表达式：String: axios:post:/api/post@isSuccess:成功:errorMsg, axios:get:/api/get@result:options:errorMsg
		//异步任务配置：Object: {url: '', async success(response) {} }
		asyncTask: [String, Object]
	},
	data() {
		return {
			asyncTasks: {}
		}
	},
	mounted() {
		this.parseAsyncTask(this.asyncTask)
	},
	methods: {
		/**
		 * 解析异步任务
		 *
		 * @param {String, Object} asyncTask
		 * @returns
		 */
		parseAsyncTask(asyncTask) {
			switch (typeof asyncTask) {
				case 'object':
					if (asyncTask.url && asyncTask.method) this.asyncTasks[asyncTask.method] = asyncTask
					break
				case 'string':
					let [remote, callback] = asyncTask.split('@')
					let [inject, method, url] = (remote || '').split(':')
					let [successFlag, successMsg, failureFlag] = (callback || '').split(':')
					if (url && method) this.asyncTasks[method] = { inject, url, successMsg, successFlag, failureFlag }
					break
			}
		},
		/**
		 * 执行异步任务
		 *
		 * @param {String} method
		 * @param {Object} params
		 * @returns
		 */
		async executeAsyncTask(method, params) {
			if (this.currentLoading) return
			let task = this.asyncTasks[method]
			if (!task) return false
			this.showLoading()
			let response = null
			let { inject, url, callback, successMsg, successFlag, failureFlag } = task
			switch (inject) {
				//接口调用,params=request data,response->http response
				case 'axios':
					let { data } = await this.$axios[method](url, params)
					//自定义回调方法
					if (callback) response = await callback(data)
					//失败时提示错误信息,successFlag->成功标记
					else if (!data[successFlag]) (response = null), this.$nModal.error(data[failureFlag] || failureFlag)
					//get赋值到内部,successFlag->值标记
					else if (method === 'get') response = data[successFlag]
					//post提交后刷新,successFlag->成功标记
					else if (method === 'post') (response = data), this.$nModal.success(successMsg), await this.$nuxt.refresh()
					break
				//阿里云上传,params=file object,response->boolean
				case 'alioss':
					//需确返回值是链接地址
					let oosUrl = await this.$alioss.simpleUpload(url + params.name, params)
					//自定义回调方法
					if (callback) response = await callback(oosUrl)
					//失败时提示错误信息
					else if (!upload) (response = ''), failureFlag && this.$nModal.error(failureFlag)
					//成功时调用file的change方法
					else (response = oosUrl), successMsg && this.$nModal.success(successMsg)
					break
				//不存在的注入类型
				default:
					console.warn('nuxt-tailwind-ui:', `asyncTask.inject '${inject}' invalid`)
					break
			}
			this.hideLoading()
			return response
		}
	}
}
