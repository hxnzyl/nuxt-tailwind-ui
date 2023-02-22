<template>
	<div
		class="n-form-item flex"
		:class="{ 'bg-opacity-50 pointer-events-none': disabled, 'flex-col': getDirection == 'col', relative: getDirection == 'row' }"
	>
		<div class="flex flex-grow gap-2" :class="{ 'flex-col': getDirection == 'col' }">
			<div
				v-if="label || getDirection == 'col'"
				class="flex items-center"
				:class="[getDirection == 'col' ? 'justify-between' : '', this.getLabelClass]"
			>
				<div v-if="label" class="text-base">
					<span class="text-gray-500">{{ label }}</span>
					<span v-if="getRequired" class="text-red-500">*</span>
				</div>
				<div v-if="getDirection == 'col'" v-show="invalidField != null" class="text-red-500 text-xs">
					{{ invalidMessage }}
				</div>
			</div>
			<div class="flex flex-grow" :class="bodyClass">
				<slot></slot>
			</div>
		</div>
		<div v-if="getDirection == 'row'" v-show="invalidField != null" class="absolute -bottom-4 h-4 text-red-500 text-xs">
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
