export default function (name) {
	return {
		inject: {
			[name]: { value: name, default: null }
		},
		mounted() {
			if (this[name]) this[name].$emit(`${name}.addField`, this)
		}
	}
}
