<template>
	<div v-if="total > 0 && total > pageSize" class="n-pagination flex flex-col gap-2 relative">
		<div class="flex justify-center gap-4">
			<template v-if="value != 1">
				<a
					href="#first"
					class="flex justify-center items-center w-12 h-8 text-sm cursor-pointer hover:bg-indigo-900 hover:text-white"
					:class="{ 'bg-indigo-900 text-white': value == 1 }"
					@click.prevent="onChange(1)"
				>
					首页
				</a>
				<a
					v-if="value != 1"
					:href="`#prev-${value - 1}`"
					class="flex justify-center items-center w-16 h-8 text-sm cursor-pointer hover:bg-indigo-900 hover:text-white"
					@click.prevent="onChange(value - 1)"
				>
					上一页
				</a>
			</template>
			<a
				v-for="page of startPageSize"
				:key="`start-${page}`"
				:href="`#start-${page + startPage}`"
				class="flex justify-center items-center w-10 h-8 text-sm cursor-pointer hover:bg-indigo-900 hover:text-white"
				:class="{ 'bg-indigo-900 text-white': page + startPage == value }"
				@click.prevent="onChange(page + startPage)"
			>
				{{ page + startPage }}
			</a>
			<a
				v-if="extraPage > startPage && extraPage < endPage"
				:href="`#group-${extraPage}`"
				class="w-10 h-8 cursor-pointer text-center tracking-widest hover:bg-indigo-900 hover:text-white"
				@click.prevent="onChange(extraPage)"
			>
				...
			</a>
			<template v-if="endPage > extraPage">
				<a
					v-for="page of endPageSize"
					:key="`end-${page}`"
					:href="`#end-${page + endPage}`"
					class="flex justify-center items-center w-10 h-8 text-sm cursor-pointer hover:bg-indigo-900 hover:text-white"
					:class="{ 'bg-indigo-900 text-white': page + endPage == value }"
					@click.prevent="onChange(page + endPage)"
				>
					{{ page + endPage }}
				</a>
			</template>
			<template v-if="value != totalPage">
				<a
					:href="`#next-${value + 1}`"
					class="flex justify-center items-center w-16 h-8 text-sm cursor-pointer hover:bg-indigo-900 hover:text-white"
					@click.prevent="onChange(value + 1)"
				>
					下一页
				</a>
				<a
					href="#last"
					class="flex justify-center items-center w-12 h-8 text-sm cursor-pointer hover:bg-indigo-900 hover:text-white"
					:class="{ 'bg-indigo-900 text-white': value == totalPage }"
					@click.prevent="onChange(totalPage)"
				>
					尾页
				</a>
			</template>
		</div>
		<div class="flex justify-center text-gray-500 text-sm">可使用键盘 “&lt;” “&gt;” 翻页</div>
		<!-- 数据加载中 -->
		<NLoading v-show="loading" size="lg" color="gray" mask></NLoading>
	</div>
</template>

<script>
import query from '../mixins/query'

export default {
	name: 'NPagination',
	mixins: [query],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		//第几页
		value: { type: Number, default: 1 },
		//总记录数
		total: Number,
		//每页记录数
		pageSize: Number,
		//是否显示每页记录数选项
		showPageSize: { type: Array, default: () => [8, 2] },
		//加载中
		loading: Boolean
	},
	computed: {
		startPageSize() {
			return Math.min(this.showPageSize[0], this.totalPage)
		},
		endPageSize() {
			return Math.min(this.showPageSize[1], this.totalPage)
		},
		startPage() {
			if (this.showPageSize[0] > this.totalPage) return 0
			let startPage = (Math.ceil(this.value / this.showPageSize[0]) - 1) * this.showPageSize[0]
			return startPage + this.showPageSize[0] > this.totalPage ? this.totalPage - this.showPageSize[0] : startPage
		},
		extraPage() {
			return this.startPage + this.showPageSize[0] + 1
		},
		endPage() {
			return Math.max(0, this.totalPage - this.showPageSize[1])
		},
		totalPage() {
			return Math.ceil(this.total / this.pageSize)
		}
	},
	beforeDestroy() {
		document.removeEventListener('keydown', this.onKeyDown, false)
	},
	beforeMount() {
		document.addEventListener('keydown', this.onKeyDown, false)
	},
	methods: {
		onChange(page) {
			this.$emit('change', page)
			this.changeQueryObject(page)
		},
		onKeyDown(event) {
			switch (event.keyCode) {
				case 37: //左键头
					if (this.value != 1) this.onChange(this.value - 1)
					break
				case 39: //右键头
					if (this.value != this.totalPage) this.onChange(this.value + 1)
					break
			}
		}
	}
}
</script>
