<template>
  <main class="grid min-h-[60vh] place-items-center">
    <section class="card p-6 w-full max-w-md">
      <h1 class="mb-2">{{ $t('login.title') }}</h1>
      <p class="text-textMuted mb-4">{{ $t('login.subtitle') }}</p>

      <div class="space-y-3">
        <label class="text-sm text-textMuted">Rolle wählen</label>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="r in roles"
            :key="r.value"
            @click="select(r.value)"
            :class="[
              'rounded-xl border px-3 py-2 text-sm transition',
              role === r.value
                ? 'border-primary-100 text-primary-100'
                : 'border-border hover:bg-muted'
            ]"
          >
            {{ r.label }}
          </button>
        </div>

        <Button class="w-full mt-2" @click="login">
          {{ $t('login.mockButton') }}
        </Button>

        <RouterLink
          to="/"
          class="underline mt-4 block text-sm text-textMuted hover:text-text"
        >
          {{ $t('login.back') }}
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import Button from '../components/ui/Button.vue'
import { useUserStore, type UserRole } from '../stores/user'

const store = useUserStore()
const router = useRouter()
const route = useRoute()

// ✅ Typisierung der Rollen
const roles = [
  { value: 'buyer', label: 'Buyer' },
  { value: 'setter', label: 'Setter' },
  { value: 'admin', label: 'Admin' }
] as const

const role = ref<UserRole>('buyer')

function select(r: UserRole) {
  role.value = r
}

function login() {
  store.loginMock(role.value)
  const target = (route.query.redirect as string) || '/'
  router.replace(target)
}
</script>
