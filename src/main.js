// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'lib-flexible' //移动适配
import FastClick from 'fastclick'
window.FastClick = FastClick
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import Swiper from 'swiper'
window.Swiper = Swiper

import VueResource from 'vue-resource'
Vue.use(VueResource)



/*element上传插件*/
import ElUpload from 'element-upload'
// import 'element-theme-default/dist/upload.css'

Vue.use(ElUpload)

Vue.config.productionTip = false

import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
