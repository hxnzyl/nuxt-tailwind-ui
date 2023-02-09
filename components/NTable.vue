<template>
	<table class="border-collapse text-center">
		<thead v-if="!hideThead" class="bg-gray-200 text-gray-400">
			<tr>
				<template v-if="layer">
					<th v-for="(head, key) in heads[0]" :key="key" class="border-0 p-3">
						{{ head.label }}
					</th>
				</template>
				<template v-else>
					<th v-for="(head, key) in heads" :key="key" class="border border-gray-100 p-3">
						{{ head.label }}
					</th>
				</template>
			</tr>
		</thead>
		<tbody class="text-gray-500">
			<template v-if="layer">
				<tr class="bg-white h-3">
					<td :colspan="heads[0].length"></td>
				</tr>
				<tr v-for="(item, key1) in items" :key="key1" class="bg-gray-100">
					<td :colspan="heads[0].length">
						<div class="flex flex-col items-center w-full bg-gray-100 text-gray-400">
							<div class="flex items-center justify-around w-full p-3">
								<div v-for="(head, key3) in heads[1]" :key="key3">
									<span>{{ head.label }}</span>
									<span>{{ item[head.key] }}</span>
								</div>
							</div>
							<NTable :heads="heads[0]" :items="item[layer]" class="w-full bg-white" hide-thead></NTable>
						</div>
					</td>
				</tr>
			</template>
			<template v-else>
				<tr v-for="(item, key1) in items" :key="key1">
					<td v-for="(head, key2) in heads" :key="key2" class="border border-gray-200 p-3">
						<!-- NULL值处理 -->
						<template v-if="item[head.key] == null">
							{{ placeholder || '' }}
						</template>
						<!-- 字典翻译 -->
						<template v-if="head.dict && typeof head.dict === 'object'">
							{{ head.dict[item[head.key]] }}
						</template>
						<!-- 默认处理 -->
						<template v-else>
							{{ item[head.key] }}
						</template>
					</td>
				</tr>
			</template>
		</tbody>
	</table>
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
		//二层展示
		layer: String,
		//为null时的占位文本
		placeholder: { type: String, default: '-' }
	},
	computed: {
		theads() {
			return this.layer ? this.heads[0] : this.heads
		}
	}
}
</script>
