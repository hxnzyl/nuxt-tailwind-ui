<template>
	<div class="flex flex-col items-start gap-4 p-4">
		<h1 class="text-xl font-bold">props</h1>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">value:</h2>
			<NSelect :options="options"></NSelect>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			modal: false,
			options: [{ value: 'value1', label: 'label1' }]
		}
	}
}
</script>
