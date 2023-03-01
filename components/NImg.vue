<template>
	<NLink v-if="to" :to="to" :target="target" class="n-img overflow-hidden rounded-md">
		<img v-if="lazy" :lazy-src="src" :class="nativeClass" />
		<img v-else :src="src" :class="nativeClass" />
		<slot></slot>
	</NLink>
	<div v-else class="n-img overflow-hidden rounded-md">
		<img v-if="lazy" :lazy-src="src" :class="nativeClass" />
		<img v-else :src="src" :class="nativeClass" />
		<slot></slot>
	</div>
</template>

<script>
import tailwindui from '../utils/tailwindui'

export default {
	name: 'NImg',
	props: {
		to: String,
		src: String,
		target: String,
		lazy: Boolean,
		scale: { type: Number, default: 125 },
		imgClass: { type: String, default: 'w-full' }
	},
	computed: {
		nativeClass() {
			return [tailwindui.hoverScale(this.scale), this.imgClass]
		}
	}
}
</script>
