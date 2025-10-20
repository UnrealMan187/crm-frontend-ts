<template>
    <div class="flex min-h-screen bg-bg text-text">
      <Sidebar />
  
      <div class="flex flex-1 flex-col">
        <Topbar />
        <main class="flex-1 p-6">
          <slot />
        </main>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import Sidebar from './Sidebar.vue';
  import Topbar from './Topbar.vue';
  </script>
  