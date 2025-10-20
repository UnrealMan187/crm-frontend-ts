<template>
    <div class="space-y-1">
      <label v-if="label" class="text-sm text-textMuted">{{ label }}</label>
      <input
        class="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-textMuted
               focus:outline-none focus:ring-2 focus:ring-primary-100"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <p v-if="hint" class="text-xs text-textMuted">{{ hint }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    modelValue?: string
    label?: string
    hint?: string
  }>()
  defineEmits<{(e:'update:modelValue', value:string):void}>()
  </script>
  