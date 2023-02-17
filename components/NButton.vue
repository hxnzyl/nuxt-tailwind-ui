<template>
	<NLink v-if="to" :class="buttonClass" :to="to" :target="target">
		<NLoading v-show="loading" :size="size" class="mr-2"></NLoading>
		<slot>
			<span>{{ text }}</span>
		</slot>
	</NLink>
	<button v-else type="button" :disabled="disabled" :class="buttonClass" @click="onClick">
		<NLoading v-show="loading" :size="size" class="mr-2"></NLoading>
		<input v-if="upload" ref="file" type="file" class="hidden" @change="onChange" :accept="accept" :multiple="multiple" />
		<slot>
			<span>{{ text }}</span>
		</slot>
	</button>
</template>

<script>
import tailwindui from './tailwindui'
import loading from '../mixins/loading'

export default {
	name: 'NButton',
	mixins: [loading],
	props: {
		//按钮大小
		size: { type: String, default: 'md' },
		//按钮颜色
		color: { type: String, default: 'blue' },
		//是否有圆角
		rounded: { type: Boolean, default: true },
		//是否有边框
		border: Boolean,
		//是否空心
		plain: Boolean,
		//是否禁用
		disabled: Boolean,
		//按钮文本
		text: String,
		//链接按钮
		to: String,
		//a[traget]
		target: String,
		//上传按钮
		upload: Boolean,
		//上传文件类型
		accept: { type: String, default: '*' },
		//是否可以多选
		multiple: { type: Boolean, default: true }
	},
	computed: {
		buttonClass() {
			return [
				'n-button flex items-center justify-center tranistion duration-500 appearance-none',
				tailwindui.buttonSize(this.size),
				this.rounded ? tailwindui.roundedSize(this.size) : '',
				this.border ? 'border' : '',
				this.border ? tailwindui.borderColor(this.color, this.disabled) : '',
				this.border ? (this.disabled ? 'border-opacity-50' : 'hover:border-opacity-50') : '',
				this.plain ? 'bg-white' : '',
				this.plain ? tailwindui.textColor(this.color, this.disabled) : tailwindui.bgColor(this.color, this.disabled),
				this.plain ? '' : this.color == 'white' ? '' : 'text-white',
				this.plain ? (this.disabled ? 'text-opacity-50' : 'hover:text-opacity-50') : '',
				!this.plain ? (this.disabled ? 'bg-opacity-50' : 'hover:bg-opacity-50') : '',
				this.color == 'black' && !this.plain && !this.disabled ? 'hover:bg-gray-500' : ''
			]
		}
	},
	methods: {
		click(event) {
			this.onClick(event)
		},
		onClick(event) {
			if (this.upload) this.$refs.file.click() //上传按钮
			this.$emit('click', event)
		},
		onChange(event) {
			let { files } = event.target
			if (files && files.length > 0) this.$emit('change', files)
		}
	}
}
</script>
