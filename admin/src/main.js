import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import './style.css'

Vue.config.productionTip = false

import http from "./http"
//加载到Vue实例的原型对象中，可以在任意情况使用this来使用这个http接口
Vue.prototype.$http=http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
