	<template>

		<!-- 第三个页面 选择记录本-->
		<div>

			<div class="top-bar bgwhite">
				<i class="eln-ico left-arrow"  @click="goBack"></i>				
				<div class="txt">选择实验记录</div>
				<i class="eln-ico right-search"></i>
			</div>	

			<ul class="bgwhite mt6"
			v-infinite-scroll="getList"
			infinite-scroll-disabled="loading"
			infinite-scroll-distance="20"
			>
				<li v-for="(item,index) in expData" @click="chooseExp(item)" class="choose-bar after-ico">
					{{calExpName(item)}}
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
					expData:[],
					loading:false,
					page:1,
					book_id:'',
					dataOver:false,//数据是否加载完
				}
			},
			computed: {
				 ...mapState(['book','exp','uid']),
			},		

			methods:{
				chooseExp(item){
					this.$store.commit('chooseExp',item);
					//跳转到提交页面。
					this.$router.replace('/submitPage');
				},
				goBack(){
					this.$router.go(-1);
				},
				//计算实验名
				calExpName(exp){
					var exp_page = exp.exp_page;
					var len = exp_page.length;
					if(1== len){
						exp_page = '00'+exp_page;
					}else if(2== len){
						exp_page = '0'+exp_page;
					}
					var res = 'N' + (new Date(exp.book_create_time)).getFullYear().toString().slice(2) + exp.code +'-'+exp_page;
					//把计算后的结果保存一下。
					exp.caled_name = res;
					return res;
				},
				getList(){

					var self = this;
					this.leading = true;
					if(this.dataOver){
						return;
					}
					ajax({
						url: 'http://dev.wechat.integle.com/eln/exp-list',
						method: 'post',
						data:{
							page:this.page,		
							uid:this.uid,
							book_id:this.book_id,
							limit:20					
						},
						callback: function (data) {

							self.loading = false;
							if(1 == data.status){
								var expList = data.data.expList;
								if(1 == self.page){
									self.expData = expList;
								}else{
									self.expData = self.expData.concat(expList)
								}
								if(expList.length == 0){
									self.dataOver = true;
								}else{
									self.page++;

									//如果没有出现滚动条。说明数据没加载满。那么需要继续加载。这段代码还要再测试
									if (!(document.body.style.overflow!="hidden"&&document.body.scroll!="no"&&document.body.scrollHeight>document.body.offsetHeight)){										self.getList();

									}	
								}
						
							}

						}
					})
				},
			},
			created(){

				//初始化，拿数据
				// this.expData = [{
				// 	name: 1 + 'exp',
				// 	id: 1
				// }, {
				// 	name: 2 + 'exp',
				// 	id: 2
				// }, {
				// 	name: 3 + 'exp',
				// 	id: 3
				// }, {
				// 	name: 4 + 'exp',
				// 	id: 4
				// }, {
				// 	name: 5 + 'exp',
				// 	id: 5
				// }, {
				// 	name: 6 + 'exp',
				// 	id: 6
				// }];
				//初始化，拿数据
				this.loading= false;
				this.page = 1;
				this.dataOver = false;
				this.book_id = this.$route.params.id;


			}

		}
	</script>}
