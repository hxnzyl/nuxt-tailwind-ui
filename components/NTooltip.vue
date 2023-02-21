<template>
	<div ref="root" class="n-tooltip flex items-center relative" @mouseenter="show" @mouseleave="leave">
		<slot name="trigger"></slot>
		<div
			v-show="currentVisible"
			@mouseenter="show"
			@mouseleave="leave"
			class="absolute z-10"
			:class="{
				'left-1/2 -translate-x-2/4': position == 'bottom' || position == 'top',
				'top-1/2 -translate-y-2/4': position == 'left' || position == 'right',
				'top-full pt-2': position == 'bottom',
				'bottom-full pb-2': position == 'top',
				'right-full pr-2': position == 'left',
				'right-full pl-2': position == 'left'
			}"
		>
			<div class="rounded-md bg-white shadow-lg min-w-max">
				<slot name="content"></slot>
			</div>
		</div>
		<div
			v-show="currentVisible"
			class="absolute z-20 text-white"
			:class="{
				'left-1/2 -translate-x-2/4': position == 'bottom' || position == 'top',
				'top-1/2 -translate-y-2/4': position == 'left' || position == 'right',
				'top-full -mt-0.5': position == 'bottom',
				'bottom-full -mb-0.5': position == 'top',
				'right-full': position == 'left',
				'left-full': position == 'right'
			}"
		>
			<NSvg
				:name="{
					'drop-up': position == 'bottom',
					'drop-down': position == 'top',
					'drop-right': position == 'left',
					'drop-left': position == 'right'
				}"
			></NSvg>
		</div>
	</div>
</template>

<script>
import visitable from '../mixins/visitable'
export default { name: 'NTooltip', extends: visitable }
</script>
