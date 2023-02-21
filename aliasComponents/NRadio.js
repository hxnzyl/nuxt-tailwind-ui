import NCheckbox from '../components/NCheckbox'

export default {
	name: 'NRadio',
	extends: NCheckbox,
	props: {
		type: {
			type: String,
			default: 'radio'
		}
	}
}
