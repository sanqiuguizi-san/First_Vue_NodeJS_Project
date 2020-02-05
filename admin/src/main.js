import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import './style.css'

Vue.config.productionTip = false

import http from "./http"
//加载到Vue实例的原型对象中，可以在任意情况使用this来使用这个http接口
Vue.prototype.$http=http

//P31：自定义上传图片，增加token进去req中
//在Vue对象文件中新增全局定义的代码块mixin，使得全局的Vue实例都有它
//每个vue组件下都有它
Vue.mixin({
  //定义URL的合并计算，然后在itemedit中使用
  computed:{
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  //定义一个方法给上传图片的组件使用
  //在方法中返回一个请求头字段给
  methods:{
    getAuthHeaders(){
      //通过判空来保证返回后端进行拆分的token不会报错
      return{
        Authorization:`Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
