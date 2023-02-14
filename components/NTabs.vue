<template>
	<div class="n-tabs flex relative" :class="[direction == 'row' ? 'gap-4' : 'flex-col']">
		<div class="flex" :class="[direction == 'row' ? 'flex-col w-1/5' : 'w-full bg-white']">
			<div
				v-for="(tab, key) in tabs"
				:key="key"
				class="hover:bg-gray-200"
				:class="[
					direction == 'row' ? 'border-l-2 bg-white' : 'border-b-2',
					!isActived(tab, key)
						? disabled
							? 'border-transparent text-gray-500 text-opacity-50 pointer-events-none'
							: 'border-transparent'
						: 'text-indigo-500 border-indigo-500'
				]"
			>
				<NLink v-if="tab.to" :to="tab.to" class="block p-4">{{ tab.label }}</NLink>
				<a v-else-if="queryName" :href="`?${queryName}=${tab.value}`" @click.prevent="onChange(tab, key)" class="block p-4">{{ tab.label }}</a>
				<div v-else class="p-4 cursor-pointer" @click.stop="onChange(tab, key)">{{ tab.label }}</div>
			</div>
		</div>
		<div class="flex bg-white" :class="[bodyClass, direction == 'row' ? 'w-4/5' : 'flex-col grow']">
			<slot v-bind="{ index: currentIndex, tab: currentTab, value: currentValue }"></slot>
		</div>
	</div>
</template>

<script>
import query from '../mixins/query'

export default {
	name: 'NTabs',
	mixins: [query],
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
		//内容class
		bodyClass: { type: String, default: 'gap-4' },
		//禁用状态
		disabled: Boolean
	},
	watch: {
		value(newValue, oldValue) {
			if (newValue !== oldValue) this.updateValue(false, newValue)
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
			this.currentValue = tab.value == null ? null : tab.value
		},
		onChange(tab, index) {
			this.currentTab = tab
			this.currentIndex = index
			this.currentValue = tab.value == null ? null : tab.value
			this.$emit('change', this.currentValue)
			this.changeQueryObject(this.currentValue)
		},
		isActived(tab, index) {
			if (tab.children && tab.children.length > 0 && tab.children.some(this.isActived)) return true
			if (typeof tab.to === 'string' && this.$route) return tab.to == this.$route.path
			if (this.currentValue != null) return tab.value == this.currentValue
			if (this.currentTab != null) return tab.label == this.currentTab.label
			if (typeof this.active === 'function') return this.active(tab, index)
			return false
		}
	}
}
</script>
