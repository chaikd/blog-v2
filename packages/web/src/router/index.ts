import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/article',
      children: [
        {
          path: '',
          name: 'articleList',
          component: () => import('@/views/article/index.vue')
        },
        {
          path: ':id',
          name: 'articleDetail',
          component: () => import('@/views/article/detail.vue')
        }
      ]
    },
    {
      path: '/album',
      name: 'album',
      component: () => import('@/views/album/index.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about/index.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/auth/404.vue')
    },
  ]
})

export default router
