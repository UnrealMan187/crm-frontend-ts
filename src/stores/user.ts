import { defineStore } from 'pinia';

export type UserRole = 'buyer' | 'setter' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

const STORAGE_KEY = 'session:user';

function loadSession(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as User : null;
  } catch { return null; }
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: loadSession() as User | null
  }),
  getters: {
    isAuthenticated: (s) => !!s.user,
    role: (s) => s.user?.role as UserRole | undefined,
  },
  actions: {
    loginMock(role: UserRole = 'buyer') {
      // einfache Demo-Identität
      const u: User = {
        id: crypto.randomUUID(),
        name: role === 'admin' ? 'Admin' : role === 'setter' ? 'Setter' : 'Buyer',
        email: `${role}@demo.local`,
        role
      };
      this.user = u;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    },
    logout() {
      this.user = null;
      localStorage.removeItem(STORAGE_KEY);
    }
  }
});
