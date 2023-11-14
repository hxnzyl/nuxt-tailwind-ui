<template>
	<NMask v-model="currentVisible" :click-mask-close="clickMaskClose" fixed>
		<div
			ref="root"
			class="flex flex-col gap-3 relative z-40 bg-white p-3 rounded-md shadow-md text-gray-500"
			:class="rootClass"
		>
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
import animate from '../mixins/animate'

export default {
	name: 'NModal',
	mixins: [animate, visitable],
	props: {
		//标题
		title: String,
		//消息
		message: String,
		//root类名
		rootClass: [String, Array, Object],
		//slot-body类名
		bodyClass: [String, Array, Object],
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
	provide() {
		return {
			NModal: this
		}
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
			if (!message) (message = title), (title = '')
			this.currentTitle = title || this.title
			this.currentMessage = message || this.message
			return visitable.methods.show.call(this)
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
