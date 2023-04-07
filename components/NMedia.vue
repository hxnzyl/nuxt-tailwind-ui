<template>
	<div class="n-media flex items-center gap-4">
		<NImg :to="to" :target="target" :src="src" :scale="scale" :img-class="imgClass" preview></NImg>
		<div class="flex flex-col flex-grow gap-4">
			<a v-if="to" :href="to" :target="target" class="text-base font-medium" :class="titleClass">{{ title }}</a>
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
		title: String,
		desc: String,
		imgClass: { type: String, default: 'w-full' },
		titleClass: { type: String, default: 'text-blue-500' },
		descClass: { type: String, default: 'text-gray-400' }
	}
}
</script>
