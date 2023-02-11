<template>
	<div class="n-table relative w-full">
		<table class="border-collapse table-fixed text-center w-full">
			<thead v-if="!hideThead" class="bg-gray-200">
				<tr>
					<template v-if="layer">
						<th v-for="(head, key) in heads[0]" :key="key" class="border-0 p-3 text-gray-500" :class="head.thClass">
							{{ head.label }}
						</th>
					</template>
					<template v-else>
						<th v-for="(head, key) in heads" :key="key" class="border border-gray-200 p-3 text-gray-500" :class="head.thClass">
							{{ head.label }}
						</th>
					</template>
				</tr>
			</thead>
			<tbody>
				<!-- 数据为空 -->
				<tr v-if="!items.length" class="h-20">
					<td :colspan="heads[0].length">
						<!-- 非加载中 -->
						<div v-show="!loading" class="flex items-center justify-center">
							{{ itemsPlaceholder }}
						</div>
					</td>
				</tr>
				<!-- 多层级展示 -->
				<template v-else-if="layer">
					<tr class="bg-white h-3">
						<td :colspan="heads[0].length"></td>
					</tr>
					<tr v-for="(item, key1) in items" :key="key1" class="bg-gray-100">
						<td :colspan="heads[0].length">
							<div class="flex flex-col items-center w-full bg-gray-100">
								<div class="flex items-center justify-around w-full p-3 text-gray-400">
									<div v-for="(head, key3) in heads[1]" :key="key3">
										<span>{{ head.label }}</span>
										<span>{{ formatter(item, head) }}</span>
									</div>
								</div>
								<NTable
									:heads="heads[0]"
									:items="item[layerKey]"
									:actions="actions"
									:layer="false"
									:layer-key="layerKey"
									:layer-target="item"
									class="bg-white"
									hide-thead
								></NTable>
							</div>
						</td>
					</tr>
				</template>
				<!-- 单层级展示 -->
				<template v-else>
					<tr v-for="(item, key1) in items" :key="key1">
						<template v-for="(head, key2) in heads">
							<td
								v-if="!item._layerRowspan || !item._layerRowspan[head.key]"
								:key="key2"
								class="border border-gray-200 p-3 text-gray-400"
								:class="head.tdClass"
								:rowspan="getRowspan(item, head)"
							>
								<NVFor v-if="head.key == 'action'" :value="getActions(item, head)" class="flex flex-col items-center justify-center gap-2">
									<template slot="if" slot-scope="action"><NButton v-bind="action"></NButton></template>
									<template slot="else">{{ valuePlaceholder }}</template>
								</NVFor>
								<template v-else>
									{{ formatter(item, head) }}
								</template>
							</td>
						</template>
					</tr>
				</template>
			</tbody>
		</table>
		<!-- 数据加载中 -->
		<NLoading v-show="loading" size="lg" color="gray" mask></NLoading>
	</div>
</template>

<script>
export default {
	name: 'NTable',
	props: {
		//表头
		heads: Array,
		//是否隐藏表头
		hideThead: Boolean,
		//数据
		items: Array,
		//操作列，Array<Function>
		actions: Array,
		//是否开启二层展示
		layer: Boolean,
		//二层数据键
		layerKey: String,
		//上层数据
		layerTarget: Object,
		//加载中
		loading: Boolean,
		//无数据占位文本
		itemsPlaceholder: { type: String, default: '暂无数据' },
		//为null时的占位文本
		valuePlaceholder: { type: String, default: '-' }
	},
	methods: {
		getRowspan(item, head) {
			if (!head.target || !this.layerTarget || this.items.length <= 1) return ''
			//第二层数据记录下被跨行的列
			this.items.forEach((item) => this.setRowspan(item, head))
			delete item._layerRowspan
			return this.layerTarget[this.layerKey].length
		},
		setRowspan(item, head) {
			item._layerRowspan = item._layerRowspan || {}
			item._layerRowspan[head.key] = 1
		},
		getActions(item, head) {
			return (this.actions || []).reduce((actions, action, props) => actions.concat((props = action(item, head, this)) || []), [])
		},
		formatter(item, head) {
			//展示来自layerTarget的数据
			if (head.target) item = this.layerTarget || {}
			//NULL值处理
			if (item[head.key] == null) return this.valuePlaceholder
			//字典翻译
			if (head.dict) return head.dict[item[head.key]]
			//默认处理
			return item[head.key]
		}
	}
}
</script>
