export default {
	price(value, defaultValue) {
		return typeof value === 'number' ? '￥' + value : defaultValue
	}
}
