import Vue from 'vue'
import VueRouter from 'vue-router'
import { getStorage } from '@/utils/storage'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('@/views/Login/index.vue') },
    {
      path: '/layout',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        { path: 'home', component: () => import('@/views/Home/index.vue'), meta: { scrollT: 0, active: 0 } },
        { path: 'user', component: () => import('@/views/User/index.vue'), meta: { active: 1 } }
      ]
    },
    { path: '/search', component: () => import('@/views/Search/index.vue') },
    { path: '/search_result/:kw', component: () => import('@/views/Search/SearchResult.vue') },
    { path: '/detail', component: () => import('@/views/ArticleDetail/index.vue') },
    { path: '/user_editor', component: () => import('@/views/User/UserEdit.vue') },
    { path: '/chat', component: () => import('@/views/Chat/index.vue') }
  ]
})
router.beforeEach((to, from, next) => {
  if (getStorage('geek-itheima')?.length > 0 && to.path === '/login') {
    next('/layout/home')
  } else {
    next()
  }
})
export default router
