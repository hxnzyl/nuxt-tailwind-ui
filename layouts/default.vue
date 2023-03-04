<template>
	<div class="relative flex flex-col min-h-screen items-center bg-gray-50 subpixel-antialiased">
		<NNav :menus="navMenus"></NNav>
		<NTabs :tabs="components" class="flex-grow w-full p-10">
			<Nuxt />
		</NTabs>
		<div class="flex w-full justify-between bg-gray-200 px-24 py-12">
			<div class="flex flex-row">
				<div class="flex flex-col gap-4">
					<div class="text-lg font-bold">关于</div>
					<NLink
						to="https://github.com/hxnzyl/nuxt-tailwind-ui"
						target="_blank"
						class="text-sm text-gray-500 hover:text-blue-500"
					>
						GitHub
					</NLink>
				</div>
			</div>
			<div class="flex flex-col">
				<div class="flex flex-row gap-6 items-center">
					<NLink
						to="https://github.com/hxnzyl/nuxt-tailwind-ui"
						target="_blank"
						class="text-sm text-gray-500 hover:text-blue-500"
					>
						Nuxt Tailwind UI Framework~
					</NLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
//#region Require svg

// Extends icons svg
const extendsIconsFiles = require.context('../app/svg', false, /\.svg$/)
extendsIconsFiles.keys().map(extendsIconsFiles)

// Feather icons svg
const featherIconsFiles = require.context('feather-icons/dist/icons', false, /\.svg$/)
featherIconsFiles.keys().map(featherIconsFiles)

//#endregion Require svg

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
				{ label: '组件', to: '/' }
				// { label: '组件', to: '/components' }
			],
			components: [
				{ label: 'NButton', to: '/components/NButton' },
				// { label: 'NInput', to: '/components/NInput' },
				{ label: 'NModal', to: '/components/NModal' }
				// { label: 'NForm', to: '/components/NForm' }
			]
		}
	}
}
</script>
