import NInput from '../components/NInput'

export default {
	name: 'NTextarea',
	extends: NInput,
	props: {
		type: {
			type: String,
			default: 'textarea'
		}
	}
}
