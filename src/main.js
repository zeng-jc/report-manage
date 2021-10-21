import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入全局样式表
import 'assets/css/global.less'

import 'plugin/element.js'

import 'element-ui/lib/theme-chalk/index.css'

// 导入字体图标
import 'assets/fonts/iconfont.css'

import http from './http'
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
