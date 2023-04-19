<template>
	<div class="n-form-item flex" :class="{ 'flex-col': formColDirection, relative: formRowDirection }">
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
			<div class="flex flex-grow" :class="[bodyClass, formDisabled ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed' : '']">
				<slot v-bind="{ disabled: formDisabled }" :class="{ 'pointer-events-none': formDisabled }"></slot>
			</div>
		</div>
		<div v-if="formRowDirection" v-show="invalidRule != null" class="absolute -bottom-4 h-4 text-red-500 text-xs">
			{{ invalidMessage }}
		</div>
	</div>
</template>

<script>
import validator from '../mixins/validator'

export default {
	name: 'NFormItem',
	mixins: [validator],
	props: {
		//绑定值
		value: String,
		//禁用状态
		disabled: Boolean
	},
	computed: {
		currentValue() {
			return this.value == null ? '' : this.value + ''
		}
	}
}
</script>
