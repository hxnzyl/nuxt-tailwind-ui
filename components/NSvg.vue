<template>
	<svg :class="svgClass">
		<use :xlink:href="svgName"></use>
	</svg>
</template>

<script>
import tailwindui from '../utils/tailwindui'

export default {
	name: 'NSvg',
	props: {
		name: [Object, String],
		size: { type: String, default: 'md' },
		color: { type: String, default: 'current' }
	},
	computed: {
		svgClass() {
			return [tailwindui.iconSize(this.size), tailwindui.textColor(this.color)]
		},
		svgName() {
			switch (typeof this.name) {
				case 'string':
					return '#' + this.name
				case 'object':
					for (let name in this.name) if (this.name[name]) return '#' + name
					break
			}
		}
	}
}
</script>
