<template>
	
<div>
	
	<div class="top-bar bgwhite">
		<i class="eln-ico left-arrow"  @click="goBack"></i>	
		<div class="input-wrap after-ico">
		<input type="text" placeholder="请输入记录本名称" v-model="searchKey" @input="searchBook">
		<i class="del-input eln-ico" @click="clearInput" v-show="searchKey"></i>
		</div>
		
	</div>	

	<div class="absolute-white search-wrap search-his" v-show="bookHis.length>0 && !searchKey">
		<div class="title">最近搜索
			<i class="eln-ico del-his" @click="delHis"></i>
		</div>
		<ul class="con clearfix">
			<li class="his-item" v-for="item in bookHis">{{item}}</li>
		</ul>
	</div>

<!-- <no-data></no-data> -->

<ul class="bgwhite mt6" v-show="searchKey">
	<li v-for="(item,index) in bookData" @click="chooseBook(item)" class="choose-bar after-ico">
		<span class="text">{{item.name}}</span>
	</li>
</ul>

</div>

</template>
<script>
import noData from './noData.vue';
export default {
	data(){
		return {
			searchKey:'',
			bookHis:[],//记录本查询历史
			bookData:{},
		}
	},
	methods:{
		clearInput(){
			this.searchKey = '';
		},
		delHis(){
			//清除历史
			this.bookHis = [];
		},
		//搜索记录本。
		searchBook(){
			//初始化，拿数据
			this.bookData = [{
				name: 1 + 'book',
				id: 1
			}, {
				name: 2 + 'book',
				id: 2
			}, {
				name: 3 + 'book',
				id: 3
			}, {
				name: 4 + 'book',
				id: 4
			}, {
				name: 5 + 'book',
				id: 5
			}, {
				name: 6 + 'book',
				id: 6
			}];
		}
	},
	components:{noData},
	created(){
		// 进入页面的时候从local拿存储的最近历史
		this.bookHis = ['甲23苯',
		'苏格工在',
		'甲苯甲苯甲苯',
		'甲苯甲苯甲苯',
		'甲苯甲苯甲苯',
		'甲苯甲苯甲苯',
		'甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯甲苯',
		'甲苯甲苯甲苯',];
	}
}
</script>
<style scoped>
.search-wrap{
	top:50px;
	height: calc(100% - 50px);
}

</style>