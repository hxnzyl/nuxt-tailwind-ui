<template>
	<div ref="root" class="n-select flex relative" :class="{ 'flex-col gap-2': formColDirection }" @mouseleave="leave">
		<div
			v-if="label || formColDirection"
			class="flex items-center"
			:class="[formColDirection ? 'justify-between' : '', this.formLabelClass]"
		>
			<div v-if="label" class="text-base">
				<span class="text-gray-500">{{ label }}</span>
				<span v-if="formRequired" class="text-red-500">*</span>
			</div>
			<div v-if="formColDirection" v-show="invalidField != null" class="text-red-500 text-xs">
				{{ invalidMessage }}
			</div>
		</div>
		<div class="relative flex items-center flex-grow group" @click.stop="show" @mouseleave="leave" :class="selectClass">
			<div class="flex flex-wrap flex-grow gap-2" :class="nativeClass">
				<template v-if="multiple">
					<div
						v-for="(opt, key) in currentOption"
						:key="key"
						class="flex items-center gap-1 text-sm text-white bg-blue-500 rounded-md px-2 py-0.5"
					>
						<span>{{ opt.label }}</span>
						<a href="#remove" @click.stop.prevent="removeOption(opt, key)" class="hover:text-red-500">
							<NSvg name="x"></NSvg>
						</a>
					</div>
					<span v-show="!currentOption.length" class="text-gray-400 select-none">{{ placeholder }}</span>
				</template>
				<template v-else>
					<span v-show="currentOption.label">{{ currentOption.label }}</span>
					<span v-show="!currentOption.label" class="text-gray-400 select-none">{{ placeholder }}</span>
				</template>
			</div>
			<a
				v-if="clearable"
				href="#clear"
				@click.stop.prevent="clear"
				class="hidden hover:text-opacity-50 text-gray-400 mr-2"
				:class="{ 'group-hover:block': valueNotEmpty }"
			>
				<NSvg name="x"></NSvg>
			</a>
			<a href="#chevron" @click.prevent.stop="show" class="text-gray-400 mr-2">
				<NSvg name="chevron-right" class="transition direction-500" :class="{ 'rotate-90': currentVisible }"></NSvg>
			</a>
			<div
				v-show="currentVisible"
				@mouseenter.stop="show"
				@mouseleave="leave"
				class="absolute z-10 w-full"
				:class="optionsClass"
			>
				<slot name="options">
					<div v-if="options.length > 0" class="py-2 bg-gray-100 rounded-md shadow-lg">
						<div class="max-h-96 overflow-x-hidden overflow-y-auto" :class="{ 'divide-y': multiple }" @mousewheel.stop="">
							<div
								v-for="(option, key) in options"
								:key="key"
								class="min-w-max px-6 py-2 text-sm transition"
								:class="
									isActived(option) ? 'text-white bg-blue-500 hover:bg-opacity-50' : 'text-gray-500 hover:text-white hover:bg-blue-500'
								"
								@click.stop="onChange(option, key)"
							>
								{{ option.label }}
							</div>
						</div>
					</div>
					<div v-else class="py-2 text-sm text-gray-400 text-center bg-gray-100">{{ optionsPlaceholder }}</div>
				</slot>
			</div>
		</div>
		<div
			v-if="!visible"
			v-show="currentVisible"
			class="absolute z-20 text-gray-100"
			:class="{
				'left-1/2 -translate-x-2/4': position == 'bottom' || position == 'top',
				'top-full -mt-0.5': position == 'bottom',
				'bottom-full -mb-0.5': position == 'top'
			}"
		>
			<NSvg :name="{ 'drop-up': position == 'bottom', 'drop-down': position == 'top' }"></NSvg>
		</div>
		<div v-if="formRowDirection" v-show="invalidField != null" class="absolute -bottom-4 h-4 text-red-500 text-xs">
			{{ invalidMessage }}
		</div>
	</div>
</template>

<script>
import validator from '../mixins/validator'
import visitable from '../mixins/visitable'
import clearable from '../mixins/clearable'
import tailwindui from '../utils/tailwindui'

export default {
	name: 'NSelect',
	mixins: [validator, visitable, clearable],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		//选中值
		value: [String, Number, Array],
		//占位文本
		placeholder: { type: String, default: '请选择' },
		//下拉选项
		options: { type: Array, default: () => [] },
		//下拉选项占位文本
		optionsPlaceholder: { type: String, default: '暂无数据' },
		//文本颜色
		color: { type: String, default: 'gray' },
		//大小
		size: { type: String, default: 'md' },
		//是否有圆角
		rounded: { type: Boolean, default: true },
		//是否有边框
		border: { type: Boolean, default: true },
		//是否有轮廓环
		ring: { type: Boolean, default: true },
		//是否多选
		multiple: Boolean
	},
	computed: {
		invalidColor() {
			return this.invalidField ? 'red' : this.color
		},
		optionsClass() {
			return [
				this.bodyClass,
				this.position == 'bottom' || this.position == 'top' ? 'left-1/2 -translate-x-2/4' : '',
				this.position == 'bottom' ? 'top-full pt-2' : this.position == 'top' ? 'bottom-full pb-2' : ''
			]
		},
		nativeClass() {
			return [tailwindui.textColor(this.invalidColor), tailwindui.textBoxSize(this.size)]
		},
		selectClass() {
			return [
				this.rounded ? tailwindui.roundedSize(this.size) : '',
				this.border ? 'border' : '',
				this.border ? tailwindui.borderColor(this.invalidColor, this.invalidField == null) : '',
				this.ring && this.currentVisible ? 'ring-1 ring-opacity-50' : '',
				this.ring && this.currentVisible ? tailwindui.ringColor(this.invalidColor) : '',
				//禁用：无事件，禁用鼠标，不使用pointer-events-none，与cursor-not-allowed样式冲突
				this.formDisabled ? 'bg-gray-200 bg-opacity-50 text-opacity-50 cursor-not-allowed' : 'bg-white'
			]
		}
	},
	watch: {
		options(newValue, oldValue) {
			if (newValue !== oldValue) this.updateValue(false, this.currentValue)
		}
	},
	data() {
		return {
			currentIndex: this.multiple ? null : -1,
			currentOption: this.multiple ? [] : {},
			currentValue: this.multiple ? [] : null
		}
	},
	methods: {
		//@overwrite visible.updateVisible
		updateVisible(init, value) {
			this.updateValue(init, value)
		},
		updateValue(init, value) {
			let currentValue
			if (this.multiple) {
				if (typeof value === 'string') value = value.split(',')
				else if (value == null) value = []
				this.currentOption = this.options.filter(
					init && !value.length ? this.isActived : (option) => value.includes(option.value)
				)
				currentValue = this.currentOption.map((opt) => opt.value)
				if (this.propValueType === 'string') currentValue = currentValue.join(',')
			} else {
				let index = this.options.findIndex(init && value == null ? this.isActived : (option) => option.value === value)
				let option = this.options[index] || {}
				this.currentIndex = index
				this.currentOption = option
				currentValue = option.value == null ? this.getDefaultValue() : option.value
			}
			//非二态切换可能没change
			if (!init && currentValue === this.currentValue) return
			this.currentValue = currentValue
			if (init) return
			this.$emit('change', currentValue)
			if (this.name) this.validate('change')
		},
		onChange(option, index) {
			this.hide()
			let currentValue
			if (this.multiple) {
				if ((index = this.currentValue.indexOf(option.value)) === -1) this.addOption(option)
				else this.removeOption(option, index)
				currentValue = this.propValueType === 'string' ? this.currentValue.join(',') : this.currentValue
			} else {
				this.currentIndex = index
				this.currentOption = option
				currentValue = option.value == null ? this.getDefaultValue() : option.value
				if (currentValue === this.currentValue) return
				this.currentValue = currentValue
			}
			this.$emit('change', currentValue)
			if (this.name) this.validate('change')
		},
		isActived(option, index) {
			if (this.multiple) {
				if (this.currentValue.length > 0) return this.currentValue.includes(option.value)
				if (this.currentOption.length > 0) return this.currentOption.findIndex((opt) => opt.label === option.label)
			} else {
				if (this.currentValue != null) return option.value === this.currentValue
				if (this.currentOption != null) return option.label === this.currentOption.label
			}
			return false
		},
		addOption(option) {
			this.currentValue.push(option.value)
			this.currentOption.push(option)
		},
		removeOption(option, index) {
			this.currentValue.splice(index, 1)
			this.currentOption.splice(index, 1)
		}
	}
}
</script>
