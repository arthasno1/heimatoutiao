import Vue from 'vue'
// 引入vant
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search, Image as VanImage, Divider, CellGroup, Tag, ShareSheet, Dialog, DatetimePicker, Loading, Lazyload } from 'vant'
// 使用vant
Vue.use(Lazyload, {
  error: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp1.itc.cn%2Fimages01%2F20210417%2Fda01bdf1fd624014823ebc317536df18.png&refer=http%3A%2F%2Fp1.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651748976&t=e42d0da7d214e9d76b9892e7a9ce2dfa',
  loading: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.17qq.com%2Fimg_qqtouxiang%2F9991159.jpeg&refer=http%3A%2F%2Fwww.17qq.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651749946&t=343af6f5bbd8d1c8d2fdcfe30a489787'
})
Vue.use(Loading)
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
