<template>
    <form @submit.prevent="submit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input v-model="form.firstName" label="Vorname" required />
        <Input v-model="form.lastName"  label="Nachname" required />
        <Input v-model="form.company"   label="Firma" />
        <Input v-model="form.email"     type="email" label="E-Mail" required />
        <Input v-model="form.phone"     label="Telefon" />
        <Input v-model="form.street"    label="Straße" />
        <Input v-model="form.zip"       label="PLZ" required />
        <Input v-model="form.city"      label="Ort" required />
        <div>
          <label class="text-sm text-textMuted">Kategorie</label>
          <select v-model="form.category" class="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm">
            <option value="handwerk">Handwerk</option>
            <option value="finanzen">Finanzen</option>
            <option value="energie">Energie</option>
            <option value="dienstleistungen">Dienstleistungen</option>
          </select>
        </div>
        <Input v-model="form.subcategory" label="Subkategorie" />
        <Input v-model="form.source" label="Quelle" />
        <div>
          <label class="inline-flex items-center gap-2 text-sm mt-2">
            <input type="checkbox" v-model="form.consent" />
            Einwilligung (Opt-in) liegt vor
          </label>
        </div>
        <Input v-model="form.priority" label="Priorität (1–5)" type="number" coerce="number" />
<Input v-model="form.score"    label="Score (0–100)"  type="number" coerce="number" />

        <div class="md:col-span-2">
          <label class="text-sm text-textMuted">Notizen</label>
          <textarea v-model="form.notes" rows="3"
            class="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm"></textarea>
        </div>
      </div>
      <div class="mt-4 flex justify-end gap-2">
        <Button type="submit">Speichern</Button>
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  import Input from '../ui/Input.vue'
  import Button from '../ui/Button.vue'
  import type { Lead } from '../../types/lead'
  import { reactive } from 'vue'
  
  const emit = defineEmits<{ (e:'submit', lead: Omit<Lead,'id'|'createdAt'>):void }>()
  const form = reactive<Omit<Lead,'id'|'createdAt'>>({
    firstName: '', lastName: '', company: '', email: '', phone: '',
    street: '', zip: '', city: '', category: 'handwerk', subcategory: '',
    source: '', consent: false, notes: '', priority: 1, score: 0, status: 'neu'
  })
  
  function submit(){ emit('submit', { ...form }) }
  </script>
  