import NCheckboxGroup from '../components/NCheckboxGroup'
import fields from '../mixins/fields'

export default {
	name: 'NRadioGroup',
	extends: { ...NCheckboxGroup, mixins: [fields('NRadioGroup', 'checkedValue')].concat(NCheckboxGroup.mixins.slice(1)) },
	props: {
		//@overwrite
		type: { type: String, default: 'radio' }
	}
}
