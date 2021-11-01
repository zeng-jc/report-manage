import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminLayout from 'views/layout/AdminLayout.vue'
import Login from 'views/login/Login.vue'
import Account from 'views/account/Account.vue'
import Welcome from 'views/Welcome.vue'
import Record from 'views/record/Record.vue'
import Handle from 'views/handle/Handle.vue'
import Statistic from 'views/statistic/Statistic.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/welcome',
    component: AdminLayout,
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/system/account',
        component: Account
      },
      {
        path: '/report/record',
        component: Record
      },
      {
        path: '/report/handle/:id',
        component: Handle
      },
      {
        path: '/report/statistic',
        component: Statistic
      }
    ]
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
