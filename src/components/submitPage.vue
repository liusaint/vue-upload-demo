	<template>
		<!-- 第二个页面 发布页面-->
		<div class="page-wrap">

			<div class="top-bar bgwhite">
				<button class="cancel" @click='cancelConfirm'>取消</button>
				<button class="submit fr blue " @click="submitConfirm" v-show="exp.id && choosedImgArr.length && book.id">确定</button>
				<!-- v-show="exp.id && choosedImgArr.length && book.id" -->
			</div>	

			<div class="con-wrap bgwhite">
				<textarea class="remark" placeholder='填写备注信息' v-model="localRemark" @input="changeRemark" maxlength="100"></textarea>
				<ul class="up-imgs clearfix">
					<li v-for="(item, index) in choosedImgArr" >
						<i @click="confirmDelPic(index)" class="eln-ico del-pic-ico"></i>
						<img :src="'http://'+item.img_url" alt="" height="100" width="100" class="up-img" @click="showPreview(index)">				
					</li>
					<li class="upload-li" @click="showChooseModal">
	
					</li>
				</ul>

			</div>			
			
			<router-link to="/bookPage" tag='div' class="choosed-txt choose-bar after-ico">
			<span class="text">{{chooseWord}}</span></router-link>

			<div class="hr"></div>

			<confirm :confirmOpt = "confirmOpt"></confirm>
			<preview :index="previewIndex"></preview>

			<div class="modal-wrap" v-show = "showChoose">
				<div class="modal-black"></div>
				<ul class="choose-ul">
					<li class="border">拍照上传<el-upload accept="image/*" class="upload-input" ref="upload_camera" :on-success="uploadOk" :on-error="uploadErr" :on-progress = 'uploadProgress' :before-upload = 'fileCheck' action="/upload/upload-file" :auto-upload="true"></el-upload></li>
					<li>从手机相册选择<el-upload capture="camera" accept="image/jpeg,image/jpg,image/png,image/bmp,image/gif,image/wmf,image/tif" class="upload-input" multiple ref="upload_file" action="/upload/upload-file" :on-success="uploadOk" :on-error="uploadErr" :on-progress = 'uploadProgress' :before-upload = 'fileCheck' :auto-upload="true"></el-upload></li>
					<li class="mt5" @click="cancelFn">取消</li>
				</ul>

			</div>

		</div>

	</template>
	<script>
		import {
			Toast
		} from 'mint-ui';
		import {
			mapState
		} from 'vuex'
		import {
			ajax,
			localSave
		} from '../js/common'
		import confirm from './confirm.vue'
		import preview from './preview.vue'
		export default {

			data() {
				return {
					confirmOpt: {
						show: false,
						txt: '确定上传',
						showOhters: true,
						cancelTxt: '取消',
						cancelFn: this.cancelFn.bind(this),
						confirmTxt: '确定',
						confirmFn: this.submit.bind(this)
					},
					previewIndex: 0,
					localRemark: '',
					showChoose: false,
				}
			},
			components: {
				confirm,
				preview
			},
			computed: {
				chooseWord() {
					if (this.book.name && this.exp.caled_name) {
						return this.book.name + ' ' + this.exp.caled_name;
					}
					return '选择记录本';
				},
				...mapState(['choosedImgArr', 'book', 'exp', 'uid', 'remark', 'uploadingCount']),
			},

			methods: {
				cancelConfirm() {
					this.confirmOpt = {
						show: true,
						txt: '退出此次编辑',
						showOhters: false,
						cancelTxt: '取消',
						cancelFn: this.cancelFn.bind(this),
						confirmTxt: '退出',
						confirmFn: this.exitEdit.bind(this)
					}

				},
				//退出此次编辑
				exitEdit() {
					this.confirmOpt.show = false;
					//回首页
					this.$router.replace('/');
					//清空所有数据。todo
				},
				//隐藏确认弹窗
				cancelFn() {
					this.confirmOpt.show = false;
					this.showChoose = false;
				},
				//上传之前的文件检查。最多上传9个文件。文件不能大于10mb。
				//解决方案是每个文件上传，就在上传中的数量加1。
				//需要判断已上传的数量与上传中的数量的和。
				fileCheck(file) {

					const MAX_SIZE = 1024 * 1024 * 10;
					if (file.size >= MAX_SIZE) {
						Toast('文件不能超过10MB');
						return false;
					}

					//上传中的数量。+ 已上传的数量　
					if (this.uploadingCount + this.choosedImgArr.length > 8) {
						Toast('最多上传9个文件');
						return false;
					}

					//上传中，数量+1.
					this.$store.commit('uploading', 1);

				},

				//确定要上传图片吗？
				submitConfirm() {
					this.confirmOpt = {
						show: true,
						txt: '确认上传？',
						showOhters: true,
						cancelTxt: '取消',
						cancelFn: this.cancelFn.bind(this),
						confirmTxt: '确定',
						confirmFn: this.submit.bind(this)
					}
				},
				submit() {

					var exp_id = this.exp.id;
					var book_id = this.book.id;
					var self = this;
					var imgLen = this.choosedImgArr.length;
					var imgData = [];
					var imgItem;


					if (0 == imgLen) {

						Toast('请上传图片');

						this.confirmOpt.show = false;
						return;
					}
					if (!book_id) {
						Toast('请选择记录本')
						this.confirmOpt.show = false;
						return;
					}
					if (!exp_id) {
						Toast('请选择实验')
						this.confirmOpt.show = false;
						return;
					}



					for (var i = 0; i < this.choosedImgArr.length; i++) {
						imgItem = this.choosedImgArr[i];
						imgData.push({
							'dep_path': imgItem.dep_path,
							'save_name': imgItem.save_name,
							'file_name': imgItem.file_name,
							'remark': this.remark,
						})
					}
					this.$store.commit('changeLoading', true);
					ajax({
						url: '/eln/save-img',
						method: 'post',
						data: {
							uid: this.uid,
							exp_id: exp_id, //是这一个参数吗？
							img_data: imgData,
							remark: this.remark
						},
						callback: function(data) {
							self.$store.commit('changeLoading', false);
							if (1 == data.status) {
								//成功
								self.confirmOpt.show = false;
								self.$router.replace('/');
								//操作成功，在后面的页面弹出操作
								setTimeout(function() {
									self.$store.commit('changeModalTip', true);
								}, 1);

							} else {
								data.message && Toast(data.message);
							}
						}
					})
				},
				confirmDelPic(index) {
					this.confirmOpt = {
						show: true,
						txt: '确认删除图片吗？',
						showOhters: false,
						cancelTxt: '取消',
						cancelFn: this.cancelFn.bind(this),
						confirmTxt: '确定',
						confirmFn: this.delPic.bind(this, index)
					}
				},
				//删除一个图片
				delPic: function(index) {
					//直接这样删除不会有问题吗？
					this.choosedImgArr.splice(index, 1);
					this.confirmOpt.show = false;
				},
				fileChange($event) {
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

									self.$store.commit('addImg', {
											src: e.target.result
										})
										// readed++;

								}

								reader.readAsDataURL(file);

							})(i)

						}

					}
				},
				uploadOk(response, file) {
					this.showChoose = false;
					this.$store.commit('changeLoading', false);
					//上传中，数量-1.
					this.$store.commit('uploading', -1);
					if (1 == response.status) {
						this.$store.commit('addImg', response.data);
					} else {
						response.message && alert(response.message);
					}
				},
				uploadErr(err, file) {
					this.showChoose = false;
					//上传中，数量-1.
					this.$store.commit('uploading', -1);
					this.$store.commit('changeLoading', false);
				},
				uploadProgress(event, file, fileList) {
					this.$store.commit('changeLoading', true);
				},
				//显示预览。定位到点击的图片。
				showPreview(index) {
					this.previewIndex = index;
					this.$store.commit('togglePreview', true);
				},
				changeRemark() {
					this.$store.commit('changeRemark', this.localRemark);
				},
				showChooseModal() {
					this.showChoose = true;
				}

			},
			created() {
				this.localRemark = this.remark;
				this.showChoose = false;
				var self = this;
				this.$nextTick(function() {
					//补全插件的不足。上传文件控件初始化成功之后添加这个属性，直接调相机。
					var $el = self.$refs.upload_camera.$el;
					$el.getElementsByTagName('input')[0].setAttribute('capture', 'camera');

				})
			}

		}
	</script>
	<style scoped>
	
		.submit{
			margin-top: 16px;
			line-height: 1em;
		}
		.el-upload__files{
			display: none;
		}

	</style>

