<template>
	<div class="flex items-center gap-4 w-full px-10 py-4 transtion" :class="navClass">
		<slot name="left"></slot>
		<nav class="flex flex-grow">
			<div v-for="(menu, key) in menus" :key="key" class="px-8 relative">
				<NDropDown v-if="menu.children && menu.children.length > 0" :menus="menu.children">
					<template slot="label" slot-scope="{ isActived }">
						<a
							v-if="menu.to"
							:href="menu.to"
							:target="menu.target"
							class="hover:font-bold"
							:class="{ 'font-bold': $route.path === menu.to }"
						>
							{{ menu.label }}
						</a>
						<a v-else href="#menu" @click.prevent="" class="hover:font-bold" :class="{ 'font-bold': isActived(menu) }">
							{{ menu.label }}
						</a>
					</template>
				</NDropDown>
				<a
					v-else-if="menu.to"
					:href="menu.to"
					:target="menu.target"
					class="hover:font-bold"
					:class="{
						'font-bold': $route && $route.path.replace(/^\/+|\/+$/g, '') === menu.to.replace(/^\/+|\/+$/g, '')
					}"
				>
					{{ menu.label }}
				</a>
				<a v-else href="#menu" @click.prevent="">
					{{ menu.label }}
				</a>
			</div>
		</nav>
		<slot name="right"></slot>
	</div>
</template>

<script>
import tailwindui from '../utils/tailwindui'

export default {
	name: 'NNav',
	props: {
		menus: Array,
		//沉浸式
		kiosk: Boolean,
		//背景色
		color: { type: String, default: 'white' },
		//Boolean: class="sticky z-50 top-0"; String: class=${sticky}
		sticky: { type: [Boolean, String], default: true },
		//Boolean: class="shadow"; String: class=${shadow}
		shadow: { type: [Boolean, String], default: true }
	},
	computed: {
		navClass() {
			return [
				tailwindui.sticky(this.sticky),
				this.kiosk ? '' : tailwindui.shadowSize(this.shadow, 'md'),
				this.kiosk ? 'bg-transparent text-white' : tailwindui.bgColor(this.color)
			]
		}
	}
}
</script>
