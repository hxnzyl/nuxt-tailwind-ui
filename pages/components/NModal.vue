<template>
	<div class="flex flex-col items-start gap-4 p-4">
		<h1 class="text-xl font-bold">props</h1>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">value:</h2>
			<NButton @click="modal = false">default: false</NButton>
			<NButton @click="modal = true">true</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">visible:</h2>
			<NButton @click="showModal('visible', false)">default:false</NButton>
			<NButton @click="showModal('visible', true)">true</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">title:</h2>
			<NButton @click="showModal('title', '')">default: ""</NButton>
			<NButton @click="showModal('title', '我是标题')">我是标题</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">message:</h2>
			<NButton @click="showModal('message', '')">default: ""</NButton>
			<NButton @click="showModal('message', '我是信息')">我是信息</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">bodyClass:</h2>
			<NButton @click="showModal('bodyClass', '')">default: ""</NButton>
			<NButton @click="showModal('bodyClass', 'h-10 border border-red-500')">h-10 border border-red-500</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">icon:</h2>
			<NButton @click="showModal('icon', '')">default: ""</NButton>
			<NButton @click="showModal('icon', 'check')">check</NButton>
			<NButton @click="showModal('icon', 'x')">x</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">iconSize:</h2>
			<NButton @click="showModal({ icon: 'check', iconSize: 'md' })">default: md</NButton>
			<NButton @click="showModal({ icon: 'check', iconSize: 'sm' })">sm</NButton>
			<NButton @click="showModal({ icon: 'check', iconSize: 'lg' })">lg</NButton>
			<NButton @click="showModal({ icon: 'check', iconSize: 'xl' })">xl</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">showHeader:</h2>
			<NButton @click="showModal({ title: 'Header', showHeader: true })">default: true</NButton>
			<NButton @click="showModal({ title: 'Header', showHeader: false })">false</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">showFooter:</h2>
			<NButton @click="showModal('showFooter', true)">default: true</NButton>
			<NButton @click="showModal('showFooter', false)">false</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">showCancelButton:</h2>
			<NButton @click="showModal('showCancelButton', false)">default: false</NButton>
			<NButton @click="showModal('showCancelButton', true)">true</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">clickMaskClose:</h2>
			<NButton @click="showModal('clickMaskClose', true)">default: true</NButton>
			<NButton @click="showModal('clickMaskClose', false)">false</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">clickConfirmClose:</h2>
			<NButton @click="showModal('clickConfirmClose', true)">default: true</NButton>
			<NButton @click="showModal('clickConfirmClose', false)">false</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">allowAnimate:</h2>
			<NButton @click="showModal('allowAnimate', true)">default: true</NButton>
			<NButton @click="showModal('allowAnimate', false)">false</NButton>
			<a href="https://animate.style/" target="_blank" class="text-blue-500 hover:underline">From Animate Css！</a>
		</div>
		<div class="flex flex-col gap-4 pl-2">
			<div class="flex items-center gap-4 p-2">
				<h2 class="text-lg">- animateEnter:</h2>
				<NButton @click="showModal('animateEnter', 'zoomIn')">default: zoomIn</NButton>
				<NButton @click="showModal('animateEnter', 'bounceIn')">bounceIn</NButton>
			</div>
			<div class="flex items-center gap-4 p-2">
				<h2 class="text-lg">- animateLeave:</h2>
				<NButton @click="showModal('animateLeave', 'zoomOut')">default: zoomOut</NButton>
				<NButton @click="showModal('animateLeave', 'bounceOut')">bounceOut</NButton>
			</div>
		</div>
		<NModal v-model="modal" v-bind="props"></NModal>
	</div>
</template>

<script>
export default {
	data() {
		return {
			modal: false,
			props: {}
		}
	},
	methods: {
		showModal(props, value) {
			if (props == 'visible') {
				this.modal = true
				this.$nextTick(() => (this.props = value !== undefined ? { [props]: value } : props))
			} else {
				this.props = value !== undefined ? { [props]: value } : props
				this.modal = true
			}
		}
	}
}
</script>
