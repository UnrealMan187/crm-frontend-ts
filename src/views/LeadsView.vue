<template>
    <section class="mx-auto max-w-7xl">
      <header class="mb-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl md:text-3xl font-display font-semibold">Leads</h1>
          <p class="text-textMuted">Eigene & gekaufte Leads verwalten.</p>
        </div>
        <Button @click="open = true">Eigenen Lead anlegen</Button>
      </header>
  
      <LeadsTable />
  
      <Modal :open="open" @close="open=false">
        <template #title>Eigenen Lead anlegen</template>
        <LeadForm @submit="save" />
      </Modal>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import LeadsTable from '../components/leads/LeadsTable.vue'
  import Modal from '../components/ui/Modal.vue'
  import LeadForm from '../components/leads/LeadForm.vue'
  import Button from '../components/ui/Button.vue'
  import { useLeadsStore } from '../stores/leads'
  
  const store = useLeadsStore()
  const open = ref(false)
  
  function save(data: any){
    store.addLead(data)
    open.value = false
  }
  </script>
  