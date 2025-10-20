<template>
    <section>
      <h1>Lead-Pakete</h1>
      <p class="text-textMuted mt-2">Wähle eine Kategorie und Bundle-Größe.</p>
  
      <div class="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
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
                {{ selection.category.name }} – Paket {{ selection.tier.id }} ({{ selection.tier.leads }} Leads)
              </div>
              <div class="text-sm text-textMuted">
                {{ (selection.category.leadPrice * selection.tier.leads).toLocaleString('de-DE') }} €
              </div>
            </div>
            <div class="flex gap-2">
              <Button @click="mockAddToCart">In den Warenkorb</Button>
              <Button variant="secondary" @click="selection=null">Abbrechen</Button>
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
    alert('Nur Frontend-Demo: Warenkorb/Funnel kommt im Backend-Schritt.')
  }
  </script>
  