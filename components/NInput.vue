<template>
	<div
		class="n-input flex"
		:class="{
			'bg-opacity-50 pointer-events-none': getDisabled,
			'flex-col': getDirection == 'col',
			relative: getDirection == 'row'
		}"
	>
		<div class="flex grow gap-2" :class="{ 'flex-col': getDirection == 'col' }">
			<div
				v-if="label || getDirection == 'col'"
				class="flex items-center"
				:class="[getDirection == 'col' ? 'justify-between' : '', this.getLabelClass]"
			>
				<div v-if="label" class="text-base">
					<span class="text-gray-500">{{ label }}</span>
					<span v-if="getRequired" class="text-red-500">*</span>
				</div>
				<div v-if="getDirection == 'col'" v-show="invalidField != null" class="text-red-500 text-xs">
					{{ invalidMessage }}
				</div>
			</div>
			<div class="flex grow" :class="bodyClass">
				<div class="flex items-center grow bg-white group" :class="wrapperClass">
					<textarea
						v-if="type === 'textarea'"
						ref="input"
						:class="nativeClass"
						@input="onInput"
						@focus="onFocus"
						@blur="onBlur"
						:placeholder="placeholder"
						:readonly="readonly"
						:disabled="getDisabled"
						:autocomplete="getAutocomplete"
					/>
					<input
						v-else
						ref="input"
						:class="nativeClass"
						@input="onInput"
						@focus="onFocus"
						@blur="onBlur"
						:type="currentType"
						:placeholder="placeholder"
						:disabled="getDisabled"
						:readonly="readonly"
						:autocomplete="getAutocomplete"
					/>
					<template v-if="showEyeIcon">
						<a
							href="#eye"
							@click.stop.prevent="eye === 'click' && (currentType = currentType === 'text' ? 'password' : 'text')"
							@mousedown.stop.prevent="eye === 'press' && (currentType = 'text')"
							@mouseup.stop.prevent="eye === 'press' && (currentType = 'password')"
							class="hidden group-hover:block group-hover:text-opacity-50 text-gray-400 px-2"
						>
							<NSvg :name="currentType === 'password' ? 'eye' : 'eye-off'"></NSvg>
						</a>
					</template>
					<a
						v-if="clearable"
						href="#clear"
						@click.stop.prevent="clear"
						class="hidden hover:text-opacity-50 text-gray-400 px-2"
						:class="{ 'group-hover:block': valueNotEmpty }"
					>
						<NSvg name="x"></NSvg>
					</a>
				</div>
				<slot></slot>
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
import clearable from '../mixins/clearable'

export default {
	name: 'NInput',
	mixins: [validator, clearable],
	model: {
		prop: 'value',
		event: 'input'
	},
	props: {
		//文本框值
		value: String,
		//文本颜色
		color: { type: String, default: 'gray' },
		//大小
		size: { type: String, default: 'md' },
		//输入框类型
		type: { type: String, default: 'text' },
		//是否有圆角
		rounded: { type: Boolean, default: true },
		//是否有边框
		border: { type: Boolean, default: true },
		//是否有轮廓环
		ring: { type: Boolean, default: true },
		//禁用状态
		disabled: Boolean,
		//只读状态
		readonly: Boolean,
		//type=password,click:点击查看密码原文,press:按住查看密码原文
		eye: { type: String, default: 'click' }
	},
	computed: {
		currentValue() {
			return this.value == null ? '' : this.value + ''
		},
		invalidColor() {
			if (this.getDisabled) return 'gray'
			if (this.invalidField) return 'red'
			return this.color
		},
		nativeClass() {
			return [
				'grow appearance-none focus:outline-none bg-transparent',
				tailwindui.textColor(this.color),
				tailwindui.textBoxSize(this.size)
			]
		},
		wrapperClass() {
			return [
				this.ring && this.focusing ? 'ring-1 ring-opacity-50' : '',
				this.ring && this.focusing ? tailwindui.ringColor(this.invalidColor, this.getDisabled) : '',
				this.border ? (this.$slots.default ? 'border-t border-b border-l' : 'border') : '',
				this.border ? tailwindui.borderColor(this.invalidColor, this.invalidColor == 'gray') : '',
				this.rounded ? (this.$slots.default ? tailwindui.roundedTBLSize(this.size) : tailwindui.roundedSize(this.size)) : '',
				this.getDisabled ? 'bg-gray-200 bg-opacity-50' : '',
				this.readonly ? 'cursor-default' : ''
			]
		},
		showEyeIcon() {
			return !!this.eye && this.type === 'password'
		}
	},
	watch: {
		type(newValue, oldValue) {
			if (newValue !== oldValue) console.warn('nuxt-tailwind-ui: Cannot be modified dynamically input[type]')
		},
		currentValue(newValue, oldValue) {
			if (newValue !== oldValue) this.updateValue(false, newValue)
		}
	},
	data() {
		return {
			focusing: false,
			bluring: false,
			currentType: this.type
		}
	},
	mounted() {
		this.updateValue(true, this.currentValue)
	},
	methods: {
		updateValue(init, value) {
			let { input } = this.$refs
			if (!input || input.value === value) return
			input.value = value
			if (init) return
			this.$emit('input', value)
			if (this.name) this.$nextTick(() => this.validate('input'))
		},
		onInput(event) {
			let { value } = event.target
			if (value !== this.currentValue) this.$emit('input', value)
			if (this.name) this.$nextTick(() => this.validate('input'))
		},
		onFocus() {
			this.$emit('focus', this.currentValue)
			this.focusing = true
			this.bluring = false
			if (this.name) this.validate('focus')
		},
		onBlur() {
			this.$emit('blur', this.currentValue)
			this.focusing = false
			this.bluring = true
			if (this.name) this.validate('blur')
		}
	}
}
</script>
