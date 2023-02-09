<template>
	<div
		class="n-dropzone text-gray-400 rounded-md border-2 border-dashed"
		@dragenter.stop.prevent="enter = true"
		@dragleave.stop.prevent="enter = false"
		@dragover.stop.prevent=""
		@drop.stop.prevent="onChange"
		@click.stop="onClick"
		:class="{
			'flex items-center justify-center cursor-pointer': upload,
			'border-blue-300': enter,
			'border-gray-300': border && !enter,
			'border-transparent': !enter && !border
		}"
	>
		<input v-if="upload" ref="file" type="file" class="hidden" @change="onChange" :accept="accept" multiple />
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'NDropZone',
	props: {
		//是否需要边框
		border: { type: Boolean, default: true },
		//上传按钮
		upload: { type: Boolean, default: true },
		//上传文件类型
		accept: { type: String, default: '*' }
	},
	data() {
		return {
			enter: false
		}
	},
	methods: {
		onClick(event) {
			if (this.upload) this.$refs.file.click() //上传按钮
			this.$emit('click', event)
		},
		onChange(event) {
			this.enter = false
			this.start = false
			this.$emit('change', event.dataTransfer ? event.dataTransfer.files : event.target.files)
		}
	}
}
</script>
