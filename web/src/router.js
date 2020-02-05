import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Home from './views/Home.vue'
import Article from './views/Article.vue'
import Hero from './views/Hero.vue'

Vue.use(Router)


//P6设置路由
export default new Router({
  routes: [
    {
      path: '/',
      name:'main',
      component: Main,
      children: [
        { path: '/', name: 'home', component: Home },
        { path: '/articles/:id', name: 'article', component: Article,props:true },
        ]
    },
    //路由添加props
    {path: '/heroes/:id', name: 'hero', component: Hero, props: true},
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    }
  ]
})
