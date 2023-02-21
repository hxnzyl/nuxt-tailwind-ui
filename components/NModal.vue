<template>
	<NMask ref="root" v-model="currentVisible" :click-mask-close="clickMaskClose" fixed>
		<div class="flex flex-col gap-3 relative z-40 bg-white w-96 p-3 rounded-md shadow-md text-gray-500">
			<div v-if="showHeader" class="flex text-base font-semibold">
				<slot name="header">
					{{ currentTitle }}
				</slot>
			</div>
			<div class="flex font-medium" :class="bodyClass">
				<slot name="body">
					<NSvg :name="icon" :size="iconSize"></NSvg>
					<p class="break-all">{{ currentMessage }}</p>
				</slot>
			</div>
			<div v-if="showFooter" class="flex items-center justify-end gap-3">
				<slot name="footer">
					<NButton v-show="showCancelButton" color="gray" @click="cancel" plain>取消</NButton>
					<NButton color="blue" @click="confirm">确定</NButton>
				</slot>
			</div>
		</div>
	</NMask>
</template>

<script>
import modal from '../mixins/modal'
export default { name: 'NModal', extends: modal }
</script>
