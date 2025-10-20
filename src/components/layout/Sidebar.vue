<template>
    <!-- Desktop Sidebar -->
    <aside
      class="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border lg:bg-surface/80 lg:backdrop-blur"
    >
      <div class="p-5">
        <div class="text-xl font-display font-semibold">{{ $t('brand') }}</div>
      </div>
      <nav class="px-3 pb-4 space-y-1">
        <RouterLink
          v-for="i in items"
          :key="i.to"
          :to="i.to"
          class="block rounded-xl px-3 py-2 text-text hover:bg-muted"
          active-class="bg-muted"
        >
          {{ $t(i.key) }}
        </RouterLink>
      </nav>
    </aside>
  
    <!-- Mobile Drawer -->
    <div v-if="sidebarOpen" class="lg:hidden">
      <!-- Backdrop -->
      <div
        class="fixed inset-0 z-40 bg-black/40"
        @click="closeSidebar"
        aria-hidden="true"
      />
      <!-- Panel -->
      <div
        class="fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-surface/95 backdrop-blur
               transition-transform duration-200 ease-out"
      >
        <div class="p-5 flex items-center justify-between">
          <div class="text-lg font-display font-semibold">{{ $t('brand') }}</div>
          <button class="rounded-lg px-2 py-1 hover:bg-muted" @click="closeSidebar" aria-label="Schließen">
            ✕
          </button>
        </div>
  
        <nav class="px-3 pb-6 space-y-1">
          <RouterLink
            v-for="i in items"
            :key="i.to"
            :to="i.to"
            class="block rounded-xl px-3 py-2 text-text hover:bg-muted"
            active-class="bg-muted"
            @click="closeSidebar"
          >
            {{ $t(i.key) }}
          </RouterLink>
        </nav>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { useLayout } from '../../composables/useLayout';
  
  const { sidebarOpen, closeSidebar } = useLayout();
  
  const items = [
    { key: 'nav.dashboard', to: '/' },
    { key: 'nav.login', to: '/login' },
    { key: 'nav.marketplace', to: '/marketplace' }
    // später: Leads, Marketplace, Kunden, Abrechnung, Einstellungen …
  ];
  </script>
  