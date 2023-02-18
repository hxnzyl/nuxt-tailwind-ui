import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//按需引入模块，无需手动improt
const files = require.context('./modules', true, /\.js$/)

const modules = files
	.keys()
	.reduce((modules, path) => ((modules[path.split('/').pop().split('.').shift()] = files(path).default), modules), {})

const store = new Vuex.Store({ strict: true, modules })

export default () => store
