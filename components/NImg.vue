<template>
	<a v-if="to" :href="to" :target="target" class="n-img overflow-hidden rounded-md">
		<img v-if="lazy" :lazy-src="src" :class="nativeClass" />
		<img v-else :src="src" :class="nativeClass" />
		<slot></slot>
	</a>
	<div v-else class="n-img overflow-hidden rounded-md" :class="{ 'cursor-pointer': preview }" @click.stop="onClick">
		<img v-if="lazy" :lazy-src="src" :class="nativeClass" />
		<img v-else :src="src" :class="nativeClass" />
		<slot></slot>
		<NModal v-model="previewModal" :show-header="false" :show-footer="false">
			<template #body>
				<img :src="previewSrc" />
			</template>
		</NModal>
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
		preview: Boolean,
		scale: { type: Number, default: 125 },
		imgClass: { type: String, default: 'w-full' }
	},
	computed: {
		nativeClass() {
			return [this.preview ? '' : tailwindui.hoverScale(this.scale), this.imgClass]
		}
	},
	data() {
		return {
			previewModal: false,
			previewSrc: ''
		}
	},
	methods: {
		onClick(event) {
			if (this.preview) (this.previewModal = true), (this.previewSrc = this.src)
			else this.$emit('click', event)
		}
	}
}
</script>
