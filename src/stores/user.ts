import { defineStore } from 'pinia';

export type UserRole = 'buyer' | 'setter' | 'admin';
export type UserPlan = 'free' | 'pro';

interface User {
  id: string;
  email: string;
  role: UserRole;
  plan: UserPlan;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isAuthenticated: (s) => !!s.user,
    role: (s): UserRole => s.user?.role ?? 'buyer',
    plan: (s): UserPlan => s.user?.plan ?? 'free',
    hasPro: (s) => s.user?.plan === 'pro',
  },
  actions: {
    // Temporär: Mock-Login, bis Supabase angebunden ist
    loginMock(email = 'demo@yourbrand.de', role: UserRole = 'buyer', plan: UserPlan = 'free') {
      this.user = { id: crypto.randomUUID(), email, role, plan };
    },
    logout() {
      this.user = null;
    },
  },
});
