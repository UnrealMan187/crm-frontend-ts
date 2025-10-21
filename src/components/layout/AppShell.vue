<template>
  <div class="min-h-dvh bg-surface text-text">
    <Topbar />
    <div class="flex">
      <Sidebar />
      <main class="flex-1">
        <!-- 💡 zentraler Page-Container -->
        <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Topbar from './Topbar.vue'
import Sidebar from './Sidebar.vue'
</script>
