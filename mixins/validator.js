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
		//label类名
		labelClass: String,
		//body类名
		bodyClass: String,
		//是否必填
		required: Boolean,
		//排版方向，默认row
		direction: String,
		//校验规则
		rules: Array,
		//占位文本
		placeholder: String,
		//默认自动填入，默认true
		autocomplete: { type: Boolean, default: true },
		//禁用状态
		disabled: Boolean
	},
	computed: {
		//错误信息默认使用占位符
		invalidMessage() {
			return (this.invalidField && this.invalidField.message) || this.placeholder
		},
		//优先使用表单禁用参数
		getDisabled() {
			return (this.NForm && this.NForm.disabled) || this.disabled
		},
		//优先使用表单自动填入参数
		getAutocomplete() {
			let formAutocomplete = this.NForm && this.NForm.autocomplete
			let thatAutocomplete = typeof formAutocomplete === 'boolean' ? formAutocomplete : this.autocomplete
			return thatAutocomplete ? '' : this.type === 'password' ? 'new-password' : 'off'
		},
		//用户未定义时，如果在表单中，使用表单的
		getDirection() {
			return this.direction || (this.NForm && this.NForm.direction) || ''
		},
		//用户未定义时，如果在表单中，使用表单的
		getLabelClass() {
			return this.labelClass || (this.NForm && this.NForm.labelClass) || ''
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
			//ing：验证中，abort：验证中断，ok：验证成功，no：验证失败
			validateStatus: 'ing',
			invalidField: null
		}
	},
	mounted() {
		if (this.name) {
			this.NForm.$emit(
				'NForm.addField',
				this,
				this.NForm && this.required
					? [{ required: true, message: this.placeholder }].concat(this.rules || [])
					: this.rules || []
			)
		}
	},
	methods: {
		validate(trigger) {
			return new Promise((resolve) => {
				if (this.validateStatus === 'ing') return (this.validateStatus = 'abort'), resolve([false])
				this.validateStatus = 'ing'
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
			this.validateStatus = 'ok'
			resolve([true])
		},
		validateNo(resolve, errors) {
			if (this.NForm) this.NForm.$emit('validate', false, this.name, this.currentValue)
			this.invalidField = errors[0]
			this.validateStatus = 'no'
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
