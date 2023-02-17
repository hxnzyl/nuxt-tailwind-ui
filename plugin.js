import Vue from 'vue'
import NuxtTailwindUI from '@nuxt-tailwind-ui/main'
Vue.use(NuxtTailwindUI)

// Project svg
const projectSvgFiles = require.context('@/assets/svg', false, /\.svg$/)
const svgImport = (context) => context.keys().map(context)
svgImport(projectSvgFiles)
