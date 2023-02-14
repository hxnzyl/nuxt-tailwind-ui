<template>
	<NLink v-if="to" :to="to" class="n-img overflow-hidden" :class="rootClass">
		<img :src="src" :class="img1Class" />
	</NLink>
	<div v-else class="n-img overflow-hidden" :class="rootClass">
		<img :src="src" :class="img1Class" />
	</div>
</template>

<script>
import tailwindui from './tailwindui'

export default {
	name: 'NImg',
	props: {
		to: String,
		src: String,
		size: { type: String, default: 'md' },
		scale: { type: Number, default: 125 },
		imgClass: { type: String, default: 'w-full' }
	},
	computed: {
		rootClass() {
			return tailwindui.roundedSize(this.size)
		},
		img1Class() {
			return [tailwindui.hoverScale(this.scale), this.imgClass]
		}
	}
}
</script>
