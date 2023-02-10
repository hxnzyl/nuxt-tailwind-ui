<template>
	<div ref="root" class="n-select flex" :class="{ 'flex-col gap-2': getDirection == 'col', relative: getDirection == 'row' }">
		<div class="flex items-center" :class="{ 'justify-between': getDirection == 'col' }">
			<div v-if="label" class="text-base">
				<span v-if="getRequired" class="text-red-500">*</span>
				<span class="text-gray-500">{{ label }}</span>
			</div>
			<div v-if="getDirection == 'col'" v-show="invalidField != null" class="text-red-500 text-xs">
				{{ invalidMessage }}
			</div>
		</div>
		<div
			class="relative flex items-center py-2 px-3 cursor-default"
			@click.stop="show"
			@mouseleave="leave"
			:class="{
				border: border,
				'border-red-500': border && invalidField != null,
				'border-gray-200': border && invalidField == null,
				'ring-blue-500': currentVisible && ring == 'blue' && invalidField == null,
				'ring-gray-500': currentVisible && ring == 'gray' && invalidField == null,
				'ring-red-300': currentVisible && ring != 'none' && invalidField != null,
				'ring-1 ring-opacity-50': currentVisible && ring != 'none',
				'rounded-sm': rounded == 'sm',
				'rounded-md': rounded == 'md',
				'rounded-lg': rounded == 'lg'
			}"
		>
			<div class="flex flex-wrap grow gap-2">
				<template v-if="multiple">
					<div
						v-for="(opt, key) in currentOption"
						:key="key"
						class="flex items-center gap-1 text-sm text-white bg-blue-500 rounded-md px-2 py-0.5"
					>
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
				@mouseleave="leave"
				class="absolute left-1/2 -translate-x-2/4 z-10 origin-top-right rounded-md bg-gray-100 shadow-lg w-full"
				:class="{
					'top-full': position == 'bottom',
					'mt-1': !visible && position == 'bottom',
					'bottom-full': position == 'top',
					'mb-1': !visible && position == 'top'
				}"
			>
				<slot name="options">
					<!-- 多列 -->
					<div v-if="Array.isArray(options[0])" class="flex flex-col">
						<h6 class="px-4 pt-2 text-lg text-gray-900 font-medium">{{ text }}</h6>
						<div v-if="options[0].length > 0" class="flex max-h-96 overflow-y-auto" :class="{ 'divide-y': multiple }" @mousewheel.stop="">
							<div v-for="(optionList, key1) in options" :key="key1" class="w-1/2 py-1.5">
								<div
									v-for="(option, key2) in optionList"
									:key="key2"
									class="px-6 py-2 text-sm min-w-max transition"
									:class="
										isActived(option) ? 'text-white bg-blue-500 hover:bg-opacity-50' : 'text-gray-500 hover:text-white hover:bg-blue-500'
									"
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
					<div v-else-if="options.length > 0" class="py-1.5 max-h-96 overflow-y-auto" :class="{ 'divide-y': multiple }" @mousewheel.stop="">
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
			class="absolute z-20 left-1/2 -translate-x-2/4 text-gray-100"
			:class="{ 'top-full -mt-2.5': position == 'bottom', 'bottom-full -mb-2.5': position == 'top' }"
		>
			<i class="fe" :class="{ 'fe-drop-up': position == 'bottom', 'fe-drop-down': position == 'top' }"></i>
		</div>
		<div v-if="getDirection == 'row'" v-show="invalidField != null" class="absolute -bottom-4 h-4 text-red-500 text-xs">
			{{ invalidMessage }}
		</div>
	</div>
</template>

<script>
import NFormValidator from './NFormValidator'
import visible from '../mixins/visible'

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
		//轮廓环
		ring: { type: String, default: 'blue' },
		//圆角
		rounded: { type: String, default: 'md' },
		//边框
		border: { type: Boolean, default: true },
		//是否多选
		multiple: Boolean,
		//是否可清除
		clearable: { type: Boolean, default: true }
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
				this.currentValue = option.value || null
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
				this.currentValue = option.value || null
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
