<template>
	<NModal v-model="currentValue" v-bind="$props">
		<span slot="body" class="text-green-500">
			{{ currentMessage }}
		</span>
	</NModal>
</template>

<script>
import mixin from './NModalBase'
export default { name: 'NModalSuccess', mixins: [mixin] }
</script>
