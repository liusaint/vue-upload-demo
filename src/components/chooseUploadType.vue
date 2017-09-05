<template>
	<div class="upload-page-wrap">
		<div class="flex-box choose-upload-type">
			<!-- <input type="file" accept="image/*;capture=camera" @change='fileChange($event)' > -->

			<!-- <input type="file" multiple accept="image/*" @change='fileChange($event)'/> -->

			<div class="placeholder"></div>
			<div class="pic-wrap">
				<img src="../images/photo.png" alt="">
				<p>拍照上传</p>

				<el-upload
				capture="camera"
				accept="image/*"
				class="upload-input"
				ref="upload_camera"
				:on-success="uploadOk"
				:on-error="uploadErr"

				action="http://dev.wechat.integle.com/upload/upload-file"
				:auto-upload="true"></el-upload>


				<!-- <input type="file" accept="image/*" capture="camera"  @change='fileChange($event)' > -->
			</div>
			<div class="placeholder"></div>
			<div class="pic-wrap">
				<img src="../images/picture.png" alt="">
				<p>相册选择</p>
				<!-- <input type="file" multiple accept="image/*" @change='fileChange($event)'/> -->
				<el-upload
				capture="camera"
				accept="image/*"
				class="upload-input"
				multiple
				ref="upload_file"
				action="http://dev.wechat.integle.com/upload/upload-file"
				:on-success="uploadOk"
				:on-error="uploadErr"

				:auto-upload="true"></el-upload>

			</div>
			<div class="placeholder"></div>
		</div>
		<!-- <modal-tip :modalOpt="modalOpt"></modal-tip> -->




	</div>

</template>
<script>
	import modalTip from './modalTip.vue'
	export default {
		data(){
			return {
				modalOpt:{
					show:true,
					type:'success',
					txt:'上传成功',
				}
			}
		},
		components:{modalTip},
		methods:{
			uploadOk(response,file){
				console.log(arguments,1);
				console.log(arguments[1].name,arguments[1].url)
				alert(JSON.stringify(response))
				this.$router.push('/submitPage');
			},
			uploadErr(err,file){
				alert(JSON.stringify(err))
				console.log(arguments,2);
				this.$router.push('/submitPage');
			},

			fileChange($event){
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

								self.$store.commit('addImg',{
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
			created(){
				var self = this;
				this.$nextTick(function(){
					//补全插件的不足。上传文件控件初始化成功之后添加这个属性，直接调相机。
					var $el = self.$refs.upload_camera.$el;
					$el.getElementsByTagName('input')[0].setAttribute('capture','camera');
				})
				
			}
		}
	</script>