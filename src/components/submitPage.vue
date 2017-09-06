	<template>
		<!-- 第二个页面 发布页面-->
		<div class="page-wrap">

			<div class="top-bar bgwhite">
				<button class="cancel" @click='cancelConfirm'>取消</button>
				<button class="submit fr blue " @click="submitConfirm" v-show="exp.id && choosedImgArr.length && book.id">发布</button>
			</div>	

			<div class="con-wrap bgwhite">
				<textarea class="remark" placeholder='填写备注信息' v-model="localRemark" @input="changeRemark"></textarea>
				<ul class="up-imgs clearfix">
					<li v-for="(item, index) in choosedImgArr" >
						<i @click="delPic(index)" class="eln-ico del-pic-ico"></i>
						<img :src="'http://'+item.img_url" alt="" height="100" width="100" class="up-img" @click="showPreview(index)">				
					</li>
					<li class="upload-li">
						<el-upload
						capture="camera"
						accept="image/*"
						class="upload-input"
						multiple
						ref="upload_file"
						action="/upload/upload-file"
						:on-success="uploadOk"
						:on-error="uploadErr"

						:auto-upload="true"></el-upload>
					</li>
				</ul>

			</div>			
			
			<router-link to="/bookPage" tag='div' class="choosed-txt choose-bar after-ico">
			<span class="text">{{chooseWord}}</span></router-link>

			<div class="hr"></div>

			<confirm :confirmOpt = "confirmOpt"></confirm>
			<preview :index="previewIndex"></preview>

		</div>

	</template>
	<script>
		import { mapState } from 'vuex'
		import {ajax,localSave}  from '../js/common'
		import confirm from './confirm.vue'
		import preview from './preview.vue'
		export default {

			data(){
				return {
					confirmOpt:{
						show:false,
						txt:'确定上传图片',
						cancelTxt:'取消',
						cancelFn:this.cancelUpload.bind(this),
						confirmTxt:'确定',
						confirmFn:this.submit.bind(this)
					},	
					previewIndex:0,
					localRemark:''			
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
				...mapState(['choosedImgArr','book','exp','uid','remark']),
			},		

			methods:{
				cancelConfirm(){
					this.confirmOpt = {
						show:true,
						txt:'退出此次编辑',
						cancelTxt:'取消',
						cancelFn:this.cancelUpload.bind(this),
						confirmTxt:'退出',
						confirmFn:this.exitEdit.bind(this)
					}

				},
				//退出此次编辑
				exitEdit(){
					this.confirmOpt.show = false;
					//回首页
					this.$router.replace('/');
					//清空所有数据。todo
				},
				cancelUpload(){
					this.confirmOpt.show = false;
				},
				//确定要上传图片吗？
				submitConfirm(){
					this.confirmOpt = {
						show:true,
						txt:'确定上传图片',
						cancelTxt:'取消',
						cancelFn:this.cancelUpload.bind(this),
						confirmTxt:'确定',
						confirmFn:this.submit.bind(this)
					}
				},
				submit(){

					var exp_id = this.exp.id;
					var book_id = this.book.id;
					var self = this;
					var imgLen = this.choosedImgArr.length;
					var imgData = [];
					var imgItem;


					if(0 == imgLen){
						alert('请上传图片');
						this.confirmOpt.show = false;
						return;
					}
					if(!book_id){
						alert('请选择记录本')
						this.confirmOpt.show = false;
						return;
					}
					if(!exp_id){
						alert('请选择实验')
						this.confirmOpt.show = false;
						return;
					}
				

					
					for (var i = 0; i < this.choosedImgArr.length; i++) {
						imgItem = this.choosedImgArr[i];
						imgData.push({
							'dep_path':imgItem.dep_path,
							'save_name':imgItem.save_name,
							'file_name':imgItem.file_name,
							'remark':this.remark,
						})
					}

					ajax({
						url: '/eln/save-img',
						method: 'post',
						data:{
							uid:this.uid,
							exp_id:	exp_id,//是这一个参数吗？
							img_data:imgData,
							remark:this.remark				
						},
						callback: function (data) {

							if(1 == data.status){
								//成功
								self.confirmOpt.show = false;
								self.$router.replace('');
								//操作成功，在后面的页面弹出操作
								setTimeout(function(){
									alert(1);
								}, 10);

							}
						}
					})
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
				uploadOk(response,file){
					if(1==response.status){
						this.$store.commit('addImg',response.data)	
					}
				},

				//显示预览。定位到点击的图片。
				showPreview(index){
					this.previewIndex = index;
					this.$store.commit('togglePreview',true);
				},
				changeRemark(){
					this.$store.commit('changeRemark',this.localRemark);
				}

			},
			created(){
				this.localRemark = this.remark;
			}

		}
	</script>
	<style scoped>
		.submit{
			margin-top: 16px;
		}
		.el-upload__files{
			display: none;
		}
	</style>

