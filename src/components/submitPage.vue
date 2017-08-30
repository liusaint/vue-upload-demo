	<template>
		<!-- 第二个页面 发布页面-->
		<div class="page-wrap">111
			<div class="main-top">
				<button class="cancel" @click='cancel'>取消</button>
				<button class="submit" @click="submit">发布</button>
			</div>
			<textarea name="" id="" cols="30" rows="10" class="remark" placeholder='填写备注信息' v-model="remark"></textarea>
			<ul>
				<li v-for="(item, index) in choosedImgArr">
					<i @click="delPic(index)">X</i>
					<img :src="item.src" alt="" height="100" width="100">				
				</li>
				<li>
					<input type="file" multiple accept="image/*" @change='fileChange($event)'/>
				</li>
			</ul>
			<div class="choosed">{{book.name}} {{exp.name}}</div>
			<span class="choose" @click="goBookPage">选择记录本</span>
		</div>

	</template>
	<script>
		import { mapState } from 'vuex'
		export default {
			data(){
				return {
					remark:'',

				}
			},
			computed: mapState(['choosedImgArr','book','exp']),
			methods:{
				cancel(){
					this.$router.push('/');
				},
				submit(){

				},
			}

		}
	</script>}
