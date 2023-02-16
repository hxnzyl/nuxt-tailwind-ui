<template>
	<NLink v-if="to" :to="to" :target="target" class="n-img overflow-hidden rounded-md">
		<img :src="src" :class="img1Class" />
		<slot></slot>
	</NLink>
	<div v-else class="n-img overflow-hidden rounded-md">
		<img :src="src" :class="img1Class" />
		<slot></slot>
	</div>
</template>

<script>
import tailwindui from './tailwindui'

export default {
	name: 'NImg',
	props: {
		to: String,
		target: String,
		src: String,
		scale: { type: Number, default: 125 },
		imgClass: { type: String, default: 'w-full' }
	},
	computed: {
		img1Class() {
			return [tailwindui.hoverScale(this.scale), this.imgClass]
		}
	}
}
</script>
