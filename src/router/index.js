import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from 'views/layout/Layout.vue'
import Login from 'views/login/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 1.如果访问的是login路由则放行并return
  if (to.path === '/login') return next()
  // 2.获取token
  const token = sessionStorage.getItem('token')
  // 3.如果没有token，则进入login页面
  if (!token) return next('/login')
  // 4.有token，放行
  next()
})

export default router
