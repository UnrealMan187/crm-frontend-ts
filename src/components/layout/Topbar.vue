<script setup lang="ts">
import ThemeToggle from '../ThemeToggle.vue'
import LanguageSwitcher from '../LanguageSwitcher.vue'
import { useLayout } from '../../composables/useLayout'
import { useUserStore } from '../../stores/user'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const { toggleSidebar } = useLayout()
const store = useUserStore()
const router = useRouter()

const isAuth = computed(() => store.isAuthenticated)
const userLabel = computed(() =>
  store.user ? `${store.user.role.toUpperCase()} · ${store.user.email}` : ''
)

const menuOpen = ref(false)

function logout() {
  store.logout()
  menuOpen.value = false
  router.push({ name: 'login' })
}
</script>

<template>
  <header
    class="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border
           bg-surface/80 px-4 py-3 backdrop-blur"
  >
    <div class="flex items-center gap-2">
      <!-- Burger Button (Mobile) -->
      <button
        class="rounded-lg p-2 hover:bg-muted lg:hidden"
        @click="toggleSidebar"
        aria-label="Menü öffnen"
      >
        ☰
      </button>
      <span class="hidden sm:inline text-sm text-textMuted">{{
        $t('topbar.app')
      }}</span>
    </div>

    <div class="flex items-center gap-3">
      <!-- Search -->
      <input
        class="hidden md:block w-72 rounded-xl border border-border bg-surface px-4 py-2 text-sm text-text
               placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary-100"
        :placeholder="$t('topbar.search')"
      />

      <!-- Language + Theme -->
      <LanguageSwitcher />
      <ThemeToggle />

      <!-- User Menu -->
      <div v-if="isAuth" class="relative">
        <button
          class="rounded-xl border border-border bg-surface px-3 py-2 text-sm"
          @click="menuOpen = !menuOpen"
        >
          {{ userLabel }}
        </button>

        <!-- Menü -->
        <div v-if="menuOpen" class="fixed inset-0 z-10" @click="menuOpen = false"></div>
        <div
          v-if="menuOpen"
          class="absolute right-0 z-20 mt-2 w-44 rounded-xl border border-border bg-surface py-1 shadow-card"
        >
          <button
            class="w-full text-left px-3 py-2 text-sm hover:bg-muted"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>

      <!-- Login -->
      <RouterLink v-else to="/login" class="text-sm underline">Login</RouterLink>
    </div>
  </header>
</template>
