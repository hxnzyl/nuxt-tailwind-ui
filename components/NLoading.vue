<template>
	<div v-if="mask" class="n-loading absolute top-0 left-0 z-50 w-full h-full flex items-center justify-center">
		<div class="absolute top-0 left-0 z-10 w-full h-full bg-gray-50 bg-opacity-50"></div>
		<NLoading class="relative z-20" :size="size" :color="color"></NLoading>
	</div>
	<svg
		v-else
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		class="n-loading animate-spin"
		:class="{
			'text-white': color == 'white',
			'text-gray-500': color == 'gray',
			'text-red-500': color == 'red',
			'text-yellow-500': color == 'yellow',
			'text-green-500': color == 'green',
			'text-blue-500': color == 'blue',
			'text-indigo-500': color == 'indigo',
			'text-purple-500': color == 'purple',
			'text-pink-500': color == 'pink',
			'w-3 h-3': size == 'sm',
			'w-4 h-4': size == 'md',
			'w-6 h-6': size == 'lg',
			'w-8 h-8': size == 'xl'
		}"
	>
		<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
		<path
			class="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
		></path>
	</svg>
</template>

<script>
export default {
	name: 'NLoading',
	props: {
		size: { type: String, default: 'md' },
		color: { type: String, default: 'white' },
		mask: Boolean
	}
}
</script>
