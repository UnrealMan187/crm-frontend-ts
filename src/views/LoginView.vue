<template>
    <main class="min-h-screen bg-bg text-text grid place-items-center p-6">
      <section class="card p-6 w-full max-w-md">
        <h1 class="mb-2">Anmelden</h1>
        <p class="text-textMuted mb-4">Test-Login ohne Backend.</p>
        <button
          class="rounded-xl bg-primary text-white px-4 py-2"
          @click="login"
        >
          Mock-Login (buyer/free)
        </button>
        <RouterLink to="/" class="underline mt-4 block text-sm">Zurück zum Dashboard</RouterLink>
      </section>
    </main>
  </template>
  
  <script setup lang="ts">
  import { useUserStore } from '../stores/user';
  import { RouterLink } from 'vue-router';
  
  const store = useUserStore();
  function login() {
    store.loginMock(); // später ersetzen wir das durch Supabase Auth
  }
  </script>
  