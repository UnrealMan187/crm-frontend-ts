<template>
    <header
      class="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border
             bg-surface/80 px-4 py-3 backdrop-blur"
    >
      <div class="flex items-center gap-2">
        <button
          class="rounded-lg p-2 hover:bg-muted lg:hidden"
          @click="toggleSidebar"
          aria-label="Menü öffnen"
        >
          ☰
        </button>
        <span class="hidden sm:inline text-sm text-textMuted">{{ $t('topbar.app') }}</span>
      </div>
  
      <div class="flex items-center gap-3">
        <input
          class="hidden md:block w-72 rounded-xl border border-border bg-surface px-4 py-2 text-sm text-text
                 placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary-100"
          :placeholder="$t('topbar.search')"
        />
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import ThemeToggle from '../ThemeToggle.vue';
  import LanguageSwitcher from '../LanguageSwitcher.vue';
  import { useLayout } from '../../composables/useLayout';
  const { toggleSidebar } = useLayout();
  </script>
  