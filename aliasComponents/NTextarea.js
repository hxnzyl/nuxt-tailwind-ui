import NInput from '../components/NInput'

try {
	delete NInput.props.type
} catch (e) {}

export default {
	name: 'NTextarea',
	extends: NInput,
	data() {
		return {
			type: 'textarea'
		}
	}
}
