<template>
	<div class="custom-error-page">
		<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#DBE1EC" viewBox="0 0 48 48">
			<path
				d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
			/>
		</svg>
		<div class="error">
			<template v-if="statusCode === 404">
				<div class="title">页面未找到</div>
				<p class="description">
					<a v-if="typeof $route === 'undefined'" class="error-link" href="/"></a>
					<NuxtLink v-else class="error-link" to="/">返回首页</NuxtLink>
				</p>
			</template>
			<div v-else class="message">页面发生错误啦，请联系平台管理员！！！</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NuxtError',
	props: {
		error: {
			type: Object,
			default: null
		}
	},
	computed: {
		statusCode() {
			return (this.error && this.error.statusCode) || 500
		},
		message() {
			return this.error.message || 'Error'
		},
		pageUrl() {
			return window.location.href || ''
		}
	},
	head() {
		return {
			title: this.message,
			meta: [
				{
					name: 'viewport',
					content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0'
				}
			]
		}
	}
}
</script>

<style>
.custom-error-page {
	padding: 1rem;
	background: #f7f8fb;
	color: #47494e;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: sans-serif;
	font-weight: 100 !important;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-webkit-font-smoothing: antialiased;
}
.custom-error-page .error {
	max-width: 450px;
}
.custom-error-page .message {
	font-size: 1.5rem;
	margin-top: 15px;
	color: #47494e;
	margin-bottom: 8px;
}
.custom-error-page .description {
	color: #7f828b;
	line-height: 21px;
	margin-bottom: 10px;
}
.custom-error-page a {
	color: #7f828b !important;
	text-decoration: none;
}
</style>
