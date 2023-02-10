<template>
	<NLink v-if="to" class="n-button flex items-center justify-center tranistion duration-500" :class="buttonClass" :to="to">
		<NLoading v-show="loading" :size="size" class="mr-2"></NLoading>
		<slot>
			<span>{{ text }}</span>
		</slot>
	</NLink>
	<button
		v-else
		class="n-button flex items-center justify-center tranistion duration-500 appearance-none"
		type="button"
		:disabled="disabled"
		:class="buttonClass"
		@click="onClick"
	>
		<NLoading v-show="loading" :size="size" class="mr-2"></NLoading>
		<input v-if="upload" ref="file" type="file" class="hidden" @change="onChange" :accept="accept" :multiple="multiple" />
		<slot>
			<span>{{ text }}</span>
		</slot>
	</button>
</template>

<script>
export default {
	name: 'NButton',
	props: {
		//按钮大小
		size: { type: String, default: 'md' },
		//按钮圆角
		rounded: { type: String, default: 'md' },
		//按钮颜色
		color: { type: String, default: 'blue' },
		//禁用
		disabled: Boolean,
		//加载中
		loading: Boolean,
		//按钮文本
		text: String,
		//链接按钮
		to: String,
		//上传按钮
		upload: Boolean,
		//上传文件类型
		accept: { type: String, default: '*' },
		//是否可以多选
		multiple: { type: Boolean, default: true }
	},
	computed: {
		buttonClass() {
			return {
				//不能使用变量连接，如bg-${this.color}-500，nuxt无法识别
				'rounded-sm': this.rounded == 'sm',
				'rounded-md': this.rounded == 'md',
				'rounded-lg': this.rounded == 'lg',
				'rounded-xl': this.rounded == 'xl',
				'bg-black': this.color == 'black',
				'bg-white': this.color == 'white',
				'bg-gray-500': this.color == 'gray',
				'bg-red-500': this.color == 'red',
				'bg-yellow-500': this.color == 'yellow',
				'bg-green-500': this.color == 'green',
				'bg-blue-500': this.color == 'blue',
				'bg-indigo-500': this.color == 'indigo',
				'bg-purple-500': this.color == 'purple',
				'bg-pink-500': this.color == 'pink',
				'bg-opacity-50': this.disabled || this.loading,
				'hover:bg-opacity-80': !this.loading && !this.disabled && this.color != 'black',
				'hover:bg-gray-500': !this.loading && !this.disabled && this.color == 'black',
				'focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-opacity-50': !this.disabled,
				'text-white': this.color != 'white',
				'px-1 py-px text-xs': this.size == 'xs',
				'px-3 py-1 text-sm': this.size == 'sm',
				'px-6 py-1.5 text-base': this.size == 'md',
				'px-9 py-2 text-lg': this.size == 'lg',
				'px-12 py-2.5 text-xl': this.size == 'xl'
			}
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
