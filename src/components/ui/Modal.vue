<template>
    <div v-if="open" class="fixed inset-0 z-50 grid place-items-center">
      <div class="absolute inset-0 bg-black/40" @click="$emit('close')" />
      <div class="relative z-10 w-full max-w-xl rounded-2xl border border-border bg-surface p-5 shadow-card">
        <header class="mb-3 flex items-center justify-between">
          <h3 class="font-display text-lg"><slot name="title" /></h3>
          <button class="rounded-lg px-2 py-1 hover:bg-muted" @click="$emit('close')">✕</button>
        </header>
        <div><slot /></div>
        <footer class="mt-4 flex justify-end gap-2">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{ open: boolean }>()
  defineEmits<{(e:'close'):void}>()
  </script>
  