<template>
	<component v-if="value.is" :is="value.is" v-bind="value.props"></component>
	<span v-else>{{ value }}</span>
</template>

<script>
export default {
	name: 'NComponent',
	props: { value: Object }
}
</script>
