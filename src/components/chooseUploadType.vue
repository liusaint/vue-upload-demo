<template>

	<div class="flex-box choose-upload-type">
			<!-- <input type="file" accept="image/*;capture=camera" @change='fileChange($event)' > -->

			<!-- <input type="file" multiple accept="image/*" @change='fileChange($event)'/> -->

		<div class="placeholder"></div>
		<div class="pic-wrap">
			<img src="../images/photo.png" alt="">
			<p>拍照上传</p>

			<input type="file" accept="image/*" capture="camera"  @change='fileChange($event)' >
		</div>
		<div class="placeholder"></div>
		<div class="pic-wrap">
			<img src="../images/picture.png" alt="">
			<p>相册选择</p>
			<input type="file" multiple accept="image/*" @change='fileChange($event)'/>
		</div>
		<div class="placeholder"></div>
	</div>

</template>
<script>
	export default {
		methods:{
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
			}
		}
	</script>