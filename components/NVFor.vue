<template>
	<div>
		<template v-if="value && value.length > 0">
			<slot v-for="val in value" name="if" v-bind="val"></slot>
		</template>
		<slot v-else name="else"></slot>
	</div>
</template>

<script>
export default {
	name: 'NVFor',
	props: { value: Array }
}
</script>
