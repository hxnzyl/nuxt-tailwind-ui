<template>
	<NForm :model="formModel">
		<NInput type="password"></NInput>
	</NForm>
</template>

<script>
export default {
	data() {
		return {
			formModel: {}
		}
	}
}
</script>
