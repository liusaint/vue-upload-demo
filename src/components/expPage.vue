	<template>

		<!-- 第三个页面 选择记录本-->
		<div class="page-wrap" >
			选择实验
			<button @click="goBack">返回</button>
			<li v-for="(item,index) in expData" @click="chooseExp(item)">
				{{item.name}}
			</li>
		</div>

	</template>
	<script>
		import { mapState } from 'vuex'
		export default {
			data(){
				return {
					expData:[],
				}
			},
			computed: {
				 ...mapState(['exp']),
			},		

			methods:{
				chooseExp(item){
					this.$store.commit('chooseExp',item);
					//跳转到提交页面。
					this.$router.replace('/submitPage');
				},
				goBack(){
					this.$router.go(-1);
				}
			},
			created(){
				console.log(1)
				//初始化，拿数据
				this.expData = [{
					name: 1 + 'exp',
					id: 1
				}, {
					name: 2 + 'exp',
					id: 2
				}, {
					name: 3 + 'exp',
					id: 3
				}, {
					name: 4 + 'exp',
					id: 4
				}, {
					name: 5 + 'exp',
					id: 5
				}, {
					name: 6 + 'exp',
					id: 6
				}];

			}

		}
	</script>}
