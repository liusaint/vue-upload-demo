<template>
	<div class="slider" v-show="showPreview">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div v-for="(item, index) in choosedImgArr" class="swiper-slide" height="1000">
					<!-- <div class="swiper-mask"></div> -->
					<div class="top-bar preview-bar">
						<i class="after-ico left-arrow-txt" @click="back">返回</i> 
						<div class="txt">{{index+1}}/{{imgLen}}</div>
						<i class="eln-ico right-del" @click="confirmDelPic(index)"></i> 
					</div>
					<div class="slider-img-wrap">
						<!-- 这一段可能以后还会用得着，可以看一看。 -->
						<div class="bg-img relative" :style="{ backgroundImage: 'url(http://' + item.img_url + ')' }" >
							<div class="swiper-mask"></div>
							<img class="slider-img" :src="'http://'+item.img_url" alt="" ></div>
						</div>
					</div>
				</div>

			</div>
			<confirm :confirmOpt = "confirmOpt"></confirm>
		</div>
	</template>

	<script>
		import { mapState } from 'vuex'
		import confirm from './confirm.vue'
		export default{
			props:['index'],
			data () {
				return {
					swiper:'',
					confirmOpt:{},
				}
			},
			created () {

			},
			components:{
				confirm
			},
			methods: {
			//初始化initswiper
			initSwiper(){
				var self = this;
				var initialSlide = self.index;

				//先跳到目标去。然后再重新初始化。不然可能会有错。
				if(self.swiper){
					self.swiper.slideTo(initialSlide,0,false);					
				}
				self.$nextTick(function(){

			
					console.log(self.index,'init');
					self.swiper&&self.swiper.destroy();
					window.swiper = self.swiper = new window.Swiper('.swiper-container', {	

						spaceBetween: 0,
						centeredSlides: true,		
						autoplayDisableOnInteraction: false,
						observer: true,
						lazyLoading: true,
						resistanceRatio: 0,
						autoplay:40000,
						initialSlide:initialSlide,
					})

					
				})

			},
			back(){				
				this.$store.commit('togglePreview',false);
			},
			confirmDelPic(index){
				this.confirmOpt = {
					show:true,
					txt:'确认删除图片吗？',
					showOhters:false,
					cancelTxt:'取消',
					cancelFn:this.cancelFn.bind(this),
					confirmTxt:'确定',
					confirmFn:this.delPic.bind(this,index)
				}
			},
				//隐藏确认弹窗
				cancelFn(){
					this.confirmOpt.show = false;
				},

				//删除一个图片
				delPic:function(index) {
					//直接这样删除不会有问题吗？
					this.choosedImgArr.splice(index, 1);
					if(index !=0){
						index = index - 1;
					}else{
						index = 0;
					}

					this.index = index;
					//图片删除完之后，隐藏之
					if(this.imgLen == 0){
						this.$store.commit('togglePreview',false);
					}else{
						this.initSwiper();
					}
					this.confirmOpt.show = false;
				},
			},
			computed: {
				...mapState(['choosedImgArr','showPreview']),
				imgLen(){
					return this.choosedImgArr.length;
				}
			},
			watch:{
				showPreview(){

					if(this.showPreview === false){
						return;
					}

					this.initSwiper();



				},

			}
		}
	</script>
	<style>
		@import '../../node_modules/swiper/dist/css/swiper.min.css';
		.slider{
			position: absolute;
			left: 0;
			top: 0;	
			height: 100%;
			width: 100%;
		}
		.swiper-container{
			background: #000;
			width: 100%;
			height: 100%;
		}
		.preview-bar{
			color: #fff;
			background: #000;
			border: none;
		}
		.slider-img-wrap{
			height: calc(100% - 44px);
			width: 100%;
			overflow-y:auto;
			-webkit-overflow-scrolling: touch;

		}
		.slider-img{
			width: 100%;
			-webkit-overflow-scrolling: touch;
			visibility: hidden;
			 /*把里面的图片隐藏起来。它只是为了撑开外面*/
		}
		/*占位，让我们的滑动不会直接滑动到图片上*/
		.swiper-mask{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			opacity: 1;
		}
		.bg-img{
			width: 100%;
			background-size: 100%;
		}
	</style>