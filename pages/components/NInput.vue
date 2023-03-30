<template>
	<div class="flex flex-col items-start gap-4 p-4">
		<h1 class="text-xl font-bold">props</h1>
		<div>input value:{{ value }}</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">size:</h2>
			<NInput size="md" placeholder="default: md"></NInput>
			<NInput size="xs" placeholder="xs"></NInput>
			<NInput size="sm" placeholder="sm"></NInput>
			<NInput size="lg" placeholder="lg"></NInput>
			<NInput size="xl" placeholder="xl"></NInput>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">color:</h2>
			<NInput color="blue" placeholder="default: blue"></NInput>
			<NInput color="black" placeholder="black"></NInput>
			<NInput color="white" placeholder="white"></NInput>
			<NInput color="gray" placeholder="gray"></NInput>
			<NInput color="red" placeholder="red"></NInput>
			<NInput color="green" placeholder="green"></NInput>
			<NInput color="pink" placeholder="pink"></NInput>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">rounded:</h2>
			<NInput :rounded="true" placeholder="default: true"></NInput>
			<NInput :rounded="false" placeholder="false"></NInput>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">border:</h2>
			<NInput :border="false" placeholder="default: false"></NInput>
			<NInput :border="true" placeholder="true"></NInput>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">disabled:</h2>
			<NInput :disabled="false" placeholder="default: false"></NInput>
			<NInput :disabled="true" placeholder="true"></NInput>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">tag:</h2>
			<NInput :tags="[]" placeholder="default: false"></NInput>
			<NInput :tags="[]" placeholder="true" tag></NInput>
		</div>
		<div class="flex flex-col gap-4 pl-2">
			<div class="flex items-center gap-4 p-2 w-40">
				<h2 class="text-lg">- tags:</h2>
				<NInput :tags="[]" placeholder="default: []" tag></NInput>
				<NInput
					v-model="value"
					:tags="['标签一', '标签二', '标签三']"
					placeholder="['标签一', '标签二', '标签三']"
					tag
				></NInput>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: ''
		}
	}
}
</script>
