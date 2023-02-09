<template>
	<div
		class="n-input flex"
		:class="{ 'bg-opacity-50 pointer-events-none': disabled, 'flex-col': getDirection == 'col', relative: getDirection == 'row' }"
	>
		<div class="flex w-full" :class="{ 'flex-col gap-2': getDirection == 'col' }">
			<div class="flex items-center" :class="{ 'justify-between': getDirection == 'col' }">
				<div v-if="label" class="text-base">
					<span v-if="getRequired" class="text-red-500">*</span>
					<span class="text-gray-500">{{ label }}</span>
				</div>
				<div v-if="getDirection == 'col'" v-show="invalidField != null" class="text-red-500 text-xs">
					{{ invalidMessage }}
				</div>
			</div>
			<div class="flex grow">
				<div class="flex grow">
					<input
						ref="input"
						class="w-full appearance-none focus:outline-none"
						@input="onInput"
						@focus="onFocus"
						@blur="onBlur"
						:type="type"
						:placeholder="placeholder"
						:disabled="disabled"
						:readonly="readonly"
						:class="inputClass"
					/>
				</div>
				<slot></slot>
			</div>
		</div>
		<div v-if="getDirection == 'row'" v-show="invalidField != null" class="absolute -bottom-4 h-4 text-red-500 text-xs">
			{{ invalidMessage }}
		</div>
	</div>
</template>

<script>
import NInputBase from './NInputBase'
export default { name: 'NInput', mixins: [NInputBase] }
</script>
