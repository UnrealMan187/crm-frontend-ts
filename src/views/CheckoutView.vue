<template>
    <section class="space-y-6">
      <header class="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 class="text-2xl font-display font-semibold tracking-tight">{{ t('cart.title') }}</h1>
          <p class="text-textMuted mt-1">{{ t('cart.subtitle') }}</p>
        </div>
  
        <div class="flex items-center gap-2">
          <Button variant="ghost" @click="clear" v-if="count > 0">{{ t('cart.clear') }}</Button>
          <RouterLink to="/marketplace" class="text-sm underline">{{ t('cart.backToMarket') }}</RouterLink>
        </div>
      </header>
  
      <div v-if="count === 0" class="rounded-2xl border border-border bg-surface p-8 text-center text-textMuted">
        {{ t('cart.empty') }}
      </div>
  
      <div v-else class="rounded-2xl border border-border bg-surface p-4 sm:p-6">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="text-left text-textMuted">
              <tr class="border-b border-border">
                <th class="py-2 pr-3">{{ t('cart.category') }}</th>
                <th class="py-2 px-3">{{ t('cart.tier') }}</th>
                <th class="py-2 px-3">{{ t('cart.leads') }}</th>
                <th class="py-2 px-3">{{ t('cart.pricePerLead') }}</th>
                <th class="py-2 px-3">{{ t('cart.total') }}</th>
                <th class="py-2 pl-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="it in items" :key="it.id" class="border-b border-border/60">
                <td class="py-3 pr-3 font-medium">{{ it.categoryName }}</td>
                <td class="py-3 px-3">{{ it.tierId }}</td>
                <td class="py-3 px-3">{{ it.leads }}</td>
                <td class="py-3 px-3">€ {{ it.leadPrice }}</td>
                <td class="py-3 px-3 font-semibold">€ {{ it.total }}</td>
                <td class="py-3 pl-3 text-right">
                  <Button variant="ghost" size="sm" @click="remove(it.id)">{{ t('cart.remove') }}</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="mt-6 flex items-center justify-end gap-4">
          <div class="text-sm text-textMuted">{{ t('cart.subtotal') }}</div>
          <div class="text-xl font-semibold">€ {{ subtotal }}</div>
          <Button @click="proceed">{{ t('cart.proceed') }}</Button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useCartStore } from '../stores/cart'
  import Button from '../components/ui/Button.vue'
  import { useRouter } from 'vue-router'
  
  const { t } = useI18n({ useScope: 'global' })
  const cart = useCartStore()
  const router = useRouter()
  
  const items = cart.items
  const count = cart.count
  const subtotal = cart.subtotal
  
  function remove(id: string) { cart.remove(id) }
  function clear() { cart.clear() }
  function proceed() {
    // MVP: nur Hinweis. Später: Checkout/Stripe.
    alert(t('cart.proceedHint') as string)
    // router.push('/checkout/payment') // später
  }
  </script>
  