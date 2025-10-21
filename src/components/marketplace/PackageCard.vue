<template>
    <Card class="group hover:-translate-y-0.5 hover:shadow-lg transition">
      <div class="flex items-start justify-between">
        <div>
          <h3 class="font-display text-lg">{{ category.name }}</h3>
          <p class="text-sm text-textMuted mt-1">{{ category.blurb }}</p>
        </div>
        <span
          class="rounded-lg bg-gradient-to-r from-primary-100/15 to-transparent px-2 py-1 text-xs text-primary-100 border border-border"
        >
          {{ $t('market.pricePerLead', { price: category.leadPrice.toFixed(0) }) }}
        </span>
      </div>
  
      <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div
          v-for="t in category.tiers"
          :key="t.id"
          class="rounded-xl border border-border p-3 bg-surface/60 hover:bg-surface/80 transition"
        >
          <div class="flex items-center justify-between">
            <div class="font-medium">{{ $t('market.package', { id: t.id }) }}</div>
            <div
              v-if="t.discountNote"
              class="text-[10px] px-2 py-0.5 rounded-md border border-primary-100/40 text-primary-100"
            >
              {{ badgeLabel(t.discountNote) }}
            </div>
          </div>
  
          <div class="mt-1 text-sm text-textMuted">
            {{ $t('market.leads', { count: t.leads }) }}
          </div>
  
          <div class="mt-3 text-xl font-semibold tracking-tight">
            {{
              total(t).toLocaleString($i18n.locale === 'de' ? 'de-DE' : 'en-US')
            }} €
          </div>
  
          <Button class="mt-3 w-full" @click="$emit('select', { category, tier: t })">
            {{ $t('market.select') }}
          </Button>
        </div>
      </div>
    </Card>
  </template>
  
  <script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import Card from '../ui/Card.vue'
  import Button from '../ui/Button.vue'
  import type { PackageCategory, Tier } from '../../data/packages'
  import { calcTotal } from '../../data/packages'
  
  const props = defineProps<{ category: PackageCategory }>()
  const { t } = useI18n()
  
  const total = (tier: Tier) => calcTotal(props.category.leadPrice, tier.leads)
  
  function badgeLabel(note?: string) {
    if (!note) return ''
    const n = note.toLowerCase()
    if (n.includes('beliebt')) return t('market.popular') as string
    if (n.includes('bester')) return t('market.bestPrice') as string
    if (n.includes('bundle')) return t('market.bundle') as string
    return note
  }
  
  defineEmits<{ (e: 'select', payload: { category: PackageCategory; tier: Tier }): void }>()
  </script>
  