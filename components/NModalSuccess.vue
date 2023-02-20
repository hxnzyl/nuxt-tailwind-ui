<template>
	<NModal v-model="currentVisible" v-bind="$props">
		<div slot="body" class="flex gap-2 text-green-500">
			<NSvg name="check" size="lg"></NSvg>
			<p class="break-all text-base">
				{{ currentMessage }}
			</p>
		</div>
	</NModal>
</template>

<script>
import modal from '../mixins/modal'
export default { name: 'NModalError', extends: modal }
</script>
