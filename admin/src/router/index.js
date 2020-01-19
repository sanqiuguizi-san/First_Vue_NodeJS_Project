import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)



const router = new VueRouter({
  routes:[
    //登录界面路由
    {
      path: '/login',
      name: 'login',
      component: Login,
      //定义允许公开访问
      meta:{ isPublic: true }
    },
    //后台登录后的路由
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        {
          path: '/categories/create',
          component: CategoryEdit
        },
        {
          path: '/categories/edit/:id',
          component: CategoryEdit,
          props:true,//将url传入的参数id放入该组件中
        },
        {
          path: '/categories/list',
          component: CategoryList
        },
  
        {
          path: '/items/create',
          component: ItemEdit
        },
        {
          path: '/items/edit/:id',
          component: ItemEdit,
          props:true,//将url传入的参数id放入该组件中
        },
        {
          path: '/items/list',
          component: ItemList
        },
  
        {
          path: '/heroes/create',
          component: HeroEdit
        },
        {
          path: '/heroes/edit/:id',
          component: HeroEdit,
          props:true,//将url传入的参数id放入该组件中
        },
        {
          path: '/heroes/list',
          component: HeroList
        },
  
        {
          path: '/articles/create',
          component: ArticleEdit
        },
        {
          path: '/articles/edit/:id',
          component: ArticleEdit,
          props:true,//将url传入的参数id放入该组件中
        },
        {
          path: '/articles/list',
          component: ArticleList
        },
  
        {
          path: '/ads/create',
          component: AdEdit
        },
        {
          path: '/ads/edit/:id',
          component: AdEdit,
          props:true,//将url传入的参数id放入该组件中
        },
        {
          path: '/ads/list',
          component: AdList
        },
        
        {
          path: '/admin_users/create',
          component: AdminUserEdit
        },
        {
          path: '/admin_users/edit/:id',
          component: AdminUserEdit,
          props:true,//将url传入的参数id放入该组件中
        },
        {
          path: '/admin_users/list',
          component: AdminUserList
        },
      ]
    },
  ]
})

router.beforeEach((to,from,next)=>{
  //判断
  if(!to.meta.isPublic && !localStorage.token){
    //console.log('need login')
    return next('/login')
  }
  next()
})

export default router
