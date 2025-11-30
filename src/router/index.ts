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
      path: '/view/flowchart/:gameId?/:versionId?/:flowchartName?',
      name: 'view_flowchart',
      component: () => import('../views/ViewFlowchart.vue'),
      props: true,
    },
    {
      path: '/view/localization/:gameId?/:versionId?',
      name: 'view_localization',
      component: () => import('../views/ViewL10n.vue'),
      props: true,
    },
    {
      path: '/view/resource/:gameId?/:versionId?',
      name: 'view_resource',
      component: () => import('../views/ViewResource.vue'),
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/FaqView.vue'),
    },
    {
      path: '/changelogs',
      name: 'changelogs',
      component: () => import('../views/ChangelogView.vue'),
    },
  ],
})

export default router
