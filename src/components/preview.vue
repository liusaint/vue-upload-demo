<template>
  <div class="slider">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="item in choosedImgArr" class="swiper-slide">
          <div class="swiper-mask"></div>
          <img :src="item.src" alt="">
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default{

    data () {
      return {
      }
    },
    created () {
    	console.log(111)
    	this.$nextTick(function(){
    		new window.Swiper('.swiper-container', {
    			pagination: '.swiper-pagination',
    			paginationClickable: true,
    			spaceBetween: 0,
    			centeredSlides: true,
    			autoplay: 4000,
    			autoplayDisableOnInteraction: false,
    			observer: true,
    			lazyLoading: true,
    			resistanceRatio: 0
    		})
    	})

    },
    methods: {


    },
    computed: {
    	...mapState(['choosedImgArr']),
    },
  }
</script>
<style>
	@import '../../node_modules/.4.0.0-beta.2@swiper/dist/css/swiper.css';

</style>