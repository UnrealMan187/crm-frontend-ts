<template>
    <button
      @click="toggleTheme"
      class="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text hover:bg-muted"
      aria-label="Theme wechseln"
    >
      <span v-if="theme === 'dark'">🌙</span>
      <span v-else>☀️</span>
      <span class="hidden sm:inline">{{ theme === 'dark' ? 'Dark' : 'Light' }}</span>
    </button>
  </template>
  
  <script setup lang="ts">
  import { useTheme } from '../composables/useTheme';
  const { theme, toggleTheme } = useTheme();
  </script>
  