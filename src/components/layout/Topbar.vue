<script setup lang="ts">
import ThemeToggle from '../ThemeToggle.vue'
import LanguageSwitcher from '../LanguageSwitcher.vue'
import { useLayout } from '../../composables/useLayout'
import { useUserStore } from '../../stores/user'
import { useCartStore } from '../../stores/cart'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const { toggleSidebar } = useLayout()
const userStore = useUserStore()
const cart = useCartStore()
const router = useRouter()

const isAuth = computed(() => userStore.isAuthenticated)
const userLabel = computed(() =>
  userStore.user ? `${userStore.user.role.toUpperCase()} · ${userStore.user.email}` : ''
)

const menuOpen = ref(false)
function logout() {
  userStore.logout()
  menuOpen.value = false
  router.push({ name: 'login' })
}

function goCheckout() {
  router.push({ name: 'checkout' })
}
</script>

<template>
  <header
    class="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border
           bg-surface/80 px-4 py-3 backdrop-blur"
  >
    <!-- Left: burger + app label -->
    <div class="flex items-center gap-2">
      <button
        class="rounded-lg p-2 hover:bg-muted lg:hidden"
        @click="toggleSidebar"
        aria-label="Menü öffnen"
      >
        ☰
      </button>
      <span class="hidden sm:inline text-sm text-textMuted">{{ $t('topbar.app') }}</span>
    </div>

    <!-- Right: search + actions -->
    <div class="flex items-center gap-3">
      <input
        class="hidden md:block w-72 rounded-xl border border-border bg-surface px-4 py-2 text-sm text-text
               placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-primary-100"
        :placeholder="$t('topbar.search')"
      />

      <LanguageSwitcher />
      <ThemeToggle />

      <!-- Cart button with badge -->
      <button
        class="relative rounded-xl border border-border bg-surface px-3 py-2 text-sm hover:bg-muted"
        @click="goCheckout"
        aria-label="Warenkorb öffnen"
        title="Warenkorb"
      >
        <!-- simple cart icon -->
        <svg viewBox="0 0 24 24" class="h-5 w-5 inline-block align-middle">
          <path
            d="M3 3h2l2.4 12.3a2 2 0 0 0 2 1.7h7.8a2 2 0 0 0 2-1.6L21 7H6"
            fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
          />
          <circle cx="10" cy="20" r="1.6" />
          <circle cx="18" cy="20" r="1.6" />
        </svg>
        <span class="ml-2 hidden sm:inline">{{ $t('topbar.cart') }}</span>

        <!-- Badge -->
        <span
          v-if="cart.count > 0"
          class="absolute -top-1 -right-1 min-w-[1.25rem] px-1 text-[10px] leading-4 text-center
                 rounded-full bg-primary-100 text-surface shadow"
        >
          {{ cart.count }}
        </span>
      </button>

      <!-- User menu / Login -->
      <div v-if="isAuth" class="relative">
        <button class="rounded-xl border border-border bg-surface px-3 py-2 text-sm" @click="menuOpen=!menuOpen">
          {{ userLabel }}
        </button>
        <div
          v-if="menuOpen"
          class="absolute right-0 mt-2 w-44 rounded-xl border border-border bg-surface py-1 shadow-card"
        >
          <button class="w-full text-left px-3 py-2 text-sm hover:bg-muted" @click="logout">
            {{ $t('topbar.logout') }}
          </button>
        </div>
      </div>
      <RouterLink v-else to="/login" class="text-sm underline">{{ $t('topbar.login') }}</RouterLink>
    </div>
  </header>
</template>
