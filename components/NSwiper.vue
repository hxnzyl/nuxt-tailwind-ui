<template>
	<Swiper class="n-swiper rounded-md !ml-0 !mr-0" :options="options">
		<SwiperSlide v-for="(image, key) in images" :key="key">
			<NImg class="w-full" :to="image.to" :target="image.target" :src="image.url"></NImg>
		</SwiperSlide>
	</Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.min.css'

export default {
	name: 'NSwiper',
	components: { Swiper, SwiperSlide },
	props: { images: Array },
	data() {
		return {
			options: {
				spaceBetween: 0,
				loop: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false
				}
			}
		}
	}
}
</script>
