import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'dashboard', component: () => import('../views/DashboardView.vue') },
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
  { path: '/marketplace', name: 'marketplace', component: () => import('../views/MarketplaceView.vue') },
  { path: '/leads', name: 'leads', component: () => import('../views/LeadsView.vue') },

];

export default createRouter({ history: createWebHistory(), routes });
