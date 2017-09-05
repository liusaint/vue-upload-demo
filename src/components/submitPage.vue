	<template>
		<!-- 第二个页面 发布页面-->
		<div class="page-wrap">

			<div class="top-bar bgwhite">
				<button class="cancel" @click='cancel'>取消</button>
				<button class="submit fr blue " @click="submit">发布</button>
			</div>	

			<div class="con-wrap bgwhite">
				<textarea class="remark" placeholder='填写备注信息' v-model="remark"></textarea>
				<ul class="up-imgs clearfix">
					<li v-for="(item, index) in choosedImgArr" >
						<i @click="delPic(index)" class="eln-ico del-pic-ico"></i>
						<img :src="item.src" alt="" height="100" width="100" class="up-img" @click="showPreview(index)">				
					</li>
					<li class="upload-li">
						<input type="file" multiple accept="image/*" @change='fileChange($event)'/>
					</li>
				</ul>

			</div>			
			
			<router-link to="/bookPage" tag='div' class="choosed-txt choose-bar after-ico">
			<span class="text">{{chooseWord}}</span></router-link>

			<div class="hr"></div>

			<!-- <confirm :confirmOpt = "confirmOpt"></confirm> -->
			<preview :index="previewIndex"></preview>

		</div>

	</template>
	<script>
		import { mapState } from 'vuex'
		import confirm from './confirm.vue'
		import preview from './preview.vue'
		export default {

			data(){
				return {
					remark:'',
					confirmOpt:{
						show:true,
						txt:'确定上传图片',
						cancelTxt:'取消',
						cancelFn:this.cancelUpload.bind(this),
						confirmTxt:'确定',
						confirmFn:this.submit.bind(this)
					},	
					previewIndex:0,			
				}
			},
			components:{
				confirm,preview
			},
			computed: {
				chooseWord () {
					if(this.book.name && this.exp.caled_name){
						return this.book.name + ' ' +this.exp.caled_name;
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
				cancelUpload(){
					console.log('取消上传');
				},
				submit(){
					console.log('上传图片');
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
				},
				//显示预览。定位到点击的图片。
				showPreview(index){
					this.previewIndex = index;
					this.$store.commit('togglePreview',true);
				}

			},
			created(){

			}

		}
	</script>
	<style scoped>
		.submit{
			margin-top: 16px;
		}
	</style>

