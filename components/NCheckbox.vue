<template>
	<div class="flex" :class="[`n-${type}`, formColDirection ? 'flex-col' : 'relative items-center']">
		<div class="flex flex-grow" :class="formColDirection ? 'flex-col gap-2' : 'items-center'">
			<div
				v-if="label || formColDirection"
				class="flex items-center"
				:class="[formColDirection ? 'justify-between' : '', this.formLabelClass]"
			>
				<div v-if="label" class="text-base">
					<slot name="label">
						<span class="text-gray-500">{{ label }}</span>
					</slot>
					<span v-if="formRequired" class="text-red-500">*</span>
				</div>
				<div v-if="formColDirection" v-show="invalidRule != null" class="text-red-500 text-xs">
					{{ invalidMessage }}
				</div>
			</div>
			<div class="flex items-center flex-grow gap-2" :class="checkboxClass" @click.stop="onChange">
				<div v-if="type == 'checkbox'" class="flex items-center justify-center" :class="nativeClass">
					<NSvg v-show="checked" name="check"></NSvg>
				</div>
				<div v-else class="flex items-center justify-center rounded-full" :class="nativeClass">
					<div v-show="checked" class="rounded-full w-1/2 h-1/2" :class="radioClass"></div>
				</div>
				<div class="flex items-center flex-grow" :class="bodyClass">
					<slot v-bind="{ checked, disabled: formDisabled }"></slot>
				</div>
			</div>
		</div>
		<div v-if="formRowDirection" v-show="invalidRule != null" class="absolute -bottom-4 h-4 text-red-500 text-xs">
			{{ invalidMessage }}
		</div>
	</div>
</template>

<script>
import validator from '../mixins/validator'
import tailwindui from '../utils/tailwindui'
import field from '../mixins/field'

export default {
	name: 'NCheckbox',
	//field放第1位，radio继承时会替换
	mixins: [field('NCheckboxGroup'), validator],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		//多选框值
		value: [Boolean, String, Number],
		//@overwrite类型:checkbox,radio
		type: { type: String, default: 'checkbox' },
		//选中值
		checkedValue: { type: [String, Number], default: 1 },
		//选中值
		uncheckedValue: { type: [String, Number], default: 0 },
		//选中颜色
		checkedColor: { type: String, default: 'blue' },
		//选中颜色
		uncheckedColor: { type: String, default: 'gray' },
		//大小
		size: { type: String, default: 'md' },
		//填充模式
		fill: Boolean
	},
	computed: {
		checked() {
			return this.currentValue === this.checkedValue
		},
		unchecked() {
			return this.currentValue === this.uncheckedValue
		},
		radioClass() {
			let color
			if (this.formDisabled) color = 'gray'
			else if (this.invalidRule) color = 'red'
			else color = this.fill ? 'white' : this.checkedColor
			return tailwindui.bgColor(color)
		},
		invalidColor() {
			if (this.formDisabled) return 'gray'
			if (this.invalidRule) return 'red'
			return this.checked ? this.checkedColor : this.uncheckedColor
		},
		nativeClass() {
			return [
				tailwindui.iconSize(this.size),
				this.fill ? tailwindui.bgColor(this.invalidColor) : '',
				this.type == 'radio' || !(this.fill && this.checked) ? 'border' : '',
				this.type == 'radio' || !this.fill ? tailwindui.borderColor(this.invalidColor) : '',
				this.formDisabled ? 'bg-opacity-50 border-opacity-50' : ''
			]
		},
		checkboxClass() {
			//不使用pointer-events-none，与cursor-not-allowed样式冲突
			return [
				tailwindui.textColor(this.invalidColor),
				this.formDisabled ? 'text-opacity-50 cursor-not-allowed' : 'cursor-pointer'
			]
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
			if (!init && (this.formDisabled || value === this.currentValue)) return
			this.currentValue = value === this.checkedValue ? this.checkedValue : this.uncheckedValue
			if (init) return
			this.$emit('change', this.currentValue)
			if (this.NForm) this.validate('change')
		},
		setChecked() {
			if (this.formDisabled) return
			this.currentValue = this.checkedValue
		},
		setUnchecked() {
			if (this.formDisabled) return
			this.currentValue = this.uncheckedValue
		},
		onChange() {
			//radio没二态切换
			if (this.formDisabled || (this.type === 'radio' && this.checked)) return
			//checkbox二态切换必定change
			this.currentValue = this.checked ? this.uncheckedValue : this.checkedValue
			this.$emit('change', this.currentValue)
			let group = this.$options.name + 'Group'
			if (this[group]) this[group].onChange(this.currentValue)
			if (this.NForm) this.validate('change')
		}
	}
}
</script>
