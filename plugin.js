import Vue from 'vue'
import NuxtTailwindUI from '@nuxt-tailwind-ui/main'

//#region Svg preload
//<% if (options.svg.preload) options.svg.preload.forEach((svg) => { %>
require('.<%= svg %>')
//<% }) %>
//#endregion Svg preload

Vue.use(NuxtTailwindUI)
