import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/palm',
      name: 'palm',
      component: () => import('../views/PalmReadingView.vue')
    },
    {
      path: '/misfortune',
      name: 'misfortune',
      component: () => import('../views/MisfortuneView.vue')
    },
    {
      path: '/saju',
      name: 'saju',
      component: () => import('../views/SajuView.vue')
    },
    {
      path: '/clicker',
      name: 'clicker',
      component: () => import('../views/ClickerView.vue')
    }
  ]
});

export default router;
