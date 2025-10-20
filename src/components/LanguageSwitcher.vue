<template>
    <div class="relative">
      <button
        @click="open = !open"
        class="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text hover:bg-muted"
        :aria-expanded="open"
        :aria-label="$t('topbar.language')"
      >
        🌐 <span class="hidden sm:inline">{{ current.toUpperCase() }}</span>
      </button>
  
      <div
        v-if="open"
        class="absolute right-0 mt-2 w-28 rounded-xl border border-border bg-surface py-1 shadow-card"
      >
        <button
          v-for="opt in options"
          :key="opt.value"
          @click="select(opt.value)"
          class="w-full text-left px-3 py-2 text-sm hover:bg-muted"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useLocale } from '../composables/useLocale';
  import { useI18n } from 'vue-i18n';
  
  const { current, options } = useLocale();
  const { t } = useI18n();
  const open = ref(false);
  
  function select(val: string) {
    current.value = val;
    open.value = false;
  }
  
  // Close on outside click or ESC (basic)
  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') open.value = false;
  }
  watch(open, (v) => {
    if (v) window.addEventListener('keydown', onKey);
    else window.removeEventListener('keydown', onKey);
  });
  </script>
  