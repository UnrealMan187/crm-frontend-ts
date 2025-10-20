<template>
    <button
      :class="[
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition',
        'border border-border bg-primary text-white hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed',
        variant === 'secondary' && 'bg-surface text-text hover:bg-muted',
        block && 'w-full'
      ]"
      v-bind="$attrs"
    >
      <slot />
    </button>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    variant?: 'primary' | 'secondary'
    block?: boolean
  }>()
  </script>
  