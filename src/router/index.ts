import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/view/flowchart/:flowchartName?',
      name: 'view_flowchart',
      component: () => import('../views/ViewFlowchart.vue'),
      props: true,
    },
  ],
})

export default router
