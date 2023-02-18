<template>
	<div class="relative flex flex-col min-h-screen items-center bg-gray-50 subpixel-antialiased">
		<div class="sticky z-50 top-0 flex items-center w-full px-10 py-4 transition duration-500 text-black bg-gray-100 shadow">
			<nav class="flex flex-grow ml-4">
				<div v-for="(menu, key) in navMenus" :key="key" class="px-8 relative">
					<NLink v-if="!menu.children" :to="menu.to" class="hover:font-bold" :class="{ 'font-bold': $route.path === menu.to }">
						{{ menu.label }}
					</NLink>
					<NDropDown v-else :menus="menu.children">
						<template slot="label" slot-scope="{ isActived }">
							<a href="#menu" @click.prevent="" class="hover:font-bold" :class="{ 'font-bold': isActived(menu) }">
								{{ menu.label }}
							</a>
						</template>
					</NDropDown>
				</div>
			</nav>
		</div>
		<Nuxt ref="container" class="flex grow" />
		<div class="flex flex-col w-full">
			<div class="flex flex-row justify-between bg-gray-200 px-24 py-12">
				<div class="flex flex-row">
					<div class="flex flex-col gap-4">
						<div class="text-lg font-bold">关于</div>
						<NLink to="https://github.com/hxnzyl/nuxt-tailwind-ui" target="_blank" class="text-sm text-gray-500 hover:text-blue-500">
							GitHub
						</NLink>
					</div>
				</div>
				<div class="flex flex-col">
					<div class="flex flex-row gap-6 items-center">
						<NLink to="https://github.com/hxnzyl/nuxt-tailwind-ui" target="_blank" class="text-sm text-gray-500 hover:text-blue-500">
							Nuxt Tailwind UI Framework~
						</NLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	scrollToTop: true,
	provide() {
		return {
			layout: this
		}
	},
	data() {
		return {
			navMenus: [
				{ label: '首页', to: '/' },
				{ label: '组件', to: '/components' }
			]
		}
	}
}
</script>
