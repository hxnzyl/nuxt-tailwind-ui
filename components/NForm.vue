<template>
	<form class="n-form appearance-none flex flex-col gap-6 relative" @submit.stop.prevent="onSubmit">
		<slot></slot>
		<NLoading v-show="currentLoading" size="lg" color="gray" mask></NLoading>
	</form>
</template>

<script>
import fields from '../mixins/fields'
import asyncTask from '../mixins/asyncTask'

export default {
	name: 'NForm',
	mixins: [fields('NForm', 'name'), asyncTask],
	props: {
		//检验对象
		model: Object,
		//校验规则
		rules: Object,
		//label类名
		labelClass: String,
		//禁用状态
		disabled: Boolean,
		//排版方向
		direction: { type: String, default: 'col' }
	},
	data() {
		return {
			invalidFields: {},
			validateFields: [],
			validateRules: this.rules ? { ...this.rules } : {}
		}
	},
	methods: {
		async onSubmit() {
			if (this.formDisabled) return
			let [validate] = await this.validate()
			if (!validate) return
			await this.executeAsyncTask('post', this.model)
			this.$emit('submit', this.model)
		},
		validate() {
			return new Promise((resolve, reject) => {
				if (!this.model) reject([false, new Error('Invalid Model')])
				else if (!this.fields.length) resolve([true])
				else this._validteStart(resolve)
			})
		},
		async _validteStart(resolve) {
			this.invalidFields = {}
			this.validateFields = this.fields.slice(0)
			await this._validteRun(resolve)
		},
		async _validteRun(resolve) {
			let field = this.validateFields.shift()
			if (!field) return resolve([Object.keys(this.invalidFields).length === 0, this.invalidFields])
			let [validate, invalidFields] = await field.validate()

			if (!validate && field.validateStatus !== 'abort') Object.assign(this.invalidFields, invalidFields)
			this._validteRun(resolve)
		}
	}
}
</script>
