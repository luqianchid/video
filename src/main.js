import Vue from 'vue'
import App from './App.vue'
import store from './vuex'
// import axios from 'axios'
// import VueAxios from 'vue-axios'

import router from './config' // 项目配置

import '@/assets/js/utils' // 公共函数库
import '@/assets/js/ajax' // ajax请求函数库
import '@/assets/js/serverSrc' // ajax请求函数库
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
