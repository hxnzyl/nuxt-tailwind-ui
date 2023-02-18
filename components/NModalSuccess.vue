<template>
	<NModal v-model="currentVisible" v-bind="$props">
		<span slot="body" class="text-green-500">
			{{ currentMessage }}
		</span>
	</NModal>
</template>

<script>
import modal from '../mixins/modal'
export default { name: 'NModalSuccess', extends: modal }
</script>
