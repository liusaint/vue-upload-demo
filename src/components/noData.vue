<template>
	
	<div class="no-data absolute-white">
		<img src="../images/no_data.png" height="280" width="280" alt="">
		<p>暂无数据</p>
	</div>

</template>
<script>
	export default {

	};
</script>
<style scoped>
	.no-data{
		top:44px;
		height: calc(100% - 44px);
		text-align: center;
	}
	.no-data img{
		height: 140px;
		width: 140px;
		margin-top: 110px;
	}
	.no-data p{
		line-height: 1em;
		margin-top: 10px;
		font-size: 14px;
	}
</style>