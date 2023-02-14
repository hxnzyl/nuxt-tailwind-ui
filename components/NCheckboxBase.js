import NFormValidator from './NFormValidator'
import tailwindui from './tailwindui'

export default {
	mixins: [NFormValidator],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		//多选框值
		value: [Boolean, String, Number],
		//选中值
		checkedValue: { type: [String, Number], default: 1 },
		//选中值
		uncheckedValue: { type: [String, Number], default: 0 },
		//选中颜色
		checkedColor: { type: String, default: 'blue' },
		//选中颜色
		uncheckedColor: { type: String, default: 'none' },
		//大小
		size: { type: String, default: 'md' },
		//文本class
		textboxClass: String,
		//填充模式
		fill: Boolean,
		//禁用状态
		disabled: Boolean
	},
	computed: {
		checked() {
			return this.currentValue === this.checkedValue
		},
		invalidColor() {
			if (this.disabled) return 'gray'
			if (this.invalidField) return 'red'
			return this.checked ? this.checkedColor : this.uncheckedColor
		},
		checkedClass() {
			if (this.disabled) return 'gray'
			if (this.invalidField) return 'red'
			let color = !this.fill ? (this.checked ? this.checkedColor : this.uncheckedColor) : 'white'
			return tailwindui.bgColor(color, this.disabled)
		},
		checkboxClass() {
			return [
				tailwindui.checkboxSize(this.size),
				this.fill && this.checked ? '' : 'border',
				this.fill ? tailwindui.bgColor(this.invalidColor, this.disabled) : tailwindui.borderColor(this.invalidColor, this.disabled),
				tailwindui.textColor(this.invalidColor, this.disabled)
			]
		}
	},
	watch: {
		value(newValue, oldValue) {
			if (newValue !== oldValue) this.updateValue(false, newValue)
		}
	},
	data() {
		return {
			currentValue: null
		}
	},
	mounted() {
		this.updateValue(true, this.value)
	},
	methods: {
		updateValue(init, value) {
			this.currentValue = value === this.checkedValue ? this.checkedValue : this.uncheckedValue
			init || this.$nextTick(() => this.validate('change'))
		},
		onChange() {
			this.currentValue = this.checked ? this.uncheckedValue : this.checkedValue
			this.$emit('change', this.currentValue)
			this.$nextTick(() => this.validate('change'))
		}
	}
}
