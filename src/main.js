import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
// 进入插件-directive
import directivesObj from '@/utils/directive'
// 引入vant
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search, Image as VanImage, Divider, CellGroup, Tag, ShareSheet, Dialog, DatetimePicker } from 'vant'
// 使用vant
Vue.use(DatetimePicker)
Vue.use(Dialog)
Vue.use(ShareSheet)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(VanImage)
Vue.use(ActionSheet)
Vue.use(Badge)
Vue.use(Search)
Vue.use(Col)
Vue.use(Row)
Vue.use(Tab)
Vue.use(Cell)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Popup)
// 引入聚焦
Vue.use(directivesObj)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
