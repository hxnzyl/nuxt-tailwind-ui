<template>
	<div class="overflow-hidden rounded-md">
		<img
			:src="src"
			class="w-full"
			:class="{
				'transition duration-500': scale != 100,
				'hover:scale-110': scale == 110,
				'hover:scale-125': scale == 125,
				'hover:scale-150': scale == 150
			}"
		/>
	</div>
</template>

<script>
export default {
	name: 'NImg',
	props: {
		src: String,
		scale: {
			type: Number,
			default: 125
		}
	}
}
</script>
