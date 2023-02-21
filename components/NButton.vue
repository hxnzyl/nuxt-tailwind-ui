<template>
	<NLink v-if="to" :class="buttonClass" :to="to" :target="target">
		<NLoading v-show="currentLoading" :size="size" class="mr-2"></NLoading>
		<slot>
			<span>{{ text }}</span>
		</slot>
	</NLink>
	<button v-else type="button" :disabled="getDisabled" :class="buttonClass" @click="onClick">
		<NLoading v-show="currentLoading" :size="size" class="mr-2"></NLoading>
		<input v-if="upload" ref="file" type="file" class="hidden" @change="onChange" :accept="accept" :multiple="multiple" />
		<slot>
			<span>{{ text }}</span>
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
		event: 'uploaded'
	},
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
		//上传文件
		value: String,
		//上传按钮
		upload: Boolean,
		//上传文件类型
		accept: { type: String, default: '*' },
		//是否可以多选
		multiple: { type: Boolean, default: true }
	},
	computed: {
		//优先使用表单禁用参数
		getDisabled() {
			return (this.NForm && this.NForm.disabled) || this.disabled
		},
		buttonClass() {
			return [
				'n-button flex items-center justify-center tranistion duration-500 appearance-none',
				this.getDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
				tailwindui.buttonSize(this.size),
				this.rounded ? tailwindui.roundedSize(this.size) : '',
				this.border ? 'border' : '',
				this.border ? tailwindui.borderColor(this.color) : '',
				this.border ? (this.getDisabled ? 'border-opacity-50' : 'hover:border-opacity-50') : '',
				this.plain ? 'bg-white' : '',
				this.plain ? tailwindui.textColor(this.color) : tailwindui.bgColor(this.color),
				this.plain ? '' : this.color == 'white' ? '' : 'text-white',
				this.plain ? (this.getDisabled ? 'text-opacity-50' : 'hover:text-opacity-50') : '',
				!this.plain ? (this.getDisabled ? 'bg-opacity-50' : 'hover:bg-opacity-50') : '',
				this.color == 'black' && !this.plain && !this.getDisabled ? 'hover:bg-gray-500' : ''
			]
		}
	},
	methods: {
		click(event) {
			this.onClick(event)
		},
		onClick(event) {
			if (this.getDisabled) return
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
				this.$emit('uploaded', urls)
			} else {
				if (!upload) return this.$emit('change', files[0])
				let url = await this.executeAsyncTask('upload', files[0])
				this.$emit('uploaded', url)
			}
		}
	}
}
</script>
