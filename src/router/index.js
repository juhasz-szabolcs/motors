import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import MotorsView from '../views/Motors.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/motors',
      name: 'motors',
      component: MotorsView,
    },
  ],
})

export default router
