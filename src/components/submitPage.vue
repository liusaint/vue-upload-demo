	<template>
		<!-- 第二个页面 发布页面-->
		<div class="page-wrap">
			<div class="main-top">
				<button class="cancel" @click='cancel'>取消</button>
				<button class="submit" @click="submit">发布</button>
			</div>
			<div class="con-wrap">
				<textarea class="remark" placeholder='填写备注信息' v-model="remark"></textarea>
				<ul class="up-imgs clearfix">
					<li v-for="(item, index) in choosedImgArr" >
						<i @click="delPic(index)" class="eln-ico del-pic-ico"></i>
						<img :src="item.src" alt="" height="100" width="100" class="up-img">				
					</li>
					<li class="upload-li">
						<input type="file" multiple accept="image/*" @change='fileChange($event)'/>
					</li>
				</ul>

			</div>			
			
			<router-link to="/bookPage" tag='div' class="choosed-txt choose-bar after-ico">
			<span class="text">{{chooseWord}}</span></router-link>

			<div class="hr"></div>

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
			computed: {
				chooseWord () {
					if(this.book.name && this.exp.name){
						return this.book.name + '-' +this.exp.name;
					}
					return '选择记录本';
				},
				...mapState(['choosedImgArr','book','exp']),
			},		

			methods:{
				cancel(){
					//回首页
					this.$router.replace('/');
					//清空所有数据。todo
				},
				submit(){

				},
				//删除一个图片
				delPic: function(index) {
					//直接这样删除不会有问题吗？
					this.choosedImgArr.splice(index, 1);
				},
							fileChange($event){
				//这里应该有个上传的过程。
				var input = event.currentTarget;

				var self = this;
				//读取文件
				if (input.files) {
					for (var i = 0, fileLen = input.files.length; i < fileLen; i++) {
						// var readed = 0;

						(function(i) {
							var file = input.files[i];
							var reader = new FileReader();
							reader.onload = function(e) {

								self.$store.commit('addImg',{
									src: e.target.result
								})
								// readed++;

								}

								reader.readAsDataURL(file);

							})(i)

						}

					}
				}

			}

		}
	</script>
	<style scoped>
		body{
			background:#e8ecf2;
		}
	</style>
