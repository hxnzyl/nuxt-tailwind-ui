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
					<div v-if="icon" class="pt-1">
						<NSvg :name="icon" :size="iconSize"></NSvg>
					</div>
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
		//标题
		title: String,
		//消息
		message: String,
		//slot-body类名
		bodyClass: String,
		//内容icon
		icon: String,
		//内容icon大小
		iconSize: { type: String, default: 'lg' },
		//是否显示头部，默认显示
		showHeader: { type: Boolean, default: true },
		//是否显示底部，默认显示
		showFooter: { type: Boolean, default: true },
		//是否显示取消按钮，默认不显示
		showCancelButton: Boolean,
		//点击遮罩层是否关闭窗口，默认关闭
		clickMaskClose: { type: Boolean, default: true },
		//点击确认按钮是否关闭窗口，默认关闭
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
			this.$emit('confirm')
			if (this.clickConfirmClose) this.hide()
		},
		cancel() {
			this.$emit('cancel')
			this.hide()
		}
	}
}
</script>
