/**
 * tailwindcss 组件化化后类名封装
 * 此处必须export default，否则nuxt编译warn
 */
export default {
	/**
	 * 按钮大小（button）
	 *
	 * @param {String} size
	 * @returns {String}
	 */
	buttonSize(size) {
		if (size == 'none') return ''
		if (size == 'xs') return 'px-2 py-px text-xs'
		if (size == 'sm') return 'px-3 py-1 text-sm'
		if (size == 'md') return 'px-4 py-1.5 text-base'
		if (size == 'lg') return 'px-8 py-2 text-lg'
		if (size == 'xl') return 'px-12 py-2.5 text-xl'
	},
	/**
	 * 图标大小（icon,checkbox,radio）
	 *
	 * @param {String} size
	 * @returns {String}
	 */
	iconSize(size) {
		if (size == 'none') return ''
		if (size == 'xs') return 'w-2 h-2 text-xs'
		if (size == 'sm') return 'w-3 h-3 text-sm'
		if (size == 'md') return 'w-4 h-4 text-md'
		if (size == 'lg') return 'w-5 h-5 text-lg'
		if (size == 'xl') return 'w-6 h-6 text-xl'
		if (size == '2xl') return 'w-12 h-12 text-2xl'
		if (size == '4xl') return 'w-24 h-24 text-4xl'
	},
	/**
	 * 文本框大小（input,textarea,select）
	 *
	 * @param {String} size
	 * @returns {String}
	 */
	textBoxSize(size) {
		if (size == 'none') return ''
		if (size == 'xs') return 'px-1 py-px text-xs'
		if (size == 'sm') return 'px-2 py-1 text-xs'
		if (size == 'md') return 'px-3 py-2 text-sm'
		if (size == 'lg') return 'px-4 py-2.5 text-base'
		if (size == 'xl') return 'px-5 py-3 text-lg'
	},
	/**
	 * 全边框大小
	 *
	 * @param {Boolean|String} rounded
	 * @param {String} size
	 * @returns {String}
	 */
	roundedSize(rounded, size) {
		if (rounded === true) rounded = size
		if (rounded == 'none') return ''
		if (rounded == 'sm') return 'rounded-sm'
		if (rounded == 'md') return 'rounded-md'
		if (rounded == 'lg') return 'rounded-lg'
		if (rounded == 'xl') return 'rounded-xl'
	},
	/**
	 * 左上左下边框大小
	 *
	 * @param {Boolean|String} rounded
	 * @param {String} size
	 * @returns {String}
	 */
	roundedTBLSize(rounded, size) {
		if (rounded === true) rounded = size
		if (rounded == 'none') return ''
		if (rounded == 'sm') return 'rounded-tl-sm rounded-bl-sm'
		if (rounded == 'md') return 'rounded-tl-md rounded-bl-md'
		if (rounded == 'lg') return 'rounded-tl-lg rounded-bl-lg'
		if (rounded == 'xl') return 'rounded-tl-xl rounded-bl-xl'
	},
	/**
	 * 右上右下边框大小
	 *
	 * @param {Boolean|String} rounded
	 * @param {String} size
	 * @returns {String}
	 */
	roundedTBRSize(rounded, size) {
		if (rounded === true) rounded = size
		if (rounded == 'none') return ''
		if (rounded == 'sm') return 'rounded-tr-sm rounded-br-sm'
		if (rounded == 'md') return 'rounded-tr-md rounded-br-md'
		if (rounded == 'lg') return 'rounded-tr-lg rounded-br-lg'
		if (rounded == 'xl') return 'rounded-tr-xl rounded-br-xl'
	},
	/**
	 * 盒阴影
	 *
	 * @param {Boolean|String} shadow
	 * @returns {String}
	 */
	shadowSize(shadow, size) {
		if (shadow === true) shadow = size || 'md'
		if (shadow == 'none') return ''
		if (shadow == 'sm') return 'shadow-sm'
		if (shadow == 'md') return 'shadow-md'
		if (shadow == 'lg') return 'shadow-lg'
		if (shadow == 'xl') return 'shadow-xl'
	},
	/**
	 * 轮廓颜色
	 *
	 * @param {String} color
	 * @param {Boolean} light 是否为浅色
	 * @returns {String}
	 */
	ringColor(color, light) {
		if (color == 'gray') return light ? 'ring-blue-200' : 'ring-gray-500'
		if (color == 'red') return light ? 'ring-red-200' : 'ring-red-500'
		if (color == 'blue') return light ? 'ring-blue-200' : 'ring-blue-500'
	},
	/**
	 * 轮廓聚焦颜色
	 *
	 * @param {String} color
	 * @param {Boolean} light 是否为浅色
	 * @returns {String}
	 */
	focusRingColor(color, light) {
		if (color == 'gray') return light ? 'focus:ring-blue-200' : 'focus:ring-gray-500'
		if (color == 'red') return light ? 'focus:ring-red-200' : 'focus:ring-red-500'
		if (color == 'blue') return light ? 'focus:ring-blue-200' : 'focus:ring-blue-500'
	},
	/**
	 * 背景颜色
	 *
	 * @param {String} color
	 * @param {Boolean} light 是否为浅色
	 * @returns {String}
	 */
	bgColor(color, light) {
		if (color == 'current') return light ? 'bg-current bg-opacity-50' : 'bg-current'
		if (color == 'black') return light ? 'bg-gray-900' : 'bg-black'
		if (color == 'white') return light ? 'bg-gray-50' : 'bg-white'
		if (color == 'gray') return light ? 'bg-gray-200' : 'bg-gray-500'
		if (color == 'red') return light ? 'bg-red-200' : 'bg-red-500'
		if (color == 'green') return light ? 'bg-green-200' : 'bg-green-500'
		if (color == 'blue') return light ? 'bg-blue-200' : 'bg-blue-500'
		if (color == 'pink') return light ? 'bg-pink-200' : 'bg-pink-500'
	},
	/**
	 * 文本颜色
	 *
	 * @param {String} color
	 * @param {Boolean} light 是否为浅色
	 * @returns {String}
	 */
	textColor(color, light) {
		if (color == 'current') return light ? 'text-current text-opacity-50' : 'text-current'
		if (color == 'black') return light ? 'text-gray-900' : 'text-black'
		if (color == 'white') return light ? 'text-gray-50' : 'text-white'
		if (color == 'gray') return light ? 'text-gray-200' : 'text-gray-500'
		if (color == 'red') return light ? 'text-red-200' : 'text-red-500'
		if (color == 'green') return light ? 'text-green-200' : 'text-green-500'
		if (color == 'blue') return light ? 'text-blue-200' : 'text-blue-500'
		if (color == 'pink') return light ? 'text-pink-200' : 'text-pink-500'
	},
	/**
	 * 边框颜色
	 *
	 * @param {String} color
	 * @param {Boolean} light 是否为浅色
	 * @returns {String}
	 */
	borderColor(color, light) {
		if (color == 'black') return light ? 'border-gray-900' : 'border-black'
		if (color == 'white') return light ? 'border-gray-50' : 'border-white'
		if (color == 'gray') return light ? 'border-gray-200' : 'border-gray-500'
		if (color == 'red') return light ? 'border-red-200' : 'border-red-500'
		if (color == 'green') return light ? 'border-green-200' : 'border-green-500'
		if (color == 'blue') return light ? 'border-blue-200' : 'border-blue-500'
		if (color == 'pink') return light ? 'border-pink-200' : 'border-pink-500'
	},
	/**
	 * hover时缩放
	 *
	 * @param {Number} scale
	 * @returns {String}
	 */
	hoverScale(scale) {
		if (!scale || scale == 1 || scale == 100) return ''
		if (scale == 0.5 || scale == 50) return 'transition hover:scale-50'
		if (scale == 0.75 || scale == 75) return 'transition hover:scale-75'
		if (scale == 0.9 || scale == 90) return 'transition hover:scale-90'
		if (scale == 1.1 || scale == 110) return 'transition hover:scale-110'
		if (scale == 1.25 || scale == 125) return 'transition hover:scale-125'
		if (scale == 1.5 || scale == 150) return 'transition hover:scale-150'
	},
	/**
	 * 格子布局
	 *
	 * @param {Number|Boolean|String} scale
	 * @returns {String}
	 */
	grid(grid) {
		switch (typeof grid) {
			case 'boolean':
				return grid ? 'grid grid-cols-2' : ''
			case 'string':
				return grid !== '' ? grid : ''
			case 'number':
				if (grid <= 0) return ''
				if (grid == 2) return 'grid grid-cols-2'
				if (grid == 3) return 'grid grid-cols-3'
				if (grid == 4) return 'grid grid-cols-4'
				if (grid == 5) return 'grid grid-cols-5'
		}
		return ''
	},
	/**
	 * 粘性布局
	 *
	 * @param {Boolean|String} scale
	 * @returns {String}
	 */
	sticky(sticky) {
		switch (typeof sticky) {
			case 'boolean':
				return sticky ? 'sticky z-50 top-0' : ''
			case 'string':
				return sticky
		}
		return ''
	}
}
