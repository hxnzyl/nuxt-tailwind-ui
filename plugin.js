import Vue from 'vue'
import NuxtTailwindUI from '@nuxt-tailwind-ui/main'

//#region Svg preload
//<% if (options.svg.preload) options.svg.preloadFiles.forEach((preloadFile) => { %>
require('<%= preloadFile %>')
//<% }) %>
//#endregion Svg preload

Vue.use(NuxtTailwindUI)
