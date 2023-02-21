import validator from './validator'
import tailwindui from '../utils/tailwindui'

export default {
	mixins: [validator],
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
			let color
			if (this.getDisabled) color = 'gray'
			else if (this.invalidField) color = 'red'
			else color = !this.fill ? (this.checked ? this.checkedColor : this.uncheckedColor) : 'white'
			return tailwindui.bgColor(color)
		},
		checkboxClass() {
			return [
				this.getDisabled ? 'bg-opacity-50 text-opacity-50' : '',
				tailwindui.checkboxSize(this.size),
				this.fill && this.checked ? '' : 'border',
				this.fill ? tailwindui.bgColor(this.invalidColor) : tailwindui.borderColor(this.invalidColor),
				tailwindui.textColor(this.invalidColor)
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
			if (init) return
			this.$emit('change', this.currentValue)
			if (this.name) this.$nextTick(() => this.validate('change'))
		},
		onChange() {
			if (this.getDisabled) return
			this.currentValue = this.checked ? this.uncheckedValue : this.checkedValue
			this.$emit('change', this.currentValue)
			if (this.name) this.$nextTick(() => this.validate('change'))
		}
	}
}
