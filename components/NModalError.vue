<template>
	<NModal v-model="currentValue" v-bind="$props">
		<span slot="body" class="text-red-500">
			{{ currentMessage }}
		</span>
	</NModal>
</template>

<script>
import mixin from './NModalBase'
export default { name: 'NModalError', mixins: [mixin] }
</script>
