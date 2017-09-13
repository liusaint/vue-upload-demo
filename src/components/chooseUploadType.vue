<template>
	<div class="upload-page-wrap">
		<div class="flex-box choose-upload-type">
			<!-- <input type="file" accept="image/*;capture=camera" @change='fileChange($event)' > -->

			<!-- <input type="file" multiple accept="image/*" @change='fileChange($event)'/> -->

			<div class="placeholder"></div>
			<div class="pic-wrap" >
				<img src="../images/photo.png" alt="">
				<p>拍照上传</p>

				<el-upload				
				accept="image/*"
				class="upload-input"
				ref="upload_camera"
				:on-success="uploadOk"
				:on-error="uploadErr"
				:on-progress = 'uploadProgress'
				:before-upload = 'fileCheck'
				action="/upload/upload-file"
				:auto-upload="true"></el-upload>


				<!-- <input type="file" accept="image/*" capture="camera"  @change='fileChange($event)' > -->
			</div>
			<div class="placeholder"></div>
			<div class="pic-wrap" >
				<img src="../images/picture.png" alt="">
				<p>相册选择</p>
				<!-- <input type="file" multiple accept="image/*" @change='fileChange($event)'/> -->
				<el-upload
				capture="camera"
				accept="image/jpeg,image/jpg,image/png,image/bmp,image/gif,image/wmf,image/tif"
				class="upload-input"
				multiple
				ref="upload_file"
				action="/upload/upload-file"
				:on-success="uploadOk"
				:on-error="uploadErr"
				:on-progress = 'uploadProgress'
				:before-upload = 'fileCheck'
				:auto-upload="true" >
				</el-upload>

			</div>
			<div class="placeholder"></div>
		</div>
		<modal-tip :modalOpt="modalOpt"></modal-tip>




	</div>

</template>
<script>
	import modalTip from './modalTip.vue'
	import { Toast } from 'mint-ui';
	import { mapState } from 'vuex';
	export default {
	data() {
			return {
				modalOpt: {
					show: true,
					type: 'success',
					txt: '上传成功',
				}
			}
		},
		components: {
			modalTip
		},
		computed: {
			...mapState(['uploadingCount'])
		},
		methods: {
			uploadOk(response, file) {
				this.$store.commit('changeLoading', false);
				//上传中，数量-1.
				this.$store.commit('uploading', -1);
				if (1 == response.status) {
					this.$store.commit('addImg', response.data);
					this.$router.replace('/submitPage');
				} else {
					response.message && alert(response.message);
				}
			},
			uploadErr(err, file) {
				this.$store.commit('changeLoading', false);
				//上传中，数量-1.
				this.$store.commit('uploading', -1);

			},
			uploadProgress(event, file, fileList) {
				this.$store.commit('changeLoading', true);
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

				//上传中的数量。这里不需要检查已上传的数量。			
				if (this.uploadingCount > 8) {
					Toast('最多只可上传9张图片');
					return false;
				}

				//上传中，数量+1.
				this.$store.commit('uploading', 1);

			},
			setUid() {
				var uid = location.search.match(/uid=(\d+)/)[1];
				this.$store.commit('setUid', parseInt(uid));
			},

			fileChange($event) {
				//这里应该有个上传的过程。
				var input = event.currentTarget;

				var self = this;
				//读取文件
				if (input.files) {
					for (var i = 0, fileLen = input.files.length; i < fileLen; i++) {
						var readed = 0;

						(function(i) {
							var file = input.files[i];
							var reader = new FileReader();
							reader.onload = function(e) {

								self.$store.commit('addImg', {
									src: e.target.result
								})
								readed++;
								if (readed == fileLen) {
									self.$router.push('/submitPage');
									// self.goPage('main'); //切换到发布页
								}

							}

							reader.readAsDataURL(file);

						})(i)

					}

				}
			}
		},
		created() {
			var self = this;
			this.$nextTick(function() {
				//补全插件的不足。上传文件控件初始化成功之后添加这个属性，直接调相机。
				var $el = self.$refs.upload_camera.$el;
				$el.getElementsByTagName('input')[0].setAttribute('capture', 'camera');

			})
			//重置数据
			this.$store.commit('resetStore');
			this.setUid();
		}
	}
	</script>