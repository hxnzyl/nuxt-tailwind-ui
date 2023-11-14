<template>
	<div class="n-table w-full relative">
		<table class="border-collapse table-auto text-center w-full">
			<thead v-if="!hideThead" class="bg-gray-200">
				<tr>
					<template v-if="layer">
						<th
							v-for="(head, key) in heads[0]"
							:key="key"
							class="border-0 p-3 text-gray-500"
							:class="head.thClass"
							:style="`width:${layerThWidth[key] || ''}px;${head.thCssText || ''}`"
						>
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
					<td :colspan="layer ? heads[0].length : heads.length">
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
									<div v-for="(head, key3) in heads[1]" :key="key3" :class="head.class">
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
									@layer-loaded="layerLoaded"
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
								:key="`td-${key1}-${key2}`"
								:ref="`td-${key2}`"
								class="border border-gray-200 p-3 text-gray-400"
								:class="head.tdClass"
								:style="`width:${layerThWidth[key2] || ''}px;${head.tdCssText || ''}`"
								:rowspan="getRowspan(item, head)"
							>
								<NVFor
									v-if="head.key == 'action'"
									:value="getActions(item, head)"
									class="flex flex-col items-center justify-center gap-2"
								>
									<template slot="if" slot-scope="action">
										<NButton v-bind="action"></NButton>
									</template>
									<template slot="else">{{ valuePlaceholder }}</template>
								</NVFor>
								<NComponent v-else-if="head.component" :value="component(item, head)"></NComponent>
								<div v-else-if="head.formatter" v-html="formatter(item, head)"></div>
								<template v-else>{{ formatter(item, head) }}</template>
							</td>
						</template>
					</tr>
				</template>
			</tbody>
		</table>
		<!-- 数据加载中 -->
		<NLoading v-show="currentLoading" size="lg" color="gray" mask></NLoading>
	</div>
</template>

<script>
import Formatter from '../helpers/formatter'
import loading from '../mixins/loading'

export default {
	name: 'NTable',
	mixins: [loading],
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
		//无数据占位文本
		itemsPlaceholder: { type: String, default: '暂无数据' },
		//为null时的占位文本
		valuePlaceholder: { type: String, default: '-' }
	},
	data() {
		return {
			layerThWidth: []
		}
	},
	mounted() {
		if (this.layerKey) this.$emit('layer-loaded', this)
	},
	methods: {
		layerLoaded(layerTable) {
			layerTable.heads.forEach((head, key) => {
				const layerTdList = layerTable.$refs[`td-${key}`]
				if (!layerTdList) return
				let layerTdWidth = layerTdList.map((td) => td.offsetWidth)
				layerTdWidth.push(this.layerThWidth[key] || 0)
				this.$set(this.layerThWidth, key, Math.max(...layerTdWidth))
			})
		},
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
			return (this.actions || []).reduce(
				(actions, action, props) => actions.concat((props = action(item, head, this)) || []),
				[]
			)
		},
		/**
		 * 自定义渲染组件
		 */
		component(item, head) {
			let { target, key, component } = head
			//展示来自layerTarget的数据
			if (target) item = this.layerTarget || {}
			//NULL值处理
			if (item[key] == null) return { value: this.valuePlaceholder }
			//自定义组件，将当前值当value传递
			if (typeof component === 'string') return { is: component, value: item[key] }
			//自定义组件参数处理
			if (typeof component === 'function') {
				if ((component = component(item[key], item, head)) && component.is) return component
				console.warn('nuxt-tailwind-ui:', `NTable.heads[].${key}.component.is ${component} invalid`)
			}
			//默认处理
			return { value: item[key] }
		},
		/**
		 * 自定义格式方法
		 */
		formatter(item, head) {
			let { target, key, dict, formatter } = head
			//展示来自layerTarget的数据
			if (target) item = this.layerTarget || {}
			//NULL值处理
			if (item[key] == null) return this.valuePlaceholder
			//字典翻译
			if (dict && typeof dict === 'object') return dict[item[key]]
			//自定义格式化方法
			if (typeof formatter === 'function') return formatter(item[key], item, head)
			//已集成的格式化类型
			if (typeof formatter === 'string') {
				if (Formatter[formatter]) return Formatter[formatter](item[key])
				console.warn('nuxt-tailwind-ui:', `NTable.heads[].${key}.formatter ${formatter} invalid`)
			}
			//默认处理
			return item[key]
		}
	}
}
</script>
