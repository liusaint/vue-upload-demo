		var vm = new Vue({
			el: '#app',
			data: {
				showPage: 'index', //显示哪一个页面
				book: {},
				exp: {},				
				remark: '',
				choosedImgArr: [], //选择的图片的数据			
				bookData: [],//记录本数据
				expData: [],//实验数据
				searchKey:'',//搜索
				p:1//页码
			},
			methods: {
				fileChange: function(event) {
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

									// self.choosedImgArr.push({
									// 	src: e.target.result
									// });
									self.$store.commit('addImg',{
										src: e.target.result
									})
									readed++;
									if (readed == fileLen) {
										//self.goPage('main'); //切换到发布页
									}

								}

								reader.readAsDataURL(file);

							})(i)

						}

					}


				},
				//删除一个图片
				delPic: function(index) {
					this.choosedImgArr.splice(index, 1);
				},
				goBookPage: function() {
					this.goPage('bookPage'); //跳转到选择记录本页面


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
				},
				searchBook:function(){
					this.p = 1;
					this.bookData = [{
						name: 1 + 'book',
						id: 1
					}, {
						name: 2 + 'book',
						id: 2
					}];
				},
				chooseBook: function(item) {
					this.goPage('expPage'); //跳转到选择实验页面
					
					this.book = item;
					this.exp = {};

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
				},
				searchExp:function(){
					this.p = 1;
					this.expData = [{
						name: 1 + 'exp',
						id: 1
					}, {
						name: 2 + 'exp',
						id: 2
					}];
				},
				chooseExp: function(item) {
					this.goPage('main'); //跳转到选择实验页面
					//选择好了实验。
					this.exp = item;
				},

				submit: function() {
					//验证
					if (!this.remark) {
						return;
					}
					if (!this.book.id) {
						return;
					}
					if (!this.exp.id) {
						return;
					}
					// 验证通过

				},
				//进入页面时要清空的数据。
				goPage:function(pageName){
					this.showPage = pageName;
					this.p = 1;
					this.searchKey = '';
					this.bookData = [];
					this.expData = [];
				},
				cancel:function(){

				},


			}
		});