<template>
<!-- 这种公共的应该如何调用？每个页面单独引入吗？ -->
	<div class="modal-tip" v-show="modalOpt.show">

		<div class="modal-black"></div> <!-- 遮罩 -->
		<div class="modal-con">
			<img src="../images/success.png" height="137" width="134" alt="" v-show="modalOpt.type == 'success'">
			<p>{{modalOpt.txt}}</p>
		</div>
		
		

	</div>
	
</template>
<script>
	export default {
		props:['modalOpt'],

	}
</script>

<style lang="less">
	.modal-tip{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		text-align: center;
	}
	.modal-black{
		background: black;
		opacity: .2;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.modal-con{
		background: #fff;
		border-radius: 10px;
		position: absolute;
		width: 200px;
		height: 140px;
		top: 50%;
		margin-top: -70px;
		left: 50%;
		margin-left: -100px;
		img{
			height:69px;
			width:67px;
			margin-top: 25px;
		}
		p{
			font-size: 15px;
			line-height: 1em;
			margin-top: 10px;
		}

	}

</style>