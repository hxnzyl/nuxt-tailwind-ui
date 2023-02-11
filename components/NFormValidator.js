import AsyncValidator from 'async-validator'

export default {
	inject: {
		NForm: { value: 'NForm', default: null }
	},
	props: {
		//字段名称
		name: String,
		//字段显示名
		label: String,
		//是否必填
		required: Boolean,
		//排版方向，默认row
		direction: String,
		//校验规则
		rules: Array,
		//占位文本
		placeholder: String
	},
	computed: {
		//错误信息默认使用占位符
		invalidMessage() {
			return (this.invalidField && this.invalidField.message) || this.placeholder
		},
		//用户未定义时，如果在表单中，使用表单的排版方向
		getDirection() {
			return this.direction || (this.name && this.NForm && this.NForm.direction) || ''
		},
		//校验规则中未定义时不必填
		getRequired() {
			let validateRules = this.name && this.NForm && this.NForm.validateRules
			if (!validateRules) return false
			if (this.required) return true
			let rules = validateRules[this.name]
			return rules && rules.length && rules.some((rule) => rule.required)
		}
	},
	data() {
		return {
			invalidField: null
		}
	},
	mounted() {
		if (this.name) {
			this.NForm.$emit(
				'NForm.addField',
				this,
				this.NForm && this.required ? [{ required: true, message: this.placeholder }].concat(this.rules || []) : this.rules || []
			)
		}
	},
	methods: {
		validate(trigger) {
			return new Promise((resolve) => {
				let rules = this.getRules(trigger)
				if (!rules.length) return this.validateOk(resolve)
				const validator = new AsyncValidator({ [this.name]: rules })
				const value = this.checked == null ? this.currentValue : this.checked || null
				validator.validate({ [this.name]: value }, { firstFields: true }, (errors) =>
					errors ? this.validateNo(resolve, errors) : this.validateOk(resolve)
				)
			})
		},
		validateOk(resolve) {
			if (this.NForm) this.NForm.$emit('validate', true, this.name, this.currentValue)
			this.invalidField = null
			resolve([true])
		},
		validateNo(resolve, errors) {
			if (this.NForm) this.NForm.$emit('validate', false, this.name, this.currentValue)
			this.invalidField = errors[0]
			resolve([false, errors[0]])
		},
		getRules(trigger) {
			return this.name && this.NForm
				? (this.NForm.validateRules[this.name] || []).reduce(
						(list, rule) => (
							(rule.trigger == null ||
								(typeof rule.trigger === 'string' && rule.trigger.split(',').includes(trigger)) ||
								(Array.isArray(rule.trigger) && rule.trigger.includes(trigger))) &&
								list.push({ ...rule }),
							list
						),
						[]
				  )
				: []
		}
	}
}
