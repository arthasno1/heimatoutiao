import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('@/views/Login/index.vue') },
    {
      path: '/layout',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        { path: 'home', component: () => import('@/views/Home/index.vue') },
        { path: 'user', component: () => import('@/views/User/index.vue') }
      ]
    },
    { path: '/search', component: () => import('@/views/Search/index.vue') },
    { path: '/search_result/:kw', component: () => import('@/views/Search/SearchResult.vue') },
    { path: '/detail', component: () => import('@/views/ArticleDetail/index.vue') },
    { path: '/user_editor', component: () => import('@/views/User/UserEdit.vue') }
  ]
})
export default router
