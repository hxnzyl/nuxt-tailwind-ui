<template>
	<div
		class="n-checkbox flex items-center text-gray-500"
		:class="{ 'text-opacity-50 pointer-events-none': disabled, 'flex-col': getDirection == 'col', relative: getDirection == 'row' }"
		@click="onChange"
	>
		<div class="flex w-full cursor-pointer" :class="{ 'flex-col gap-2': getDirection == 'col' }">
			<div class="flex items-center" :class="{ 'justify-between': getDirection == 'col' }">
				<div v-if="label" class="text-base">
					<span v-if="getRequired" class="text-red-500">*</span>
					<slot name="label">
						<span class="text-gray-500">{{ label }}</span>
					</slot>
				</div>
				<div v-if="getDirection == 'col'" v-show="invalidField != null" class="text-red-500 text-xs">
					{{ invalidMessage }}
				</div>
			</div>
			<div class="flex grow items-center">
				<div class="flex items-center justify-center pt-px" :class="checkboxClass">
					<i v-show="checked" class="fe fe-check"></i>
				</div>
				<div class="flex items-center grow pl-2">
					<slot v-bind="{ disabled }"></slot>
				</div>
			</div>
		</div>
		<div v-if="getDirection == 'row'" v-show="invalidField != null" class="absolute -bottom-4 h-4 text-red-500 text-xs">
			{{ invalidMessage }}
		</div>
	</div>
</template>

<script>
import NCheckboxBase from './NCheckboxBase'
export default { name: 'NCheckbox', mixins: [NCheckboxBase] }
</script>
