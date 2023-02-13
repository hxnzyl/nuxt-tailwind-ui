<template>
	<div ref="root" class="n-select flex relative" :class="{ 'flex-col gap-2': getDirection == 'col' }" @mouseleave="leave">
		<div class="flex items-center" :class="{ 'justify-between': getDirection == 'col' }">
			<div v-if="label" class="text-base">
				<span v-if="getRequired" class="text-red-500">*</span>
				<span class="text-gray-500">{{ label }}</span>
			</div>
			<div v-if="getDirection == 'col'" v-show="invalidField != null" class="text-red-500 text-xs">
				{{ invalidMessage }}
			</div>
		</div>
		<div class="relative flex items-center py-2 px-3 cursor-default" @click.stop="show" @mouseleave="leave" :class="selectClass">
			<div class="flex flex-wrap grow gap-2">
				<template v-if="multiple">
					<div v-for="(opt, key) in currentOption" :key="key" class="flex items-center gap-1 text-sm text-white bg-blue-500 rounded-md px-2 py-0.5">
						<span>{{ opt.label }}</span>
						<a href="#remove" @click.stop.prevent="removeOption(opt, key)" class="hover:text-red-500"><i class="fe fe-close"></i></a>
					</div>
					<div v-show="!currentOption.length" class="text-gray-400 select-none">{{ placeholder }}</div>
				</template>
				<template v-else>
					<div v-show="currentOption.label" class="text-gray-500">{{ currentOption.label }}</div>
					<div v-show="!currentOption.label" class="text-gray-400 select-none">{{ placeholder }}</div>
				</template>
			</div>
			<a
				v-if="clearable"
				v-show="multiple ? currentValue.length > 0 : !!currentValue"
				href="#clear"
				@click.stop.prevent="updateValue(false, null)"
				class="text-gray-400 hover:text-opacity-50 px-3"
			>
				<i class="fe fe-close"></i>
			</a>
			<a href="#arrow" @click.prevent="" class="text-gray-500">
				<i class="fe fe-arrow-right transition direction-500" :class="{ 'rotate-90': currentVisible }"></i>
			</a>
			<div
				v-show="currentVisible"
				@mouseenter="show"
				class="absolute z-10 w-full"
				:class="{
					'left-1/2 -translate-x-2/4': position == 'bottom' || position == 'top',
					'top-1/2 -translate-y-2/4': position == 'left' || position == 'right',
					'top-full pt-2': position == 'bottom',
					'bottom-full pb-2': position == 'top',
					'right-full pr-2': position == 'left',
					'right-full pl-2': position == 'left'
				}"
			>
				<slot name="options">
					<!-- 多列 -->
					<div v-if="Array.isArray(options[0])" class="flex flex-col rounded-md bg-white shadow-lg bg-gray-100">
						<h6 class="px-4 pt-2 text-lg text-gray-900 font-medium">{{ text }}</h6>
						<div v-if="options[0].length > 0" class="flex max-h-96 overflow-y-auto" :class="{ 'divide-y': multiple }" @mousewheel.stop="">
							<div v-for="(optionList, key1) in options" :key="key1" class="w-1/2 py-1.5">
								<div
									v-for="(option, key2) in optionList"
									:key="key2"
									class="px-6 py-2 text-sm min-w-max transition"
									:class="isActived(option) ? 'text-white bg-blue-500 hover:bg-opacity-50' : 'text-gray-500 hover:text-white hover:bg-blue-500'"
									@click.stop="onChange(option, key2)"
								>
									{{ option.label }}
								</div>
							</div>
						</div>
						<!-- 多列无数据 -->
						<div v-else class="py-1.5 text-sm text-gray-400 text-center">{{ optionsPlaceholder }}</div>
					</div>
					<!-- 单列 -->
					<div
						v-else-if="options.length > 0"
						class="py-1.5 max-h-96 overflow-y-auto rounded-md bg-white shadow-lg bg-gray-100"
						:class="{ 'divide-y': multiple }"
						@mousewheel.stop=""
					>
						<div
							v-for="(option, key) in options"
							:key="key"
							class="px-6 py-2 text-sm min-w-max transition"
							:class="isActived(option) ? 'text-white bg-blue-500 hover:bg-opacity-50' : 'text-gray-500 hover:text-white hover:bg-blue-500'"
							@click.stop="onChange(option, key)"
						>
							{{ option.label }}
						</div>
					</div>
					<!-- 单列无数据 -->
					<div v-else class="py-1.5 text-sm text-gray-400 text-center">{{ optionsPlaceholder }}</div>
				</slot>
			</div>
		</div>
		<div
			v-if="!visible"
			v-show="currentVisible"
			class="absolute z-20 text-gray-100"
			:class="{
				'left-1/2 -translate-x-2/4': position == 'bottom' || position == 'top',
				'top-1/2 -translate-y-2/4': position == 'left' || position == 'right',
				'top-full -mt-1.5': position == 'bottom',
				'bottom-full -mb-1.5': position == 'top',
				'right-full mr-1': position == 'left',
				'left-full ml-1': position == 'right'
			}"
		>
			<i
				class="fe"
				:class="{
					'fe-drop-up': position == 'bottom',
					'fe-drop-down': position == 'top',
					'fe-drop-right': position == 'left',
					'fe-drop-left': position == 'right'
				}"
			></i>
		</div>
		<div v-if="getDirection == 'row'" v-show="invalidField != null" class="absolute -bottom-4 h-4 text-red-500 text-xs">
			{{ invalidMessage }}
		</div>
	</div>
</template>

<script>
import NFormValidator from './NFormValidator'
import visible from '../mixins/visible'
import tailwindui from './tailwindui'

export default {
	name: 'NSelect',
	mixins: [NFormValidator, visible],
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
		multiple: Boolean,
		//是否可清除
		clearable: { type: Boolean, default: true }
	},
	computed: {
		invalidColor() {
			if (this.disabled) return 'gray'
			if (this.invalidField) return 'red'
			return this.color
		},
		selectClass() {
			return [
				this.rounded ? tailwindui.roundedSize(this.size) : '',
				this.border ? 'border' : '',
				this.border ? tailwindui.borderColor(this.invalidColor, this.invalidColor == 'gray') : '',
				this.ring && this.currentVisible ? 'ring-1 ring-opacity-50' : '',
				this.ring && this.currentVisible ? tailwindui.ringColor(this.invalidColor, this.disabled) : ''
			]
		}
	},
	watch: {
		options(newValue, oldValue) {
			if (newValue !== oldValue) this.updateValue(false, newValue)
		}
	},
	data() {
		return {
			hideTimer: null,
			propValueType: typeof this.value,
			currentVisible: this.visible ? 1 : 0,
			currentIndex: this.multiple ? null : -1,
			currentOption: this.multiple ? [] : {},
			currentValue: this.multiple ? [] : null
		}
	},
	methods: {
		updateValue(init, value) {
			if (this.multiple) {
				if (typeof value === 'string') value = value.split(',')
				else if (value == null) value = []
				this.currentOption = this.options.filter(init && !value.length ? this.isActived : (option) => value.includes(option.value))
				this.currentValue = this.currentOption.map((opt) => opt.value)
			} else {
				let index = this.options.findIndex(init && value == null ? this.isActived : (option) => option.value === value)
				let option = this.options[index] || {}
				this.currentIndex = index
				this.currentOption = option
				this.currentValue = option.value == null ? null : option.value
			}
			init || this.$nextTick(() => this.validate('change'))
		},
		onChange(option, index) {
			if (this.multiple) {
				if ((index = this.currentValue.indexOf(option.value)) === -1) this.addOption(option)
				else this.removeOption(option, index)
				this.hide()
				if (this.propValueType === 'string') this.$emit('change', this.currentValue.join(','))
				else this.$emit('change', this.currentValue)
			} else {
				this.currentIndex = index
				this.currentOption = option
				this.currentValue = option.value == null ? null : option.value
				this.hide()
				this.$emit('change', this.currentValue)
			}
			this.$nextTick(() => this.validate('change'))
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
