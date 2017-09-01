<template>

	<div class="modal-wrap" v-show="confirmOpt.show">

		<div class="modal-black"></div> 
		<div class="modal-con modal-confirm">	
			<div class="txt">
				{{confirmOpt.txt}}
			</div>
			<div class="confirm-btn-wrap">
				<div class="confirm-btn border-r" @click="cancel">
					{{confirmOpt.cancelTxt}}
				</div>
				<div class="confirm-btn" @click="confirm">
					{{confirmOpt.confirmTxt}}
				</div>
			</div>
		</div>
	</div>
	
</template>
<script>
	export default {
		props:['confirmOpt'],
		data(){
			return {
					//默认的值,思考，vue组件如何设置默认值。
					options:{

					}
				}
			},
			methods:{

				cancel(){
					if(this.confirmOpt&&typeof this.confirmOpt.cancelFn === 'function'){
						this.confirmOpt.cancelFn();
					}
				},
				confirm(){
					if(this.confirmOpt&&typeof this.confirmOpt.confirmFn === 'function'){
						this.confirmOpt.confirmFn();
					}
				}

			}
		}
	</script>

	<style lang="less">
		@borderColor:#dce0e6;
		.modal-confirm{
			position: absolute;
			width: 200px;
			top: 50%;
			margin-top: -100px;
			left: 50%;
			margin-left: -100px;

			.txt{
				padding:24px 10px;
				font-size:14px;
				line-height:16px;
				color:#333;
				text-align: center;		
			}
			.confirm-btn-wrap{
				border-top:1px solid @borderColor;
				display: flex;
				.confirm-btn{
					flex: 1;
					width: 100%;
					position: relative;
					color: #333;
					height: 40px;
					line-height: 40px;
					color:#1388ff;
				}
			}
		}

	</style>