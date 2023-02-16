<template>
	<div class="n-media flex items-center gap-4">
		<NImg :to="to" :target="target" :src="src" :scale="scale" :img-class="imgClass"></NImg>
		<div class="flex flex-col grow gap-8">
			<NLink v-if="to" :to="to" :target="target" class="text-base font-medium" :class="titleClass">{{ title }}</NLink>
			<h3 v-else>{{ title }}</h3>
			<p v-if="desc" class="text-sm" :class="descClass">{{ desc }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NMedia',
	props: {
		to: String,
		target: String,
		src: String,
		scale: Number,
		imgClass: { type: String, default: 'w-full' },
		title: String,
		desc: String,
		titleClass: { type: String, default: 'text-blue-500' },
		descClass: { type: String, default: 'text-gray-400' }
	}
}
</script>
