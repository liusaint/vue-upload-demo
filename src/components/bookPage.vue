	<template>

		<!-- 第三个页面 选择记录本-->
		<div class="" >
			<!-- 选择记录本 -->
			<div class="top-bar bgwhite">
				<i class="eln-ico left-arrow"  @click="goBack"></i>				
				<div class="txt">选择记录本</div>
				<i class="eln-ico right-search"></i>
				<router-link to="/searchPage" class="eln-ico right-search" tag="i"></router-link>
			</div>	
			<ul class="bgwhite mt6">

			</ul>

			<ul class="bgwhite mt6"
			v-infinite-scroll="getList"
			infinite-scroll-disabled="loading"
			infinite-scroll-distance="10">
			<li v-for="(item,index) in bookData" @click="chooseBook(item)" class="choose-bar after-ico">
				<span class="text">{{item.name}}</span>
			</li>
		</ul>


		</div>

	</template>
	<script>
		import ajax from '../js/ajax'
		import { mapState } from 'vuex'
		export default {
			data(){
				return {
					remark:'',
					bookData:[],
					loading:false,
					page:1,
					limit:10,
				}
			},
			computed: {
				 ...mapState(['book','exp','uid']),
			},		

			methods:{
				chooseBook(item){
					this.$store.commit('chooseBook',item);					
					this.$router.push('/expPage/'+item.id);
				},
				goBack(){
					this.$router.go(-1);
				},
				getList(){

					var self = this;
					this.leading = true;
					ajax({
						url: 'http://dev.wechat.integle.com/eln/book-list',
						method: 'GET',
						data:{
							page:this.page,		
							uid:this.uid,					
						},
						callback: function (data) {

							self.loading = false;
							if(1 == data.status){
								if(1 == self.page){
									self.bookData = data.data.booklist;
								}else{
									// self.$set('bookData', self.bookData.concat(data))
									self.bookData = self.bookData.concat(data.data.booklist)
								}
								self.page++;								
							}

						}
					})
				},
			},
			created(){
				//初始化，拿数据
				this.loading= false;
				this.page = 1;
			}


		}
	</script>}
