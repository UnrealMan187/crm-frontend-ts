import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useUserStore } from '../stores/user';

const routes: RouteRecordRaw[] = [
  // Dashboard (geschützt)
  { path: '/', name: 'dashboard', component: () => import('../views/DashboardView.vue') },

  // Login (öffentlich)
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue'), meta: { public: true } },

  // Marktplatz (öffentlich)
  { path: '/marketplace', name: 'marketplace', component: () => import('../views/MarketplaceView.vue'), meta: { public: true } },

  // Leads (geschützt: buyer, setter, admin)
  { 
    path: '/leads', 
    name: 'leads', 
    component: () => import('../views/LeadsView.vue'),
    meta: { roles: ['buyer', 'setter', 'admin'] } 
  },

  // Checkout (öffentlich zugänglich, weil Käufer noch nicht eingeloggt sein müssen)
  { 
    path: '/checkout', 
    name: 'checkout', 
    component: () => import('../views/CheckoutView.vue'),
    meta: { public: true } 
  },

  // Beispiel für Admin-only (später)
  // { path: '/admin', name: 'admin', component: () => import('../views/AdminView.vue'), meta: { roles: ['admin'] } },

  // Fallback (404 → Dashboard)
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Globaler Guard
router.beforeEach((to) => {
  const store = useUserStore();

  // Öffentliche Route → durchlassen
  if (to.meta?.public) return true;

  // Rollen-Restriktionen prüfen
  const allowedRoles = (to.meta?.roles as string[] | undefined);
  const needsAuth = !to.meta?.public;

  // Wenn Auth nötig, aber User nicht eingeloggt → Login
  if (needsAuth && !store.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }

  // Wenn Rolle erforderlich, aber User sie nicht hat → Dashboard
  if (allowedRoles && store.role && !allowedRoles.includes(store.role)) {
    return { name: 'dashboard' };
  }

  return true;
});

export default router;
