import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useUserStore } from '../stores/user';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'dashboard', component: () => import('../views/DashboardView.vue') },

  // öffentlich
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue'), meta: { public: true } },

  // frei zugänglich: Marketplace (kann auch public sein)
  { path: '/marketplace', name: 'marketplace', component: () => import('../views/MarketplaceView.vue'), meta: { public: true } },

  // geschützt: Leads (buyer & setter & admin)
  { path: '/leads', name: 'leads', component: () => import('../views/LeadsView.vue'),
    meta: { roles: ['buyer','setter','admin'] } },

  // Beispiel für Admin-only (später): 
  // { path: '/admin', name: 'admin', component: () => import('../views/AdminView.vue'), meta: { roles: ['admin'] } },

  // fallback
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({ history: createWebHistory(), routes });

// Globaler Guard
router.beforeEach((to) => {
  const store = useUserStore();

  // Public Route? -> durchlassen
  if (to.meta?.public) return true;

  // Hat Route Rollen-Restriktion?
  const allowedRoles = (to.meta?.roles as string[] | undefined);

  // Wenn keine Restriktion angegeben: require login
  const needsAuth = !to.meta?.public;

  if (needsAuth && !store.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }

  if (allowedRoles && store.role && !allowedRoles.includes(store.role)) {
    // verboten -> einfache Umleitung (Dashboard)
    return { name: 'dashboard' };
  }

  return true;
});

export default router;
