import NCheckbox from '../components/NCheckbox'
import field from '../mixins/field'

export default {
	name: 'NRadio',
	extends: { ...NCheckbox, mixins: [field('NRadioGroup')].concat(NCheckbox.mixins.slice(1)) },
	props: {
		//@overwrite
		type: { type: String, default: 'radio' }
	}
}
