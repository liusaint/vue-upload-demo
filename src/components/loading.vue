<template>
	<div class="loading-box" style="position: fixed;">
	<img class="middle" src="/image/loading/small_load.gif">
	</div>
</template>
<script>
	export default {

	}
</script>
<style>
	.loading-box{
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.3);
		color: #fff;
		box-shadow: 0 0 5px rgba(0,0,0,.3);
		padding: 0;
		text-shadow: 0 0 2px #000;
		z-index: 999999;
		top: 0;
	}
	.loading-box .middle {
		position: absolute;
		width: 70px;
		height: 70px;
		border-radius: 15px;
		left: 50%;
		top: 50%;
		margin: -35px 0 0 -35px;
	}
</style>