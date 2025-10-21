<template>
    <div class="space-y-1">
      <label v-if="label" class="text-sm text-textMuted">{{ label }}</label>
  
      <input
        :value="modelValue"
        @input="onInput"
        v-bind="$attrs"
        class="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-textMuted
               focus:outline-none focus:ring-2 focus:ring-primary-100"
      />
  
      <p v-if="hint" class="text-xs text-textMuted">{{ hint }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = withDefaults(defineProps<{
    modelValue?: string | number
    label?: string
    hint?: string
    /** Rückgabewert-Typ: 'string' (Default) oder 'number' */
    coerce?: 'string' | 'number'
  }>(), {
    coerce: 'string'
  })
  
  const emit = defineEmits<{ (e: 'update:modelValue', v: string | number): void }>()
  
  function onInput(e: Event) {
    const raw = (e.target as HTMLInputElement).value
    const val = props.coerce === 'number'
      ? (raw === '' ? '' : Number(raw))
      : raw
    emit('update:modelValue', val as string | number)
  }
  </script>
  