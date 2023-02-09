import NFormValidator from './NFormValidator'

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
		//填充模式
		fill: Boolean,
		//大小
		size: { type: String, default: 'md' },
		//禁用状态
		disabled: Boolean
	},
	computed: {
		checked() {
			return this.currentValue === this.checkedValue
		}
	},
	watch: {
		value(val) {
			if (val !== this.currentValue) this.updateValue(false)
		}
	},
	data() {
		return {
			currentValue: null
		}
	},
	mounted() {
		this.updateValue(true)
	},
	methods: {
		updateValue(init) {
			switch (this.value) {
				case this.checkedValue:
				case this.uncheckedValue:
					this.currentValue = this.value
					break
				default:
					this.currentValue = null
					break
			}
		},
		onChange() {
			switch (this.value) {
				case this.checkedValue:
					this.currentValue = this.uncheckedValue
					break
				case this.uncheckedValue:
					this.currentValue = this.checkedValue
					break
				default:
					this.currentValue = null
					break
			}
			this.$emit('change', this.currentValue)
			this.$nextTick(() => this.validate('change'))
		}
	}
}
