<template>
	<div ref="root" class="n-dropdown flex relative items-center" @mouseenter="show" @mouseleave="leave">
		<slot name="label" v-bind="{ menu: currentMenu, index: currentIndex, isActived }">
			<span>{{ label }}</span>
		</slot>
		<slot v-if="arrow && menus && menus.length" name="icons">
			<i class="fe fe-arrow-down ml-2"></i>
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
				<!-- 多列 -->
				<div v-if="Array.isArray(menus[0])" class="flex flex-col rounded-md bg-white shadow-lg min-w-max">
					<h6 class="px-4 pt-2 text-lg text-gray-900 font-medium">{{ label }}</h6>
					<div class="flex max-h-96 overflow-x-hidden overflow-y-auto" @mousewheel.stop="">
						<div v-for="(menuList, key1) in menus" :key="key1" class="w-1/2 py-1.5">
							<template v-for="(menu, key2) in menuList">
								<NLink
									v-if="menu.to"
									:key="key2"
									:to="menu.to"
									class="block px-6 py-2 text-sm min-w-max transition"
									:class="isActived(menu) ? 'text-white bg-blue-500 hover:bg-opacity-50' : 'text-gray-500 hover:text-white hover:bg-blue-500'"
								>
									{{ menu.label }}
								</NLink>
								<div
									v-else
									:key="key2"
									class="px-6 py-2 text-sm min-w-max transition"
									:class="isActived(menu) ? 'text-white bg-blue-500 hover:bg-opacity-50' : 'text-gray-500 hover:text-white hover:bg-blue-500'"
									@click.stop="onChange(menu, key2)"
								>
									{{ menu.label }}
								</div>
							</template>
						</div>
					</div>
				</div>
				<!-- 单列 -->
				<div v-else class="py-1.5 max-h-96 overflow-x-hidden overflow-y-auto rounded-md bg-white shadow-lg min-w-max" @mousewheel.stop="">
					<template v-for="(menu, key) in menus">
						<NLink
							v-if="menu.to"
							:key="key"
							:to="menu.to"
							class="block px-4 py-2 text-sm min-w-max transition"
							:class="isActived(menu) ? 'text-white bg-blue-500 hover:bg-opacity-50' : 'text-gray-500 hover:text-white hover:bg-blue-500'"
						>
							{{ menu.label }}
						</NLink>
						<div
							v-else
							:key="key"
							class="px-4 py-2 text-sm min-w-max transition"
							:class="isActived(menu) ? 'text-white bg-blue-500 hover:bg-opacity-50' : 'text-gray-500 hover:text-white hover:bg-blue-500'"
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
				'top-full -mt-1.5': position == 'bottom',
				'bottom-full -mb-1.5': position == 'top',
				'right-full mr-1': position == 'left',
				'left-full ml-1': position == 'right'
			}"
		>
			<i
				class="fe"
				:class="{
					'fe-drop-up': position == 'bottom',
					'fe-drop-down': position == 'top',
					'fe-drop-right': position == 'left',
					'fe-drop-left': position == 'right'
				}"
			></i>
		</div>
	</div>
</template>

<script>
import visible from '../mixins/visible'

export default {
	name: 'NDropDown',
	mixins: [visible],
	props: {
		label: String,
		active: Function,
		menus: Array,
		arrow: { type: Boolean, default: true }
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
