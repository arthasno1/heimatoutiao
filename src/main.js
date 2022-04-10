// 生产环境移除console.log
import './utils/consoleRemove'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
// 进入插件-directive
import directivesObj from '@/utils/directive'
// 引入vant按需导入组件
import './VantComponents'
// 引入聚焦
Vue.use(directivesObj)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
