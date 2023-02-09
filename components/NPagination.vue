<template>
	<div class="n-pagination flex flex-col gap-2">
		<div class="flex justify-center gap-4">
			<template v-if="pageIndex != 1">
				<a
					href="#1"
					class="flex justify-center items-center w-12 h-8 text-sm cursor-pointer hover:bg-indigo-900 hover:text-white"
					:class="{ 'bg-indigo-900 text-white': pageIndex == 1 }"
					@click.prevent="onChangePage(1)"
				>
					首页
				</a>
				<a
					v-if="pageIndex != 1"
					:href="`#${pageIndex - 1}`"
					class="flex justify-center items-center w-16 h-8 text-sm cursor-pointer hover:bg-indigo-900 hover:text-white"
					@click.prevent="onChangePage(pageIndex - 1)"
				>
					上一页
				</a>
			</template>
			<a
				v-for="page of startPageSize"
				:key="`start-${page}`"
				:href="`#${page + startPage}`"
				class="flex justify-center items-center w-10 h-8 text-sm cursor-pointer hover:bg-indigo-900 hover:text-white"
				:class="{ 'bg-indigo-900 text-white': page + startPage == pageIndex }"
				@click.prevent="onChangePage(page + startPage)"
			>
				{{ page + startPage }}
			</a>
			<a
				v-if="extraPage > startPage && extraPage < endPage"
				:href="`#${extraPage}`"
				class="w-10 h-8 cursor-pointer text-center tracking-widest hover:bg-indigo-900 hover:text-white"
				@click.prevent="onChangePage(extraPage)"
			>
				...
			</a>
			<template v-if="endPage > extraPage">
				<a
					v-for="page of endPageSize"
					:key="`end-${page}`"
					:href="`#${page + endPage}`"
					class="flex justify-center items-center w-10 h-8 text-sm cursor-pointer hover:bg-indigo-900 hover:text-white"
					:class="{ 'bg-indigo-900 text-white': page + endPage == pageIndex }"
					@click.prevent="onChangePage(page + endPage)"
				>
					{{ page + endPage }}
				</a>
			</template>
			<template v-if="pageIndex != totalPage">
				<a
					:href="`#${pageIndex + 1}`"
					class="flex justify-center items-center w-16 h-8 text-sm cursor-pointer hover:bg-indigo-900 hover:text-white"
					@click.prevent="onChangePage(pageIndex + 1)"
				>
					下一页
				</a>
				<a
					href="#1"
					class="flex justify-center items-center w-12 h-8 text-sm cursor-pointer hover:bg-indigo-900 hover:text-white"
					:class="{ 'bg-indigo-900 text-white': pageIndex == totalPage }"
					@click.prevent="onChangePage(totalPage)"
				>
					尾页
				</a>
			</template>
		</div>
		<div class="flex justify-center text-gray-500 text-sm">可使用键盘 “&lt;” “&gt;” 翻页</div>
	</div>
</template>

<script>
export default {
	name: 'NPagination',
	props: {
		total: Number,
		pageSize: Number,
		pageIndex: { type: Number, default: 1 },
		showPageSize: { type: Array, default: () => [8, 2] }
	},
	computed: {
		startPageSize() {
			return Math.min(this.showPageSize[0], this.totalPage)
		},
		endPageSize() {
			return Math.min(this.showPageSize[1], this.totalPage)
		},
		startPage() {
			let startPage = (Math.ceil(this.pageIndex / this.showPageSize[0]) - 1) * this.showPageSize[0]
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
		onChangePage(page) {
			this.$emit('change-page', page)
		},
		onKeyDown(event) {
			switch (event.keyCode) {
				case 37: //左键头
					if (this.pageIndex != 1) this.onChangePage(this.pageIndex - 1)
					break
				case 39: //右键头
					if (this.pageIndex != this.totalPage) this.onChangePage(this.pageIndex + 1)
					break
			}
		}
	}
}
</script>
