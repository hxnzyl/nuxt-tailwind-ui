<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		class="animate-spin"
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
			'w-5 h-5': size == 'lg',
			'w-6 h-6': size == 'xl'
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
		color: { type: String, default: 'white' }
	}
}
</script>
