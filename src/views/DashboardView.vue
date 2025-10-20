<template>
  <main class="min-h-screen bg-bg text-text p-6">
    <h1>Dashboard</h1>
    <p class="text-textMuted mt-2">Hier kommt später dein CRM-Overview hin.</p>

    <div class="mt-6">
      <ThemeToggle />
    </div>

    <RouterLink to="/login" class="underline mt-6 block">Zum Login</RouterLink>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ThemeToggle from '../components/ThemeToggle.vue';
</script>
