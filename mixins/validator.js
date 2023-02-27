import AsyncValidator from 'async-validator'
import field from './field'

export default {
	mixins: [field('NForm')],
	props: {
		//字段名称
		name: String,
		//字段显示名
		label: String,
		//校验规则
		rules: Array,
		//label类名
		labelClass: String,
		//body类名
		bodyClass: String,
		//排版方向，默认row
		direction: String,
		//占位文本
		placeholder: String,
		//是否必填
		required: Boolean,
		//禁用状态
		disabled: Boolean,
		//默认自动填入，默认true
		autoComplete: { type: Boolean, default: true }
	},
	computed: {
		//错误信息默认使用占位符
		invalidMessage() {
			return this.invalidRule ? this.invalidRule.message || this.placeholder : ''
		},
		//优先使用表单禁用参数
		formDisabled() {
			return (this.NForm && this.NForm.disabled) || this.disabled
		},
		//校验规则中未定义时不必填
		formRequired() {
			let validateRules = this.name && this.NForm && this.NForm.validateRules
			if (!validateRules) return false
			if (this.required) return true
			let rules = validateRules[this.name]
			return rules && rules.length && rules.some((rule) => rule.required)
		},
		//优先使用表单自动填入参数
		formAutoComplete() {
			let formAutocomplete = this.NForm && this.NForm.autoComplete
			let thatAutocomplete = typeof formAutocomplete === 'boolean' ? formAutocomplete : this.autoComplete
			return thatAutocomplete ? '' : this.type === 'password' ? 'new-password' : 'off'
		},
		//用户未定义时，如果在表单中，使用表单的
		formColDirection() {
			return (this.direction || (this.NForm && this.NForm.direction)) === 'col'
		},
		formRowDirection() {
			return (this.direction || (this.NForm && this.NForm.direction)) === 'row'
		},
		//用户未定义时，如果在表单中，使用表单的
		formLabelClass() {
			return this.labelClass || (this.NForm && this.NForm.labelClass) || ''
		}
	},
	data() {
		return {
			//ing:验证中; abort:验证中断; ok:验证成功; no验证失败
			validateStatus: '',
			invalidRule: null
		}
	},
	mounted() {
		if (this.name) {
			let rules = this.rules ? this.rules.slice(0) : []
			if (this.NForm && this.required) rules.push({ required: true, message: this.placeholder })
			if (!rules.length) return
			let _rules = this.NForm.validateRules
			if (_rules[this.name]) _rules[this.name].push(...rules)
			else _rules[this.name] = rules
		}
	},
	methods: {
		validate(trigger) {
			return new Promise((resolve) => {
				if (this.formDisabled || this.validateStatus === 'ing')
					return (this.validateStatus = 'abort'), resolve([false, new Error('Abort')])
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
			this.invalidRule = null
			this.validateStatus = 'ok'
			resolve([true])
		},
		validateNo(resolve, errors) {
			if (this.NForm) this.NForm.$emit('validate', false, this.name, this.currentValue)
			this.invalidRule = errors[0]
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
