import NInput from '../components/NInput'

export default {
	name: 'NTextarea',
	extends: NInput,
	props: {
		//@overwrite输入框类型:textarea
		type: { type: String, default: 'textarea' }
	}
}
