<template>
	<div class="n-tabs flex" :class="{ 'gap-4': direction == 'row', 'flex-col': direction == 'col' }">
		<div class="flex" :class="{ 'flex-col w-1/5': direction == 'row', 'w-full bg-white': direction == 'col' }">
			<div
				v-for="(tab, key) in tabs"
				:key="key"
				class="hover:bg-gray-200"
				:class="[
					direction == 'row' ? 'border-l-2 bg-white' : 'border-b-2',
					isActived(tab, key)
						? `text-indigo-500 border-indigo-500`
						: 'border-transparent' + (disabled ? ' text-gray-500 pointer-events-none text-opacity-50' : '')
				]"
			>
				<NLink v-if="tab.to" :to="tab.to" class="block p-4">{{ tab.label }}</NLink>
				<div v-else class="p-4 cursor-pointer" @click.stop="onChange(tab, key)">{{ tab.label }}</div>
			</div>
		</div>
		<div class="flex bg-white" :class="{ 'w-4/5': direction == 'row', 'flex-col gap-4 grow': direction == 'col' }">
			<slot v-bind="{ index: currentIndex, tab: currentTab, value: currentValue }"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NTabs',
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		//选中值
		value: [String, Number],
		//选中判断
		active: Function,
		//[{label:显示文本, to:跳转链接}]
		tabs: { type: Array, required: true },
		//方向
		direction: { type: String, default: 'row' },
		//禁用状态
		disabled: Boolean
	},
	watch: {
		value(value) {
			if (value !== this.currentValue) this.updateValue(false, value)
		}
	},
	data() {
		return {
			currentIndex: -1,
			currentTab: {},
			currentValue: null
		}
	},
	mounted() {
		this.updateValue(true, this.value)
	},
	methods: {
		updateValue(init, value) {
			let index = this.tabs.findIndex(init && value == null ? this.isActived : (tab) => tab.value === value)
			let tab = this.tabs[index] || {}
			this.currentTab = tab
			this.currentIndex = index
			this.currentValue = tab.value || null
		},
		onChange(tab, index) {
			this.currentTab = tab
			this.currentIndex = index
			this.currentValue = tab.value || null
			this.$emit('change', this.currentValue)
		},
		isActived(tab, index) {
			if (tab.children && tab.children.length > 0 && tab.children.some(this.isActived)) return true
			if (typeof tab.to === 'string' && this.$route) return tab.to === this.$route.path
			if (this.currentValue != null) return tab.value === this.currentValue
			if (this.currentTab != null) return tab.label === this.currentTab.label
			if (typeof this.active === 'function') return this.active(tab, index)
			return false
		}
	}
}
</script>
