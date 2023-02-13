export default {
	img(item, head, { props }) {
		return {
			is: 'NImg',
			props: {
				...props,
				src: item[head.key]
			}
		}
	},
	media(item, head, { titleKey, descKey, props }) {
		return {
			is: 'NMedia',
			props: {
				...props,
				src: item[head.key],
				title: titleKey ? item[titleKey] : '',
				desc: descKey ? item[descKey] : ''
			}
		}
	}
}
