import Vue from 'vue'
import Router from 'vue-router'
import uploadType from '@/components/chooseUploadType'
import submitPage from '@/components/submitPage'
import bookPage from '@/components/bookPage'
import expPage from '@/components/expPage'
import searchPage from '@/components/searchPage'
import searchPageExp from '@/components/searchPageExp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'uploadType',
      component: uploadType
    },
    {
      path: '/submitPage',
      name: 'submitPage',
      component: submitPage
    },
   	{
      path: '/bookPage',
      name: 'bookPage',
      component: bookPage
    },
    {
    	path: '/expPage/:id',//传递记录本id;
    	name: 'expPage',
    	component: expPage
    },
    {
      path: '/searchPage',//传递记录本id;
      name: 'searchPage',
      component: searchPage
    },
    {
      path: '/searchPageExp/:id',//传递记录本id;
      name: 'searchPageExp',
      component: searchPageExp
    },
  ]
})
