<template>
	<div class="n-input flex" :class="formColDirection ? 'flex-col' : 'relative'">
		<div class="flex flex-grow" :class="{ 'flex-col gap-2': formColDirection }">
			<div
				v-if="label || $slots.label || formColDirection"
				class="flex items-center"
				:class="[formColDirection ? 'justify-between' : '', formLabelClass]"
			>
				<div v-if="label || $slots.label" class="text-base">
					<slot name="label">
						<span class="text-gray-500">{{ label }}</span>
					</slot>
					<span v-if="formRequired" class="text-red-500">*</span>
				</div>
				<div v-if="formColDirection" v-show="invalidRule != null" class="text-red-500 text-xs">
					{{ invalidMessage }}
				</div>
			</div>
			<div class="flex flex-grow" :class="{ 'cursor-not-allowed': formDisabled }">
				<div class="flex flex-grow" :class="inputClass">
					<div v-if="showTags" class="flex flex-wrap items-center gap-2" :class="{ 'pb-2': readonly }">
						<div
							v-for="(tag, index) in tags"
							:key="index"
							class="flex items-center gap-2 text-white text-sm bg-blue-500 rounded-md px-2 py-0.5"
							:class="{ 'bg-opacity-50': formDisabled }"
						>
							<span>{{ tag }}</span>
							<a v-if="!readonly" href="#remove" @click.stop="removeTag(tag, index)" class="hover:text-red-500">
								<NSvg name="x"></NSvg>
							</a>
						</div>
					</div>
					<div v-if="!tag || !readonly" class="flex items-center flex-grow group">
						<textarea
							v-if="type === 'textarea'"
							ref="input"
							:class="nativeClass"
							@input="onInput"
							@focus="onFocus"
							@blur="onBlur"
							@keyup.enter="onEnter"
							:placeholder="placeholder"
							:readonly="readonly"
							:disabled="formDisabled"
							:autocomplete="formAutoComplete"
						/>
						<input
							v-else
							ref="input"
							:class="nativeClass"
							@input="onInput"
							@focus="onFocus"
							@blur="onBlur"
							@keyup.enter="onEnter"
							:type="currentType"
							:placeholder="placeholder"
							:readonly="readonly"
							:disabled="formDisabled"
							:autocomplete="formAutoComplete"
						/>
						<a
							v-if="clearable && !readonly"
							href="#clear"
							@click.stop.prevent="clear"
							class="hidden hover:text-opacity-50 text-gray-400 pr-2"
							:class="{ 'group-hover:block': valueNotEmpty }"
						>
							<NSvg name="x"></NSvg>
						</a>
						<a
							v-if="showEyeIcon"
							href="#eye"
							@click.stop.prevent=";(eye === true || eye === 'click') && (currentType = currentType === 'text' ? 'password' : 'text')"
							@mousedown.stop.prevent="eye === 'press' && (currentType = 'text')"
							@mouseup.stop.prevent="eye === 'press' && (currentType = 'password')"
							class="hidden group-hover:block hover:text-opacity-50 text-gray-400 pr-2"
						>
							<NSvg :name="currentType === 'password' ? 'eye' : 'eye-off'"></NSvg>
						</a>
					</div>
				</div>
				<div v-if="$slots.default" class="flex" :class="defaultClass">
					<slot></slot>
				</div>
			</div>
		</div>
		<div v-if="formRowDirection" v-show="invalidRule != null" class="absolute -bottom-4 h-4 text-red-500 text-xs">
			{{ invalidMessage }}
		</div>
	</div>
</template>

<script>
import tailwindui from '../utils/tailwindui'
import validator from '../mixins/validator'
import clearable from '../mixins/clearable'
import field from '../mixins/field'

export default {
	name: 'NInput',
	mixins: [field('NInputGroup'), validator, clearable],
	model: {
		prop: 'value',
		event: 'input'
	},
	props: {
		//文本框值
		value: [String, Number],
		//文本颜色
		color: { type: String, default: 'gray' },
		//大小
		size: { type: String, default: 'md' },
		//@overwrite输入框类型
		type: { type: String, default: 'text' },
		//是否有圆角
		rounded: { type: [Boolean, String], default: true },
		//是否有边框
		border: { type: Boolean, default: true },
		//是否有轮廓环
		ring: { type: Boolean, default: true },
		//只读状态
		readonly: Boolean,
		//type=password,click:点击查看密码原文,press:按住查看密码原文
		eye: { type: [Boolean, String], default: 'click' },
		//是否有标签
		tag: Boolean,
		//标签分割符表达式，默认：/(?:,|，| )+/
		tagExp: { type: RegExp, default: () => /(?:,|，| )+/ },
		//标签最终分割符，默认：,
		tagSep: { type: String, default: ',' },
		//标签限制数量
		tagMaxLength: { type: Number, default: Infinity }
	},
	computed: {
		invalidColor() {
			return this.invalidRule ? 'red' : this.color
		},
		currentValue() {
			return this.value == null ? '' : this.value + ''
		},
		showTags() {
			return this.tag && this.tags.length > 0
		},
		showEyeIcon() {
			return !!this.eye && this.type === 'password'
		},
		defaultClass() {
			return [
				this.bodyClass,
				this.ring && this.focusing ? 'ring-1 ring-opacity-50' : '',
				this.ring && this.focusing ? tailwindui.ringColor(this.invalidColor) : '',
				this.border ? 'border' : '',
				this.border ? tailwindui.borderColor(this.invalidColor, this.invalidRule == null) : '',
				this.rounded ? tailwindui.roundedTBRSize(this.rounded, this.size) : '',
				this.formDisabled ? 'bg-opacity-50' : ''
			]
		},
		nativeClass() {
			return [
				'flex-grow appearance-none focus:outline-none bg-transparent',
				this.showTags ? '!pl-0 !pr-0' : '',
				tailwindui.textColor(this.color),
				tailwindui.textBoxSize(this.size)
			]
		},
		inputClass() {
			return [
				this.showTags ? 'flex-col !pb-0' : '',
				this.showTags ? tailwindui.textBoxSize(this.size) : '',
				this.ring && this.focusing ? 'ring-1 ring-opacity-50' : '',
				this.ring && this.focusing ? tailwindui.ringColor(this.invalidColor) : '',
				this.border ? (this.$slots.default ? 'border-t border-b border-l' : 'border') : '',
				this.border ? tailwindui.borderColor(this.invalidColor, this.invalidRule == null) : '',
				this.rounded
					? this.$slots.default
						? tailwindui.roundedTBLSize(this.rounded, this.size)
						: tailwindui.roundedSize(this.rounded, this.size)
					: '',
				this.formDisabled ? 'bg-gray-200 bg-opacity-50' : 'bg-white',
				this.formDisabled ? 'pointer-events-none' : this.readonly ? 'cursor-default' : ''
			]
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
			tags: [],
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
			if (this.tag) {
				//标签文本框
				if (input) {
					if (input.disabled) return
					input.value = ''
				}
				this.tags = []
				this.updateTag(true, value)
			} else {
				//正常文本框
				if (!input || (!init && input.value === value)) return
				input.value = value
				if (init || input.disabled) return
				this.$emit('input', value)
				let group = this.$options.name + 'Group'
				if (this[group]) this[group].updateValue(init, value)
				if (this.name) this.$nextTick(() => this.validate('input'))
			}
		},
		getTags(value) {
			return [...new Set(this.tags.concat(value.split(this.tagExp)))].filter((tag) => tag.trim() !== '')
		},
		updateTag(init, value) {
			let newTags = [...new Set(this.tags.concat(value.split(this.tagExp)))].filter((tag) => tag.trim() !== '')
			if (newTags.length > this.tagMaxLength) return
			this.tags = newTags
			if (init) return
			this.$emit('input', newTags.join(this.tagSep))
			if (this.name) this.$nextTick(() => this.validate('input'))
		},
		removeTag(tag, index) {
			this.tags.splice(index == null ? this.tags.findIndex((v) => v === tag) : index, 1)
			this.$emit('input', this.tags.join(this.tagSep))
			if (this.name) this.$nextTick(() => this.validate('input'))
		},
		onEnter() {
			let { input } = this.$refs
			if (!input || input.disabled || input.value === '') return
			let value = input.value
			if (this.tag) (input.value = ''), this.updateTag(false, value)
			this.$emit('enter', value)
		},
		onInput() {
			let { input } = this.$refs
			if (!input || input.disabled || input.value === this.currentValue) return
			if (!this.tag) this.$emit('input', input.value)
			let group = this.$options.name + 'Group'
			if (this[group]) this[group].onInput(input.value)
			if (this.name) this.$nextTick(() => this.validate('input'))
		},
		onFocus() {
			let { input } = this.$refs
			if (!input || input.disabled) return
			this.focusing = true
			this.bluring = false
			this.$emit('focus')
			let group = this.$options.name + 'Group'
			if (this[group]) this[group].onFocus()
			if (this.name && (this.tag || input.value !== this.currentValue)) this.validate('focus')
		},
		onBlur() {
			let { input } = this.$refs
			if (!input || input.disabled) return
			this.focusing = false
			this.bluring = true
			this.$emit('blur')
			let group = this.$options.name + 'Group'
			if (this[group]) this[group].onBlur()
			if (this.name && (this.tag || input.value !== this.currentValue)) this.validate('blur')
		},
		focus() {
			let { input } = this.$refs
			if (input && !input.disabled) input.focus()
		},
		blur() {
			let { input } = this.$refs
			if (input && !input.disabled) input.blur()
		}
	}
}
</script>

<style>
/**解决开启autocomplete后，文本框有内容后的背景色 */
input:-webkit-autofill {
	box-shadow: 0 0 0 1000px #fff inset !important;
}
</style>
