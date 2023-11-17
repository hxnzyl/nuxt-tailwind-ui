/**
 * 字符串数据类型正常化
 *
 * @param {String} string
 * @returns {Object}
 */
export function normalizeString(string) {
	//假值直接返回
	if (!string) return string
	//如果是纯数字字符串，转成int。16位数以上不转。防止精度丢失
	if (/^\d+$/.test(string)) return string.length > 16 ? string : parseInt(string, 10)
	//如果是以逗号分开的字符串，转成array
	if (string.includes(',')) return string.split(',')
	//其它@todo
	return string
}
