<template>
	<NMask ref="root" v-model="currentVisible" :click-mask-close="clickMaskClose" fixed>
		<div class="flex flex-col gap-3 relative z-40 bg-white w-96 p-3 rounded-md shadow-md text-gray-500">
			<div v-if="showHeader" class="flex text-base font-semibold">
				<slot name="header">
					{{ currentTitle }}
				</slot>
			</div>
			<div class="flex font-medium" :class="bodyClass">
				<slot name="body">
					<NSvg :name="icon" :size="iconSize"></NSvg>
					<p class="break-all">{{ currentMessage }}</p>
				</slot>
			</div>
			<div v-if="showFooter" class="flex items-center justify-end gap-3">
				<slot name="footer">
					<NButton v-show="showCancelButton" color="gray" @click="cancel" plain>取消</NButton>
					<NButton color="blue" @click="confirm">确定</NButton>
				</slot>
			</div>
		</div>
	</NMask>
</template>

<script>
import visitable from '../mixins/visitable'

export default {
	name: 'NModal',
	mixins: [visitable],
	props: {
		title: String,
		message: String,
		bodyClass: String,
		showCancelButton: Boolean,
		icon: String,
		iconSize: { type: String, default: 'lg' },
		showHeader: { type: Boolean, default: true },
		showFooter: { type: Boolean, default: true },
		clickMaskClose: { type: Boolean, default: true },
		clickConfirmClose: { type: Boolean, default: true }
	},
	data() {
		return {
			currentTitle: this.title || '',
			currentMessage: this.message || ''
		}
	},
	watch: {
		title(newValue, oldValue) {
			if (newValue !== oldValue) this.currentTitle = newValue
		},
		message(newValue, oldValue) {
			if (newValue !== oldValue) this.currentMessage = newValue
		}
	},
	methods: {
		//@overwrite visitable.show
		show(title, message) {
			if (!title) title = this.title
			if (!message) message = this.message
			this.currentTitle = message ? title : ''
			this.currentMessage = message || title || ''
			visitable.methods.show.call(this)
		},
		confirm() {
			if (this.clickConfirmClose) this.hide()
			this.$emit('confirm')
		},
		cancel() {
			this.hide()
			this.$emit('cancel')
		}
	}
}
</script>
