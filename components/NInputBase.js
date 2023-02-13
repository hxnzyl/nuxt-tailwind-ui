import NFormValidator from './NFormValidator'
import tailwindui from './tailwindui'

export default {
	mixins: [NFormValidator],
	model: {
		prop: 'value',
		event: 'input'
	},
	props: {
		//文本框值
		value: [String, Number],
		//文本颜色
		color: { type: String, default: 'gray' },
		//大小
		size: { type: String, default: 'md' },
		//输入框类型
		type: { type: String, default: 'text' },
		//是否有圆角
		rounded: { type: Boolean, default: true },
		//是否有边框
		border: { type: Boolean, default: true },
		//是否有轮廓环
		ring: { type: Boolean, default: true },
		//禁用状态
		disabled: Boolean,
		//只读状态
		readonly: Boolean
	},
	computed: {
		currentValue() {
			return this.value == null ? '' : this.value + ''
		},
		invalidColor() {
			if (this.disabled) return 'gray'
			if (this.invalidField) return 'red'
			return this.color
		},
		inputClass() {
			return [
				tailwindui.textColor(this.color),
				tailwindui.textBoxSize(this.size),
				this.ring ? 'focus:ring-1 focus:ring-opacity-50' : '',
				this.ring ? tailwindui.focusRingColor(this.invalidColor, this.disabled) : '',
				this.border ? (this.$slots.default ? 'border-t border-b border-l' : 'border') : '',
				this.border ? tailwindui.borderColor(this.invalidColor, this.invalidColor == 'gray') : '',
				this.rounded ? (this.$slots.default ? tailwindui.roundedTBLSize(this.size) : tailwindui.roundedSize(this.size)) : '',
				this.disabled ? 'bg-gray-200 bg-opacity-50' : '',
				this.readonly ? 'cursor-default' : ''
			]
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
