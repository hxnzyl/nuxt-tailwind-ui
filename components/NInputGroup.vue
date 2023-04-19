<template>
	<div class="n-input-group flex" :class="{ 'flex-col': formColDirection, relative: formRowDirection }">
		<div class="flex flex-grow gap-2" :class="{ 'flex-col': formColDirection }">
			<div
				v-if="label || $slots.label || formColDirection"
				class="flex items-center"
				:class="[formColDirection ? 'justify-between' : '', this.formLabelClass]"
			>
				<div v-if="label || $slots.label" class="text-base">
					<slot name="label">
						<span class="text-gray-500">{{ label }}</span>
					</slot>
					<span v-if="formRequired" class="text-red-500">*</span>
				</div>
				<div v-if="formColDirection" v-show="invalidRule != null" class="text-red-500 text-xs">
					{{ invalidMessage }}
				</div>
			</div>
			<div
				class="flex flex-grow"
				:class="[bodyClass, formDisabled ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed' : '']"
			>
				<slot v-bind="{ disabled: formDisabled }" :class="{ 'pointer-events-none': formDisabled }"></slot>
			</div>
		</div>
		<div v-if="formRowDirection" v-show="invalidRule != null" class="absolute -bottom-4 h-4 text-red-500 text-xs">
			{{ invalidMessage }}
		</div>
	</div>
</template>

<script>
import fields from '../mixins/fields'
import validator from '../mixins/validator'

export default {
	name: 'NInputGroup',
	mixins: [fields('NInputGroup', 'name'), validator],
	model: {
		prop: 'value',
		event: 'input'
	},
	props: {
		value: [Boolean, String, Number]
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
			if (init) return
			this.$emit('input', value)
			if (this.name) this.$nextTick(() => this.validate('input'))
		},
		onInput(value) {
			if (this.currentValue === value) return
			this.currentValue = value
			this.$emit('input', value)
			if (this.name) this.$nextTick(() => this.validate('input'))
		},
		onFocus() {
			this.$emit('focus', this.currentValue)
			if (this.name) this.$nextTick(() => this.validate('focus'))
		},
		onBlur() {
			this.$emit('blur', this.currentValue)
			if (this.name) this.$nextTick(() => this.validate('blur'))
		}
	}
}
</script>
