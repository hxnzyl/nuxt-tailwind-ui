<template>
	<div :class="`n-${type}-group`">
		<slot @change="onChange"></slot>
	</div>
</template>

<script>
import fields from '../mixins/fields'

export default {
	name: 'NCheckboxGroup',
	mixins: [fields('NCheckboxGroup', 'checkedValue')],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: [Boolean, String, Number],
		type: { type: String, default: 'checkbox' }
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
			if (!init && this.currentValue === value) return
			this.currentValue = value
			this.fields.forEach((f) => f.updateValue(init, value))
			if (init) return
			this.$emit('change', value)
		},
		onChange(value) {
			if (this.currentValue === value) return
			this.currentValue = value
			this.fields.forEach((f) => f.checkedValue !== value && f.setUnchecked())
			this.$emit('change', value)
		}
	}
}
</script>
