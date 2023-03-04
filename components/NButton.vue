<template>
	<a v-if="to" :class="buttonClass" :href="to" :target="target">
		<NLoading v-if="currentLoading" :size="size"></NLoading>
		<NSvg v-if="icon" v-show="!currentLoading" :name="icon" :size="size"></NSvg>
		<slot>
			<span v-if="text">{{ text }}</span>
		</slot>
	</a>
	<button v-else type="button" :disabled="formDisabled" :class="buttonClass" @click="onClick">
		<NLoading v-if="currentLoading" :size="size"></NLoading>
		<NSvg v-if="icon" v-show="!currentLoading" :name="icon" :size="size"></NSvg>
		<input
			v-if="upload"
			ref="file"
			type="file"
			class="hidden"
			@change="onChange"
			:accept="accept"
			:multiple="multiple"
		/>
		<slot>
			<span v-if="text">{{ text }}</span>
			<span v-else class="invisible w-0 -ml-2">-</span>
		</slot>
	</button>
</template>

<script>
import tailwindui from '../utils/tailwindui'
import asyncTask from '../mixins/asyncTask'

export default {
	name: 'NButton',
	inject: { NForm: { value: 'NForm', default: null } },
	mixins: [asyncTask],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		//按钮大小
		size: { type: String, default: 'md' },
		//空心：按钮字体颜色；非空心：按钮背景颜色
		color: { type: String, default: 'blue' },
		//点击水波纹
		ripple: { type: Boolean, default: true },
		//是否有圆角，Boolean:大小同size，String:自定义大小
		rounded: { type: [Boolean, String], default: true },
		//是否有阴影，Boolean:大小同size，String:自定义大小
		shadow: [Boolean, String],
		//图标，大小同size
		icon: String,
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
		//上传文件
		value: [Array, FileList, String, File],
		//上传文件类型
		accept: { type: String, default: '*' },
		//是否可以多选
		multiple: { type: Boolean, default: true }
	},
	computed: {
		//优先使用表单禁用参数
		formDisabled() {
			return (this.NForm && this.NForm.disabled) || this.disabled
		},
		buttonClass() {
			return [
				'n-button h-max flex items-center justify-center gap-2 tranistion appearance-none',
				//按钮大小
				tailwindui.buttonSize(this.size),
				//圆角大小
				this.rounded ? tailwindui.roundedSize(this.rounded, this.size) : '',
				//阴影大小
				this.shadow ? tailwindui.shadowSize(this.shadow, this.size) : '',
				//点击水波纹
				this.ripple ? 'animate-ripple' : '',
				//按钮边框
				this.border ? 'border' : '',
				this.border ? tailwindui.borderColor(this.color) : '',
				//空心：默认背景白色；非空心：背景颜色非白色设置字体为白色
				this.plain ? 'bg-white' : this.color == 'white' ? '' : 'text-white',
				//空心：按钮字体颜色；非空心：按钮背景颜色
				this.plain ? tailwindui.textColor(this.color) : tailwindui.bgColor(this.color),
				//禁用：无事件，禁用鼠标，不使用pointer-events-none，与cursor-not-allowed样式冲突
				this.formDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
				//禁用：空心->字体透明，边框透明。非空心->背景透明；非禁用：空心hover->字体透明，边框透明。非空心hover->背景透明
				this.formDisabled
					? this.plain
						? 'text-opacity-50 border-opacity-50'
						: 'bg-opacity-50'
					: this.plain
					? 'hover:text-opacity-50 hover:border-opacity-50'
					: 'hover:bg-opacity-50',
				//非空心下黑色按钮的hover效果优化
				!this.plain && this.color == 'black' ? 'hover:bg-gray-500' : ''
			]
		}
	},
	methods: {
		click(event) {
			this.onClick(event)
		},
		onClick(event) {
			if (this.currentLoading || this.formDisabled) return
			if (this.upload) this.$refs.file.click() //上传按钮
			this.$emit('click', event)
		},
		async onChange(event) {
			let { files } = event.target
			let l = files && files.length
			if (!l) return
			let { upload } = this.asyncTasks
			if (this.multiple) {
				if (!upload) return this.$emit('change', files)
				let urls = []
				for (let i = 0; i < l; i++) urls.push(await this.executeAsyncTask('upload', files[i]))
				this.$emit('change', urls)
			} else {
				if (!upload) return this.$emit('change', files[0])
				let url = await this.executeAsyncTask('upload', files[0])
				this.$emit('change', url)
			}
		}
	}
}
</script>
