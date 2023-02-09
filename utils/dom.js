/**
 * 获取鼠标所在位置的Element
 *
 * @returns {Element}
 */
export function getMouseElement(e) {
	let { x, y } = getMousePosition(e)
	return document.elementFromPoint(x, y)
}

/**
 * 获取鼠标绝对位置
 *
 * @param {Event} e 事件
 * @returns
 */
export function getMousePosition(e) {
	return {
		x: e.pageX || e.clientX + document.documentElement.scrollLeft - document.body.clientLeft,
		y: e.pageY || e.clientY + document.documentElement.scrollTop - document.body.clientTop
	}
}
