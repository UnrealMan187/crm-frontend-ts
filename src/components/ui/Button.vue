<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-xl border transition font-medium',
      sizeClass,
      variantClass,
      block ? 'w-full' : 'w-auto'
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  variant?: Variant
  size?: Size
  block?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  block: false
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      // Primäre Aktion
      return 'bg-primary-100 text-surface border-transparent hover:opacity-90'
    case 'secondary':
      // Sekundär (umrissen)
      return 'bg-surface text-text border-border hover:bg-muted'
    case 'ghost':
      // „Ghost“-Button: nur Text/leichter Hover, kein starker Rahmen
      return 'bg-transparent text-text border-transparent hover:bg-muted'
    default:
      return ''
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 text-sm'
    case 'lg':
      return 'px-5 py-3 text-base'
    case 'md':
    default:
      return 'px-4 py-2 text-sm'
  }
})
</script>
