export default {
	props: {
		//双向绑定值v-model
		value: Object,
		//是否可清除
		clearable: { type: Boolean, default: true }
	},
	data() {
		let propValueType = typeof this.value
		if (propValueType === 'object') propValueType = this.value !== null ? (Array.isArray(this.value) ? 'array' : 'object') : 'null'
		//如果是未定义类型时，默认为字符串类型（其它视情况扩展）
		else if (propValueType === 'undefined') propValueType = 'string'
		return { propValueType }
	},
	computed: {
		valueNotEmpty() {
			if (this.propValueType === 'string') return this.currentValue !== ''
			if (this.propValueType === 'number') return this.currentValue != null
			if (this.propValueType === 'array') return this.currentValue.length > 0
			if (this.propValueType === 'null') return null
			if (this.currentValue == null) return false
			for (let _ in this.currentValue) return true
			return false
		}
	},
	methods: {
		clear() {
			this.updateValue(false, this.getDefaultValue())
		},
		getDefaultValue() {
			if (this.propValueType === 'string') return ''
			if (this.propValueType === 'array') return []
			if (this.propValueType === 'object') return {}
			return null
		}
	}
}
