import { createRouter, createWebHistory } from 'vue-router'
import UAParser from 'ua-parser-js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/article',
      // beforeEnter: (to, from, next) => {
      //   // 跳转移动端
      //   const parser = new UAParser();
      //   if (parser.getResult().device.type === undefined) {
      //     next()
      //   } else {
      //     location.href = import.meta.env.MOBILE_URL
      //   }
      // },
      children: [
        {
          path: '/article',
          name: 'article',
          children: [
            {
              path: '',
              name: 'articleList',
              component: () => import('@/views/article/index.vue')
            },
            {
              path: 'add',
              name: 'articleAdd',
              component: () => import('@/views/article/add.vue')
            },
            {
              path: ':id',
              name: 'articleEdit',
              component: () => import('@/views/article/edit.vue')
            }
          ]
        },
        {
          path: '/tag',
          name: 'tag',
          component: () => import('@/views/tag/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/login.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/auth/404.vue')
    }
  ]
})

export default router
