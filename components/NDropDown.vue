<template>
	<div ref="root" class="n-dropdown flex gap-2 relative items-center" @mouseenter="show" @mouseleave="leave">
		<slot name="label" v-bind="{ menu: currentMenu, index: currentIndex, isActived }">
			<span>{{ label }}</span>
		</slot>
		<slot v-if="arrow && menus && menus.length" name="icons">
			<NSvg name="chevron-down"></NSvg>
		</slot>
		<div
			v-show="currentVisible"
			@mouseenter="show"
			@mouseleave="leave"
			class="absolute z-10"
			:class="{
				'left-1/2 -translate-x-2/4': position == 'bottom' || position == 'top',
				'top-1/2 -translate-y-2/4': position == 'left' || position == 'right',
				'top-full pt-2': position == 'bottom',
				'bottom-full pb-2': position == 'top',
				'right-full pr-2': position == 'left',
				'right-full pl-2': position == 'left'
			}"
		>
			<slot name="menus" v-bind="{ isActived, menus, onChange }">
				<div
					class="py-1.5 max-h-96 overflow-x-hidden overflow-y-auto rounded-md bg-white shadow-lg min-w-max"
					:class="menusClass"
					@mousewheel.stop=""
				>
					<template v-for="(menu, key) in menus">
						<NLink
							v-if="menu.to"
							:key="key"
							:to="menu.to"
							:target="menu.target"
							class="block px-4 py-2 text-sm min-w-max transition"
							:class="
								isActived(menu) ? 'text-white bg-blue-500 hover:bg-opacity-50' : 'text-gray-500 hover:text-white hover:bg-blue-500'
							"
						>
							{{ menu.label }}
						</NLink>
						<div
							v-else
							:key="key"
							class="px-4 py-2 text-sm min-w-max transition"
							:class="
								isActived(menu) ? 'text-white bg-blue-500 hover:bg-opacity-50' : 'text-gray-500 hover:text-white hover:bg-blue-500'
							"
							@click.stop="onChange(menu, key)"
						>
							{{ menu.label }}
						</div>
					</template>
				</div>
			</slot>
		</div>
		<div
			v-if="!visible"
			v-show="currentVisible"
			class="absolute z-20 text-white"
			:class="{
				'left-1/2 -translate-x-2/4': position == 'bottom' || position == 'top',
				'top-1/2 -translate-y-2/4': position == 'left' || position == 'right',
				'top-full -mt-0.5': position == 'bottom',
				'bottom-full -mb-0.5': position == 'top',
				'right-full': position == 'left',
				'left-full': position == 'right'
			}"
		>
			<NSvg
				:name="{
					'drop-up': position == 'bottom',
					'drop-down': position == 'top',
					'drop-right': position == 'left',
					'drop-left': position == 'right'
				}"
			></NSvg>
		</div>
	</div>
</template>

<script>
import visible from '../mixins/visible'
import tailwindui from '../utils/tailwindui'

export default {
	name: 'NDropDown',
	mixins: [visible],
	props: {
		label: String,
		active: Function,
		menus: Array,
		grid: [Boolean, String, Number],
		arrow: { type: Boolean, default: true }
	},
	computed: {
		menusClass() {
			let type = typeof this.grid
			return [
				type === 'boolean' && this.grid === true ? 'grid grid-cols-2' : '',
				type === 'number' && this.grid > 0 ? tailwindui.grid(this.grid) : '',
				type === 'string' && this.grid !== '' ? this.grid : ''
			]
		}
	},
	data() {
		let index = this.menus ? this.menus.findIndex(this.isActived) : -1
		let menu = index == -1 ? null : this.menus[index]
		return { currentIndex: index, currentMenu: menu }
	},
	methods: {
		isActived(menu, index) {
			//多列菜单
			if (Array.isArray(menu)) return menu.findIndex(this.isActived) !== -1
			//子级选中则父级选中
			if (Array.isArray(menu.children)) return menu.children.findIndex(this.isActived) !== -1
			//链接菜单
			if (menu.to && this.$route) return this.$route.path === menu.to
			//默认选中判断
			if (!this.active) return !!this.currentMenu && menu.label == this.currentMenu.label
			//自定义选中判断
			return this.active(menu, index)
		},
		onChange(menu, index) {
			this.currentMenu = menu
			this.currentIndex = index
			this.$emit('change', { menu, index })
		}
	}
}
</script>
