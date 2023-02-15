<template>
	<div v-show="currentVisible" ref="root" class="n-modal fixed top-0 left-0 z-50 w-full h-screen flex items-center justify-center">
		<div class="absolute top-0 left-0 z-30 w-full h-full bg-gray-500 bg-opacity-50" @click.stop="onClickMask"></div>
		<div class="flex flex-col gap-3 relative z-40 bg-white w-96 p-3 rounded-md shadow-md text-gray-500">
			<div v-if="showHeader" class="flex text-base font-semibold">
				<slot name="header">
					{{ currentTitle }}
				</slot>
			</div>
			<div class="flex text-sm font-medium" :class="bodyClass">
				<slot name="body">
					<p class="break-all">{{ currentMessage }}</p>
				</slot>
			</div>
			<div v-if="showFooter" class="flex items-center justify-end gap-3">
				<slot name="footer">
					<NButton v-show="showCancelButton" color="gray" @click="cancel">取消</NButton>
					<NButton color="blue" @click="confirm">确定</NButton>
				</slot>
			</div>
		</div>
	</div>
</template>

<script>
import mixin from './NModalBase'
export default { name: 'NModal', mixins: [mixin] }
</script>
