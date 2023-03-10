<template>
	<div class="n-input flex" :class="formColDirection ? 'flex-col' : 'relative'">
		<div class="flex flex-grow" :class="{ 'flex-col gap-2': formColDirection }">
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
			<div class="flex flex-grow" :class="{ 'cursor-not-allowed': formDisabled }">
				<div class="flex items-center flex-grow group" :class="inputClass">
					<textarea
						v-if="type === 'textarea'"
						ref="input"
						:class="nativeClass"
						@input="onInput"
						@focus="onFocus"
						@blur="onBlur"
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
						:type="currentType"
						:placeholder="placeholder"
						:readonly="readonly"
						:disabled="formDisabled"
						:autocomplete="formAutoComplete"
					/>
					<a
						v-if="clearable"
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
						@click.stop.prevent="
							;(eye === true || eye === 'click') && (currentType = currentType === 'text' ? 'password' : 'text')
						"
						@mousedown.stop.prevent="eye === 'press' && (currentType = 'text')"
						@mouseup.stop.prevent="eye === 'press' && (currentType = 'password')"
						class="hidden group-hover:block hover:text-opacity-50 text-gray-400 pr-2"
					>
						<NSvg :name="currentType === 'password' ? 'eye' : 'eye-off'"></NSvg>
					</a>
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

export default {
	name: 'NInput',
	mixins: [validator, clearable],
	model: {
		prop: 'value',
		event: 'input'
	},
	props: {
		//????????????
		value: String,
		//????????????
		color: { type: String, default: 'gray' },
		//??????
		size: { type: String, default: 'md' },
		//@overwrite???????????????
		type: { type: String, default: 'text' },
		//???????????????
		rounded: { type: [Boolean, String], default: true },
		//???????????????
		border: { type: Boolean, default: true },
		//??????????????????
		ring: { type: Boolean, default: true },
		//????????????
		readonly: Boolean,
		//type=password,click:????????????????????????,press:????????????????????????
		eye: { type: [Boolean, String], default: 'click' }
	},
	computed: {
		invalidColor() {
			return this.invalidRule ? 'red' : this.color
		},
		currentValue() {
			return this.value == null ? '' : this.value + ''
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
				tailwindui.textColor(this.color),
				tailwindui.textBoxSize(this.size)
			]
		},
		inputClass() {
			return [
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
			//????????????????????????change
			if (!input || (!init && input.value === value)) return
			//?????????????????????????????????
			input.value = value
			if (init || input.disabled) return
			this.$emit('input', value)
			if (this.name) this.$nextTick(() => this.validate('input'))
		},
		onInput() {
			let { input } = this.$refs
			if (!input || input.disabled || input.value === this.currentValue) return
			this.$emit('input', input.value)
			if (this.name) this.$nextTick(() => this.validate('input'))
		},
		onFocus() {
			let { input } = this.$refs
			if (!input || input.disabled) return
			this.focusing = true
			this.bluring = false
			this.$emit('focus')
			if (this.name && input.value !== this.currentValue) this.validate('focus')
		},
		onBlur() {
			let { input } = this.$refs
			if (!input || input.disabled) return
			this.focusing = false
			this.bluring = true
			this.$emit('blur')
			if (this.name && input.value !== this.currentValue) this.validate('blur')
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
/**????????????autocomplete??????????????????????????????????????? */
input:-webkit-autofill {
	box-shadow: 0 0 0 1000px #fff inset !important;
}
</style>
