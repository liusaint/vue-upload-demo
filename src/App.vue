<template>
  <div id="app"> 
  	<loading></loading>
    <router-view></router-view>
  </div>
</template>

<script>

import loading from './components/loading.vue';
export default {
  name: 'app',
  components:{
  	loading
  }
}
</script>


<style lang="less"> 
  @import './css/index.less';
</style>
