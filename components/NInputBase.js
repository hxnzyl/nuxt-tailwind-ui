import NFormValidator from './NFormValidator'

export default {
	mixins: [NFormValidator],
	model: {
		prop: 'value',
		event: 'input'
	},
	props: {
		//文本框值
		value: [String, Number],
		//轮廓环
		ring: { type: String, default: 'blue' },
		//大小
		size: { type: String, default: 'md' },
		//圆角
		rounded: { type: String, default: 'md' },
		//输入框类型
		type: { type: String, default: 'text' },
		//边框
		border: { type: Boolean, default: true },
		//禁用状态
		disabled: Boolean,
		//只读状态
		readonly: Boolean
	},
	computed: {
		currentValue() {
			return this.value == null ? '' : this.value + ''
		},
		inputClass() {
			return {
				'focus:ring-blue-500': this.ring == 'blue' && this.invalidField == null,
				'focus:ring-gray-500': this.ring == 'gray' && this.invalidField == null,
				'focus:ring-red-300': this.ring != 'none' && this.invalidField != null,
				'focus:ring-1 focus:ring-opacity-50': this.ring != 'none',
				'rounded-sm': this.rounded == 'sm' && !this.$slots.default,
				'rounded-tl-sm rounded-bl-sm': this.rounded == 'sm' && !!this.$slots.default,
				'rounded-md': this.rounded == 'md' && !this.$slots.default,
				'rounded-tl-md rounded-bl-md': this.rounded == 'md' && !!this.$slots.default,
				'rounded-lg': this.rounded == 'lg' && !this.$slots.default,
				'rounded-tl-lg rounded-bl-lg': this.rounded == 'lg' && !!this.$slots.default,
				'border-t border-b border-l ': this.border,
				'border-r': this.border && !this.$slots.default,
				'border-red-500': this.border && this.invalidField != null,
				'border-gray-200': this.border && this.invalidField == null,
				'text-gray-400 bg-gray-200 bg-opacity-50': this.disabled,
				'text-gray-500': !this.disabled,
				'cursor-default': this.readonly,
				'py-1 px-2': this.size == 'sm',
				'py-2 px-3': this.size == 'md',
				'py-3 px-4': this.size == 'lg',
				'py-4 px-5': this.size == 'xl'
			}
		}
	},
	watch: {
		currentValue() {
			this.updateValue(false)
		}
	},
	mounted() {
		this.updateValue(true)
	},
	methods: {
		updateValue(init) {
			let { input } = this.$refs
			if (input && input.value !== this.currentValue) input.value = this.currentValue
			init || this.$nextTick(() => this.validate('input'))
		},
		onInput(event) {
			let { value } = event.target
			if (value !== this.currentValue) this.$emit('input', value)
			this.$nextTick(() => this.validate('input'))
		},
		onFocus() {
			this.$emit('focus', this.currentValue)
			this.validate('focus')
		},
		onBlur() {
			this.$emit('blur', this.currentValue)
			this.validate('blur')
		}
	}
}
