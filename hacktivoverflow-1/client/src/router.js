import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ThreadDetail from './views/ThreadDetail.vue'
import Verification from './views/Verification.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/thread/:id',
      name: 'threadDetail',
      component: ThreadDetail
    },
    {
      path: '/verification/:id',
      name: 'Verification',
      component: Verification
    },
  ]
})