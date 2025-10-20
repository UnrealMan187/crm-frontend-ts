<template>
    <Card>
      <div class="flex items-start justify-between">
        <div>
          <h3 class="font-display text-lg">{{ category.name }}</h3>
          <p class="text-sm text-textMuted mt-1">{{ category.blurb }}</p>
        </div>
        <span class="rounded-lg bg-muted px-2 py-1 text-xs text-textMuted">
          {{ category.leadPrice.toFixed(0) }} € / Lead
        </span>
      </div>
  
      <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div
          v-for="t in category.tiers"
          :key="t.id"
          class="rounded-xl border border-border p-3 bg-surface/60"
        >
          <div class="flex items-center justify-between">
            <div class="font-medium">Paket {{ t.id }}</div>
            <div v-if="t.discountNote" class="text-xs text-primary-100">{{ t.discountNote }}</div>
          </div>
          <div class="mt-1 text-sm text-textMuted">{{ t.leads }} Leads</div>
  
          <div class="mt-3 text-lg font-semibold">
            {{ total(t).toLocaleString('de-DE') }} €
          </div>
  
          <Button class="mt-3 w-full" @click="$emit('select', {category, tier:t})">
            Auswählen
          </Button>
        </div>
      </div>
    </Card>
  </template>
  
  <script setup lang="ts">
  import Card from '../../components/ui/Card.vue'
  import Button from '../../components/ui/Button.vue'
  import type { PackageCategory, Tier } from '../../data/packages'
  import { calcTotal } from '../../data/packages'
  
  const props = defineProps<{ category: PackageCategory }>()
  const total = (t: Tier) => calcTotal(props.category.leadPrice, t.leads)
  defineEmits<{(e:'select', payload:{category:PackageCategory, tier:Tier}):void}>()
  </script>
  