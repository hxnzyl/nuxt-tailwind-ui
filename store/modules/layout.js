export default {
	namespaced: true,
	state: {
		windowWidth: 0, //窗口宽度
		windowHeight: 0, //窗口高度
		pageWidth: 0, //页面宽度
		pageHeight: 0 //页面高度
	},
	mutations: {
		SET_KIOSK(state, kiosk) {
			state.kiosk = kiosk
		},
		SET_WINDOW_WIDTH(state, width) {
			state.windowWidth = width
		},
		SET_WINDOW_HEIGHT(state, height) {
			state.windowHeight = height
		},
		SET_PAGE_WIDTH(state, width) {
			state.pageWidth = width
		},
		SET_PAGE_HEIGHT(state, height) {
			state.pageHeight = height
		}
	},
	actions: {
		updateKiosk({ commit }, kiosk) {
			commit('SET_KIOSK', kiosk)
		},
		updateWindowSize({ commit }, { width, height }) {
			commit('SET_WINDOW_WIDTH', width)
			commit('SET_WINDOW_HEIGHT', height)
		},
		updatePageSize({ commit }, { width, height }) {
			commit('SET_PAGE_WIDTH', width)
			commit('SET_PAGE_HEIGHT', height)
		}
	}
}
