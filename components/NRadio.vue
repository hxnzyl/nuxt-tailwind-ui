<template>
	<div
		class="n-radio flex items-center cursor-pointer gap-2"
		:class="{ 'text-gray-500 text-opacity-50 pointer-events-none': disabled }"
		@click.stop="onChange"
	>
		<div class="flex items-center justify-center rounded-full" :class="checkboxClass">
			<div v-show="checked" class="rounded-full w-1/2 h-1/2" :class="checkedClass"></div>
		</div>
		<div class="flex grow items-center" :class="textboxClass">
			<slot v-bind="{ disabled }"></slot>
		</div>
	</div>
</template>

<script>
import NCheckboxBase from './NCheckboxBase'
export default { name: 'NRadio', mixins: [NCheckboxBase] }
</script>
