export default function (name, key) {
	return {
		provide() {
			return {
				[name]: this
			}
		},
		created() {
			this.$on(`${name}.addField`, this.addField)
			this.$on(`${name}.removeField`, this.removeField)
		},
		data() {
			return {
				fields: []
			}
		},
		methods: {
			addField(field) {
				let fieldName = field && field[key]
				if (!fieldName) return
				if (this.fields.findIndex((f) => f[key] === fieldName) === -1) this.fields.push(field)
			},
			removeField(field) {
				let fieldName = field && field[key]
				if (!fieldName) return
				let index = this.fields.findIndex((f) => f[key] === fieldName)
				if (index !== -1) this.fields.splice(index, 1)
			}
		}
	}
}
