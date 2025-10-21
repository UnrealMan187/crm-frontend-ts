<template>
    <div class="rounded-2xl border border-border bg-surface/70 overflow-hidden">
      <div class="p-3 flex flex-wrap gap-2 items-center justify-between">
        <input v-model="q" placeholder="Suche (Name, Firma, E-Mail, Telefon)"
               class="w-full md:w-96 rounded-xl border border-border bg-surface px-3 py-2 text-sm" />
        <div class="flex gap-2">
          <select v-model="status" class="rounded-xl border border-border bg-surface px-3 py-2 text-sm">
            <option value="">Status (alle)</option>
            <option value="neu">Neu</option>
            <option value="kontaktiert">Kontaktiert</option>
            <option value="erneut">Erneut</option>
            <option value="erinnerung">Erinnerung</option>
            <option value="termin">Termin</option>
            <option value="angebot">Angebot</option>
            <option value="gewonnen">Gewonnen</option>
            <option value="verloren">Verloren</option>
          </select>
          <select v-model="category" class="rounded-xl border border-border bg-surface px-3 py-2 text-sm">
            <option value="">Kategorie (alle)</option>
            <option value="handwerk">Handwerk</option>
            <option value="finanzen">Finanzen</option>
            <option value="energie">Energie</option>
            <option value="dienstleistungen">Dienstleistungen</option>
          </select>
          <Button variant="secondary" @click="exportCSV">Export CSV</Button>
        </div>
      </div>
  
      <table class="w-full text-sm">
        <thead class="bg-muted/60">
          <tr>
            <th class="px-3 py-2 text-left">Lead</th>
            <th class="px-3 py-2 text-left">Kontakt</th>
            <th class="px-3 py-2 text-left">Ort</th>
            <th class="px-3 py-2 text-left">Kategorie</th>
            <th class="px-3 py-2 text-left">Status</th>
            <th class="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in filtered" :key="l.id" class="border-t border-border/60">
            <td class="px-3 py-2">
              <div class="font-medium">{{ l.firstName }} {{ l.lastName }}</div>
              <div class="text-textMuted">{{ l.company }}</div>
            </td>
            <td class="px-3 py-2">
              <div>{{ l.email }}</div>
              <div class="text-textMuted">{{ l.phone }}</div>
            </td>
            <td class="px-3 py-2">{{ l.zip }} {{ l.city }}</td>
            <td class="px-3 py-2 capitalize">{{ l.category }}</td>
            <td class="px-3 py-2"><StatusBadge :status="l.status" /></td>
            <td class="px-3 py-2 text-right">
              <select v-model="statuses[l.id]" @change="changeStatus(l.id)" class="rounded-lg border border-border bg-surface px-2 py-1">
                <option value="neu">Neu</option>
                <option value="kontaktiert">Kontaktiert</option>
                <option value="erneut">Erneut</option>
                <option value="erinnerung">Erinnerung</option>
                <option value="termin">Termin</option>
                <option value="angebot">Angebot</option>
                <option value="gewonnen">Gewonnen</option>
                <option value="verloren">Verloren</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, reactive, ref, watchEffect } from 'vue'
  import StatusBadge from './StatusBadge.vue'
  import Button from '../ui/Button.vue'
  import { useLeadsStore } from '../../stores/leads'
  import type { Lead } from '../../types/lead'
  
  const store = useLeadsStore()
  const q = ref('')
  const status = ref('')
  const category = ref('')
  
  const filtered = computed(() => {
    const query = q.value.toLowerCase().trim()
    return store.leads.filter((l: Lead) => {
      const matchesQ =
        !query ||
        [l.firstName, l.lastName, l.company, l.email, l.phone]
          .filter(Boolean)
          .some(v => String(v).toLowerCase().includes(query));
      const matchesS = !status.value || l.status === status.value
      const matchesC = !category.value || l.category === category.value
      return matchesQ && matchesS && matchesC
    })
  })
  
  const statuses = reactive<Record<string, string>>({})
  watchEffect(() => {
    filtered.value.forEach(l => (statuses[l.id] = l.status))
  })
  
  function changeStatus(id: string) {
    store.updateStatus(id, statuses[id] as any)
  }
  function exportCSV(){ store.exportCSV() }
  </script>
  