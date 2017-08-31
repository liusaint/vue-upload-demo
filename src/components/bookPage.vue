	<template>

		<!-- 第三个页面 选择记录本-->
		<div class="" >
			<!-- 选择记录本 -->
			<!-- <button @click="goBack">返回</button> -->
			<div class="top-bar bgwhite">
				<i class="eln-ico left-arrow"  @click="goBack"></i>				
				<div class="txt">选择记录本</div>
				<i class="eln-ico right-search"></i>
			</div>	
			<ul class="bgwhite mt6">
				<li v-for="(item,index) in bookData" @click="chooseBook(item)" class="choose-bar after-ico">
					<span class="text">{{item.name}}</span>
				</li>
			</ul>
		</div>

	</template>
	<script>
		import { mapState } from 'vuex'
		export default {
			data(){
				return {
					remark:'',
					bookData:{},
				}
			},
			computed: {
				 ...mapState(['book','exp']),
			},		

			methods:{
				chooseBook(item){
					this.$store.commit('chooseBook',item);					
					this.$router.push('/expPage/'+item.id);
				},
				goBack(){
					this.$router.go(-1);
				}
			},
			created(){
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

		}
	</script>}
