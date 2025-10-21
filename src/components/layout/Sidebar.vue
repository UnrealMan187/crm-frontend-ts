<template>
    <!-- Desktop Sidebar -->
    <aside
      class="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border lg:bg-surface/80 lg:backdrop-blur"
    >
      <nav class="px-3 pb-4 space-y-1 mt-4">
        <RouterLink
          v-for="i in items"
          :key="i.to"
          v-if="!i.roles || (store.role && i.roles.includes(store.role))"
          :to="i.to"
          class="block rounded-xl px-3 py-2 text-text hover:bg-muted transition"
          active-class="bg-muted"
        >
          {{ t(i.key) }}
        </RouterLink>
      </nav>
    </aside>
  
    <!-- Mobile Drawer -->
    <div v-if="sidebarOpen" class="lg:hidden">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/40 z-20" @click="closeSidebar" aria-hidden="true" />
      <!-- Panel -->
      <div
        class="fixed inset-y-0 left-0 z-30 w-72 border-r border-border bg-surface/95 backdrop-blur transition-transform duration-200 ease-out"
      >
        <div class="p-4 flex items-center justify-between">
          <div class="text-lg font-display font-semibold">{{ t('brand') }}</div>
          <button class="rounded-lg px-2 py-1 hover:bg-muted" @click="closeSidebar" aria-label="Schließen">✕</button>
        </div>
  
        <nav class="px-3 pb-4 space-y-1">
          <RouterLink
            v-for="i in items"
            :key="i.to"
            v-if="!i.roles || (store.role && i.roles.includes(store.role))"
            :to="i.to"
            class="block rounded-xl px-3 py-2 text-text hover:bg-muted transition"
            active-class="bg-muted"
            @click="closeSidebar"
          >
            {{ t(i.key) }}
          </RouterLink>
        </nav>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { useUserStore, type UserRole } from '../../stores/user'
  import { useLayout } from '../../composables/useLayout'
  import { useI18n } from 'vue-i18n'
  
  type NavItem = {
    key: string
    to: string
    roles?: UserRole[]
  }
  
  const store = useUserStore()
  
  // 🔧 Dein useLayout liefert: sidebarOpen, openSidebar, closeSidebar, toggleSidebar
  const { sidebarOpen, closeSidebar } = useLayout()
  
  // ✅ Statt $t im Template: t() aus useI18n
  const { t } = useI18n()
  
  // Navigation mit Rollenbeschränkung
  const items: NavItem[] = [
    { key: 'nav.dashboard',   to: '/' },
    { key: 'nav.marketplace', to: '/marketplace' },
    { key: 'nav.leads',       to: '/leads', roles: ['buyer', 'setter', 'admin'] },
    // { key: 'nav.admin',       to: '/admin', roles: ['admin'] },
    { key: 'nav.login',       to: '/login' }
  ]
  </script>
  