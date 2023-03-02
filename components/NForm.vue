<template>
	<form
		class="n-form appearance-none flex flex-col gap-6 relative"
		@submit.stop.prevent="onSubmit"
		:autocomplete="autoComplete ? 'on' : 'off'"
	>
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
		//默认自动填入
		autoComplete: Boolean,
		//排版方向
		direction: { type: String, default: 'col' },
		//自动聚焦，默认true
		autoFocus: { type: Boolean, default: true }
	},
	data() {
		return {
			invalidRules: {},
			invalidFields: [],
			validateFields: [],
			//解耦
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
				if (!this.model) reject([false, new Error('Invalid Model'), []])
				else if (!this.fields.length) resolve([true, {}, []])
				else this._validteStart(resolve)
			})
		},
		async _validteStart(resolve) {
			this.invalidRules = {}
			this.invalidFields = []
			this.validateFields = this.fields.slice(0)
			await this._validteRun(resolve)
		},
		async _validteRun(resolve) {
			let field = this.validateFields.shift()
			if (field) {
				//Validate Running
				let [validate, invalidRules] = await field.validate()
				if (!validate && field.validateStatus !== 'abort')
					this.invalidFields.push(field), Object.assign(this.invalidRules, invalidRules)
				this._validteRun(resolve)
			} else {
				//Validate Finish
				let validate = Object.keys(this.invalidRules).length === 0
				resolve([validate, this.invalidRules, this.invalidFields])
				//Auto focus
				if (this.autoFocus && !validate) {
					let firstInvalidField = this.invalidFields[0]
					if (firstInvalidField && firstInvalidField.focus) this.$nextTick(() => firstInvalidField.focus())
				}
			}
		}
	}
}
</script>
