<template>
	<div class="flex flex-col items-start gap-4 p-4">
		<h1 class="text-xl font-bold">props</h1>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">size:</h2>
			<NButton size="md">default: md</NButton>
			<NButton size="xs">xs</NButton>
			<NButton size="sm">sm</NButton>
			<NButton size="lg">lg</NButton>
			<NButton size="xl">xl</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">color:</h2>
			<NButton color="blue">default: blue</NButton>
			<NButton color="black">black</NButton>
			<NButton color="white">white</NButton>
			<NButton color="gray">gray</NButton>
			<NButton color="red">red</NButton>
			<NButton color="green">green</NButton>
			<NButton color="pink">pink</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">rounded:</h2>
			<NButton :rounded="true">default: true</NButton>
			<NButton :rounded="false">false</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">ripple:</h2>
			<NButton :ripple="true">default: true</NButton>
			<NButton :ripple="false">false</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">icon:</h2>
			<NButton icon="">default: ""</NButton>
			<NButton icon="check">check</NButton>
			<NButton icon="x"></NButton>
			<NButton icon="download">download</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">border:</h2>
			<NButton :border="false">default: false</NButton>
			<NButton :border="true">true</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">plain:</h2>
			<NButton :plain="false">default: false</NButton>
			<NButton :plain="true">true</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">disabled:</h2>
			<NButton :disabled="false">default: false</NButton>
			<NButton :disabled="true">true</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">text:</h2>
			<NButton text="">default: ""</NButton>
			<NButton text="text">text</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">loading:</h2>
			<NButton :loading="false">default: false</NButton>
			<NButton :loading="true">true</NButton>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">to:</h2>
			<NButton to="">default: ""</NButton>
			<NButton to="#">#</NButton>
		</div>
		<div class="flex flex-col gap-4 pl-2">
			<div class="flex items-center gap-4 p-2">
				<h2 class="text-lg">- target:</h2>
				<NButton to="#" target="">default: ""</NButton>
				<NButton to="#_blank" target="_blank">_blank</NButton>
				<NButton to="#_self" target="_self">_self</NButton>
			</div>
		</div>
		<div class="flex items-center gap-4 p-2">
			<h2 class="text-lg">upload:</h2>
			<NButton :upload="false">default: false</NButton>
			<NButton :upload="true">true</NButton>
		</div>
		<div class="flex flex-col gap-4 pl-2">
			<div class="flex items-center gap-4 p-2">
				<h2 class="text-lg">- value:</h2>
				<NButton value="" upload>default: ""</NButton>
				<NButton v-model="value" upload>{{ value }}</NButton>
			</div>
			<div class="flex items-center gap-4 p-2">
				<h2 class="text-lg">- accept:</h2>
				<NButton accept="*" upload>default: *</NButton>
				<NButton accept="image/*" upload>image/*</NButton>
				<NButton accept="video/*" upload>video/*</NButton>
			</div>
			<div class="flex items-center gap-4 p-2">
				<h2 class="text-lg">- multiple:</h2>
				<NButton upload :multiple="true">default: true</NButton>
				<NButton upload :multiple="false">false</NButton>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: '""'
		}
	}
}
</script>
