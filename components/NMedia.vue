<template>
	<div class="flex items-center gap-4">
		<NImg class="w-2/5" :src="src" :scale="scale"></NImg>
		<div class="flex flex-col grow">
			<h3 class="text-blue-500 text-sm font-medium">{{ title }}</h3>
			<p class="text-gray-500 text-xs">{{ desc }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NMedia',
	props: {
		src: String,
		scale: Number,
		title: String,
		desc: String
	}
}
</script>
