<template>
	<div v-show="value" class="n-float fixed z-20 hover:z-30">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'NFloat',
	props: { value: Boolean }
}
</script>
