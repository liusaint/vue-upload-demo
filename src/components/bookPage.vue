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
				<li v-for="(item,index) in bookData" @click="chooseBook(item)" class="choose-bar after-ico">
					<span class="text">{{calBookName(item)}}</span>
				</li>
			</ul>


		</div>

	</template>
	<script>
		import {ajax,localSave}  from '../js/common'
		import { mapState } from 'vuex'
		export default {
			data(){
				return {
					bookData:[],
				}
			},
			computed: {
				...mapState(['book','exp','uid']),
			},		

			methods:{
				chooseBook(item){
					this.$store.commit('chooseBook',item);	
					this.$store.commit('clearExp');					
					this.$router.push('/expPage/'+item.id);
				},
				goBack(){
					this.$router.go(-1);
				},
				getList(){

					var self = this;

					ajax({
						url: '/eln/book-list',
						method: 'post',
						data:{
							uid:this.uid,					
						},
						callback: function (data) {

							if(1 == data.status){
								var parsedData = JSON.parse(data.data);
								self.bookData = parsedData.booklist;								
							}
						}
					})
				},
				//计算记录本名
				calBookName(book){
					var res = 'N' + (new Date(book.create_time)).getFullYear().toString().slice(2) + book.code +'（'+book.name+'）';
					//把计算后的结果保存一下。
					book.caled_name = res;
					return res;
				},

			},
			created(){
				//初始化，拿数据
 				this.getList();
			}


		}
	</script>}
