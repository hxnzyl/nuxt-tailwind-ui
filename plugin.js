import Vue from 'vue'

//#region Tailwind UI
import NuxtTailwindUI from '@nuxt-tailwind-ui/main'
Vue.use(NuxtTailwindUI)
//#endregion Tailwind UI

//#region Svg preload
//<% if (options.svg.preload) options.svg.preloadFiles.forEach((preloadFile) => { %>
require('<%= preloadFile %>')
//<% }) %>
//#endregion Svg preload
