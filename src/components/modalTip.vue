<template>
<!-- 这种公共的应该如何调用？每个页面单独引入吗？ -->
	<div class="modal-wrap" v-show="modalOpt.show">
		<div class="modal-black"></div> <!-- 遮罩 -->
		<div class="modal-con modal-tip">
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