<template>
	<div
		v-show="currentVisible"
		class="n-mask top-0 left-0 z-50 w-full flex items-center justify-center"
		:class="fixed ? 'fixed h-screen' : 'absolute h-full'"
	>
		<div class="absolute top-0 left-0 z-10 w-full h-full bg-gray-200 bg-opacity-50" @click.stop="onClickMask"></div>
		<slot></slot>
	</div>
</template>

<script>
import visible from '../mixins/visible'

export default {
	name: 'NMask',
	mixins: [visible],
	props: {
		fixed: Boolean,
		clickMaskClose: { type: Boolean, default: true }
	},
	methods: {
		onClickMask() {
			if (this.clickMaskClose) this.hide()
		}
	}
}
</script>
