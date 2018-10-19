
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
//插件
import 'amfe-flexible'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import NProgress from 'nprogress'
import '../static/css/nprogress.css'



import store from './vuex/store'
import './common/styl/index.styl'  //全局样式

//引入图标样式
import 'font-awesome/css/font-awesome.min.css'


import App from './App'
import './components'
import './common/js/globalFun'


import util from '@/common/js/util'


NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();
  if(util.isAuth(to.path)){
    next();
  }
})

router.afterEach(transition => {
   NProgress.done();
});

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


