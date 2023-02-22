<template>
	<div class="flex" :class="[`n-${type}`, getDirection == 'col' ? 'flex-col' : 'relative']">
		<div class="flex flex-grow" :class="{ 'flex-col gap-2': getDirection == 'col' }">
			<div
				v-if="label || getDirection == 'col'"
				class="flex items-center"
				:class="[getDirection == 'col' ? 'justify-between' : '', this.getLabelClass]"
			>
				<div v-if="label" class="text-base">
					<slot name="label">
						<span class="text-gray-500">{{ label }}</span>
					</slot>
					<span v-if="getRequired" class="text-red-500">*</span>
				</div>
				<div v-if="getDirection == 'col'" v-show="invalidField != null" class="text-red-500 text-xs">
					{{ invalidMessage }}
				</div>
			</div>
			<div class="flex items-center flex-grow gap-2" :class="checkboxClass" @click.stop="onChange">
				<div v-if="type == 'checkbox'" class="flex items-center justify-center" :class="nativeClass">
					<NSvg v-show="checked" name="check"></NSvg>
				</div>
				<div v-else class="flex items-center justify-center rounded-full" :class="nativeClass">
					<div v-show="checked" class="rounded-full w-1/2 h-1/2" :class="checkedClass"></div>
				</div>
				<div class="flex items-center flex-grow" :class="bodyClass">
					<slot v-bind="{ checked, disabled: getDisabled }"></slot>
				</div>
			</div>
		</div>
		<div v-if="getDirection == 'row'" v-show="invalidField != null" class="absolute -bottom-4 h-4 text-red-500 text-xs">
			{{ invalidMessage }}
		</div>
	</div>
</template>

<script>
import validator from '../mixins/validator'
import tailwindui from '../utils/tailwindui'

export default {
	name: 'NCheckbox',
	mixins: [validator],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		//多选框值
		value: [Boolean, String, Number],
		//类型:checkbox,radio
		type: { type: String, default: 'checkbox' },
		//选中值
		checkedValue: { type: [String, Number], default: 1 },
		//选中值
		uncheckedValue: { type: [String, Number], default: 0 },
		//选中颜色
		checkedColor: { type: String, default: 'blue' },
		//选中颜色
		uncheckedColor: { type: String, default: 'none' },
		//大小
		size: { type: String, default: 'md' },
		//填充模式
		fill: Boolean,
		//禁用状态
		disabled: Boolean
	},
	computed: {
		checked() {
			return this.currentValue === this.checkedValue
		},
		invalidColor() {
			if (this.disabled) return 'gray'
			if (this.invalidField) return 'red'
			return this.checked ? this.checkedColor : this.uncheckedColor
		},
		checkedClass() {
			let color
			if (this.getDisabled) color = 'gray'
			else if (this.invalidField) color = 'red'
			else color = !this.fill ? (this.checked ? this.checkedColor : this.uncheckedColor) : 'white'
			return tailwindui.bgColor(color)
		},
		nativeClass() {
			return [
				tailwindui.checkboxSize(this.size),
				this.fill && this.checked ? '' : 'border',
				this.fill ? tailwindui.bgColor(this.invalidColor) : tailwindui.borderColor(this.invalidColor),
				tailwindui.textColor(this.invalidColor)
			]
		},
		checkboxClass() {
			//不使用pointer-events-none，与cursor-not-allowed样式冲突
			return [this.getDisabled ? 'bg-opacity-50 text-opacity-50 cursor-not-allowed' : 'cursor-pointer']
		}
	},
	watch: {
		value(newValue, oldValue) {
			if (newValue !== oldValue) this.updateValue(false, newValue)
		}
	},
	data() {
		return {
			currentValue: null
		}
	},
	mounted() {
		this.updateValue(true, this.value)
	},
	methods: {
		updateValue(init, value) {
			this.currentValue = value === this.checkedValue ? this.checkedValue : this.uncheckedValue
			if (init) return
			this.$emit('change', this.currentValue)
			if (this.name) this.$nextTick(() => this.validate('change'))
		},
		onChange() {
			if (this.getDisabled) return
			this.currentValue = this.checked ? this.uncheckedValue : this.checkedValue
			this.$emit('change', this.currentValue)
			if (this.name) this.$nextTick(() => this.validate('change'))
		}
	}
}
</script>
