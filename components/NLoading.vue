<template>
	<NMask v-if="mask" visible>
		<div class="n-loading animate-spin relative z-20">
			<NSvg name="loading" :size="size" :color="color"></NSvg>
		</div>
	</NMask>
	<div v-else class="n-loading animate-spin">
		<NSvg name="loading" :size="size" :color="color"></NSvg>
	</div>
</template>

<script>
export default {
	name: 'NLoading',
	props: {
		mask: Boolean,
		size: { type: String, default: 'md' },
		color: { type: String, default: 'white' }
	}
}
</script>
