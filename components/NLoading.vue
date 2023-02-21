<template>
	<NMask v-if="mask" class="n-loading" visible>
		<NSvg class="animate-spin relative z-20" name="loading" :size="size" :color="color"></NSvg>
	</NMask>
	<NSvg v-else class="animate-spin" name="loading" :size="size" :color="color"></NSvg>
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
