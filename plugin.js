import Vue from 'vue'
import NuxtTailwindUI from '@nuxt-tailwind-ui/main'
Vue.use(NuxtTailwindUI)

//#region Svg Options
//<% if (options.svg) { %>

//<% if (options.svg.include) { %>
//#region Svg Include
//fix warning: Critical dependency: require function is used in a way in which dependencies cannot be statically extracted
const requireFix = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require
"<%= options.svg.include.join(',') %>".split(',').forEach((dir) => {
	const context = requireFix.context(dir, false, /\.svg$/)
	context.keys().map(context)
})
//#endregion Svg Include
//<% } %>

//<% } %>
//#endregion Svg Options
