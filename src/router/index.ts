import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'dashboard', component: () => import('../views/DashboardView.vue') },
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
