<template>
	<NModal v-model="currentVisible" v-bind="$props">
		<div slot="body" class="flex gap-2 text-red-500">
			<div class="text-lg">
				<NSvg name="alert-triangle"></NSvg>
			</div>
			<p class="break-all">{{ currentMessage }}</p>
		</div>
	</NModal>
</template>

<script>
import mixin from './NModalBase'
export default { name: 'NModalError', mixins: [mixin] }
</script>
