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
import emitter from '../mixins/emitter'
import visitable from '../mixins/visitable'

export default {
	name: 'NMask',
	mixins: [emitter, visitable],
	inject: {
		NModal: { value: 'NModal', default: null }
	},
	props: {
		fixed: Boolean,
		clickMaskClose: { type: Boolean, default: true }
	},
	methods: {
		onClickMask() {
			if (this.clickMaskClose) {
				this.hide()
				if (this.NModal) {
					this.dispatch('NModal', 'toggle', [false])
					this.dispatch('NModal', 'hide')
				}
			}
		}
	}
}
</script>
