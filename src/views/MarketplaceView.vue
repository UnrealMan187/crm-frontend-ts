<template>
    <section class="mx-auto max-w-7xl">
      <header class="mb-6">
        <h1 class="text-2xl md:text-3xl font-display font-semibold">{{ $t('market.title') }}</h1>
        <p class="text-textMuted mt-2">{{ $t('market.subtitle') }}</p>
      </header>
  
      <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <PackageCard
          v-for="cat in catalog"
          :key="cat.id"
          :category="cat"
          @select="onSelect"
        />
      </div>
  
      <div v-if="selection" class="mt-6">
        <Card>
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div class="font-medium">
                {{ $t('market.selectedTitle', {
                  category: selection.category.name,
                  id: selection.tier.id,
                  leads: selection.tier.leads
                }) }}
              </div>
              <div class="text-sm text-textMuted">
                {{
                  (selection.category.leadPrice * selection.tier.leads)
                    .toLocaleString($i18n.locale === 'de' ? 'de-DE' : 'en-US')
                }} €
              </div>
            </div>
            <div class="flex gap-2">
              <Button @click="mockAddToCart">{{ $t('market.addToCart') }}</Button>
              <Button variant="secondary" @click="selection=null">{{ $t('market.cancel') }}</Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { packageCatalog } from '../data/packages'
  import PackageCard from '../components/marketplace/PackageCard.vue'
  import Card from '../components/ui/Card.vue'
  import Button from '../components/ui/Button.vue'
  
  const catalog = packageCatalog
  const selection = ref<null | { category: any; tier: any }>(null)
  
  function onSelect(payload: any){ selection.value = payload }
  function mockAddToCart(){
    alert('Frontend-Demo: Checkout folgt mit Backend.')
  }
  </script>
  