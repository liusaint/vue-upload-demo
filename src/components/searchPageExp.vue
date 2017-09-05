<template>
	
	<div>

		<div class="top-bar bgwhite">
			<i class="eln-ico left-arrow"  @click="goBack"></i>	
			<div class="input-wrap after-ico">
				<input type="text" placeholder="请输入记录本名称" v-model="search_word" @input="searchExp">
				<i class="del-input eln-ico" @click="clearInput" v-show="search_word"></i>
			</div>

		</div>	

		<div class="absolute-white search-wrap search-his" v-show="expHis.length>0 && !search_word">
			<div class="title">最近搜索
				<i class="eln-ico del-his" @click="delHis"></i>
			</div>

			<ul class="con clearfix">
				<li class="his-item" v-for="item in expHis" @click="searchHis(item)">{{item}}</li>
			</ul>
		</div>

		<!-- <no-data></no-data> -->



		<ul class="bgwhite mt6"
		v-show="search_word"
		v-infinite-scroll="getList"
		infinite-scroll-disabled="loading"
		infinite-scroll-distance="20">
		<li v-for="(item,index) in expData" @click="chooseExp(item)" class="choose-bar after-ico">
			{{calExpName(item)}}
		</li>
	</ul>



</div>

</template>
<script>
	import noData from './noData.vue';
	import {ajax,localSave}  from '../js/common'
	import { mapState } from 'vuex'
	export default {
		data(){
			return {
				search_word:'',
				expHis:[],//记录本查询历史
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
			clearInput(){
				this.search_word = '';
			},
			delHis(){
				//清除历史
				this.expHis = [];
			},
			//搜索记录本。
			searchExp(){
				// //初始化，拿数据
				// this.expData = [{
				// 	name: 1 + 'book',
				// 	id: 1
				// }, {
				// 	name: 2 + 'book',
				// 	id: 2
				// }, {
				// 	name: 3 + 'book',
				// 	id: 3
				// }, {
				// 	name: 4 + 'book',
				// 	id: 4
				// }, {
				// 	name: 5 + 'book',
				// 	id: 5
				// }, {
				// 	name: 6 + 'book',
				// 	id: 6
				// }];
				this.page = 1;
				this.loading = false;
				this.dataOver = false;
				this.getList();
			},
			searchHis(item){
				this.search_word = item;
				this.searchExp();
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
				//没有关键字的时候不搜索。
				if(!this.search_word){
					this.expData = [];
					return;
				}
				if(this.dataOver){
					return;
				}
				//搜索之前就清一下数据
				if(1 == self.page){
					self.expData = [];
				}
				this.leading = true;
				ajax({
					url: 'http://dev.wechat.integle.com/eln/exp-list',
					method: 'post',
					data:{
						page:this.page,		
						uid:this.uid,
						search_word:this.search_word,
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
			chooseExp(item){
				this.$store.commit('chooseExp',item);
				//跳转到提交页面。
				this.$router.replace('/submitPage');
			},
			goBack(){
				this.$router.go(-1);
			},
			getHisWord(){

			},
			saveHisWord(){

			}				
		},
		components:{noData},
		created(){
		// 进入页面的时候从local拿存储的最近历史
		this.expHis = ['甲23苯',
		'苏格工在',
		'甲苯甲苯甲苯',
		'甲苯甲苯甲苯',
		'甲苯甲苯甲苯',
		'甲苯甲苯甲苯',
		'甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯',
		'甲苯甲苯甲苯',];
						//初始化，拿数据
				this.loading= false;
				this.page = 1;
				this.dataOver = false;
				this.book_id = this.$route.params.id;
	}
}
</script>
<style scoped>
	.search-wrap{
		top:50px;
		height: calc(100% - 50px);
	}

</style>