<template>
	<div
		class="n-radio flex items-center cursor-pointer"
		:class="{ 'text-gray-500 text-opacity-50 pointer-events-none': disabled }"
		@click="onChange"
	>
		<div
			class="flex items-center justify-center rounded-full"
			:class="{
				'bg-blue-500': fill && checked && !disabled,
				'bg-gray-500': fill && checked && disabled,
				'bg-transparent border border-gray-200': fill && !checked,
				'bg-transparent border border-blue-500': !fill && !disabled,
				'bg-transparent border border-gray-500': !fill && disabled,
				'w-3 h-3': size == 'sm',
				'w-4 h-4': size == 'md',
				'w-5 h-5': size == 'lg',
				'w-6 h-6': size == 'xl'
			}"
		>
			<div
				v-show="checked"
				class="rounded-full"
				:class="{
					'bg-white': fill && !disabled,
					'bg-blue-500': !fill && !disabled,
					'bg-gray-200 bg-opacity-50': disabled,
					'w-1.5 h-1.5': size == 'sm',
					'w-2 h-2': size == 'md',
					'w-2.5 h-2.5': size == 'lg',
					'w-3 h-3': size == 'xl'
				}"
			></div>
		</div>
		<div class="flex flex-1 items-center pl-2">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import NCheckboxBase from './NCheckboxBase'
export default { name: 'NRadio', mixins: [NCheckboxBase] }
</script>
