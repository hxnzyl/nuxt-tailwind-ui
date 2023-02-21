<template>
	<form class="n-form appearance-none flex flex-col gap-6 relative" @submit.stop.prevent="onSubmit">
		<slot></slot>
		<NMask v-show="disabled && !currentLoading" class="cursor-not-allowed"></NMask>
		<NLoading v-show="currentLoading" size="lg" color="gray" mask></NLoading>
	</form>
</template>

<script>
import loading from '../mixins/loading'

export default {
	name: 'NForm',
	mixins: [loading],
	model: {
		prop: 'model',
		event: 'input'
	},
	provide() {
		return {
			NForm: this
		}
	},
	props: {
		//检验对象
		model: Object,
		//校验规则
		rules: Object,
		//排版方向
		direction: { type: String, default: 'col' },
		//label类名
		labelClass: String,
		//表单禁用
		disabled: Boolean
	},
	data() {
		return {
			fields: [],
			invalidFields: {},
			validateFields: [],
			validateRules: this.rules ? { ...this.rules } : {}
		}
	},
	created() {
		this.$on('NForm.addField', this.addField)
		this.$on('NForm.removeField', this.removeField)
	},
	methods: {
		async onSubmit() {
			let [validate] = await this.validate()
			if (validate) this.$emit('submit', this.model)
		},
		validate() {
			return new Promise((resolve, reject) => {
				if (!this.model) reject(false)
				else if (!this.fields.length) resolve(true)
				else this._validteStart(resolve)
			})
		},
		addField(field, rules) {
			let name = field && field.name
			if (!name) return
			if (this.fields.findIndex((f) => f.name === name) === -1) this.fields.push(field)
			if (rules && rules.length) this.validateRules[name] = (this.validateRules[name] || []).concat(rules)
		},
		removeField(field, index) {
			field && field.name && (index = this.fields.findIndex((f) => f.name === field.name)) && this.fields.splice(index, 1)
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
			if (!validate) Object.assign(this.invalidFields, invalidFields)
			this._validteRun(resolve)
		}
	}
}
</script>
