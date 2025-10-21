<template>
  <section class="space-y-10">
    <header class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div>
        <h1 class="text-3xl font-display font-semibold tracking-tight">
          {{ t('market.title') }}
        </h1>
        <p class="text-textMuted mt-2 text-base">
          {{ t('market.subtitle') }}
        </p>
      </div>
    </header>

    <!-- Kategorien -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      <div
        v-for="category in categories"
        :key="category.id"
        class="rounded-2xl border border-border bg-surface p-6 shadow-sm hover:shadow-lg transition duration-200 ease-out"
      >
        <div class="flex items-start justify-between">
          <div>
            <h2 class="text-xl font-semibold text-text">{{ category.name }}</h2>
            <p class="text-sm text-textMuted mt-1">{{ category.blurb }}</p>
          </div>
          <span class="rounded-full bg-primary/10 text-primary-100 text-xs px-3 py-1 font-medium">
            {{ t('market.pricePerLead') }}: {{ category.leadPrice }} €
          </span>
        </div>

        <!-- Tiers -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
          <div
            v-for="tier in category.tiers"
            :key="tier.id"
            class="rounded-xl border border-border bg-muted/10 p-4 hover:bg-muted/20 transition"
          >
            <div class="text-sm font-semibold uppercase tracking-wide text-textMuted">
              {{ t('market.package') }} {{ tier.id }}
            </div>
            <div class="text-xs text-textMuted mb-1">
              {{ t('market.leads') }}: {{ tier.leads }}
            </div>

            <div class="text-2xl font-bold mt-2">
              {{ calcTotal(category.leadPrice, tier.leads) }} €
            </div>

            <div v-if="tier.discountNote" class="mt-2">
              <span class="inline-block rounded-full bg-primary/10 text-primary-100 text-xs px-2 py-1">
                {{ tier.discountNote }}
              </span>
            </div>

            <Button class="mt-4 w-full" @click="openDetails(category, tier)">
              {{ t('market.select') }}
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail-Modal -->
    <div v-if="active" class="fixed inset-0 z-40">
      <div class="absolute inset-0 bg-black/50" @click="closeModal" aria-hidden="true"></div>

      <div
        class="absolute inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-16 sm:top-24
               w-auto sm:w-[640px] rounded-2xl border border-border bg-surface p-6 shadow-2xl"
        role="dialog" aria-modal="true"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="text-xl font-display font-semibold">
              {{ detail.title || t('modal.title') }}
            </h3>
            <p class="text-sm text-textMuted mt-1">
              {{ detail.description }}
            </p>
          </div>
          <button class="rounded-lg px-2 py-1 hover:bg-muted" @click="closeModal" :aria-label="t('modal.close')">
            ✕
          </button>
        </div>

        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-2">
            <div class="text-sm text-textMuted">
              {{ t('market.package') }}:
              <span class="font-medium">{{ active?.tier.id }}</span>
            </div>
            <div class="text-sm text-textMuted">
              {{ t('market.leads') }}:
              <span class="font-medium">{{ active?.tier.leads }}</span>
            </div>
            <div class="text-sm text-textMuted">
              {{ t('modal.priceLead') }}:
              <span class="font-medium">{{ active?.category.leadPrice }} €</span>
            </div>
            <div class="text-xl font-semibold mt-2">
              {{ totalPrice }} €
            </div>
          </div>

          <ul class="space-y-2 text-sm">
            <li v-for="(b, idx) in detail.bullets" :key="idx" class="flex items-start gap-2">
              <span class="mt-1 inline-block">•</span>
              <span>{{ b }}</span>
            </li>
          </ul>
        </div>

        <div class="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <Button @click="confirmAdd" class="sm:w-auto w-full">
            {{ t('modal.addToCart') }}
          </Button>
          <Button variant="secondary" @click="closeModal" class="sm:w-auto w-full">
            {{ t('modal.close') }}
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from '../components/ui/Button.vue'
import { packageCatalog, type PackageCategory, type Tier, calcTotal } from '../data/packages'
import { findPackageDetail } from '../data/packageDetails'
import { useCartStore } from '../stores/cart'

const { t } = useI18n()

const categories = packageCatalog as readonly PackageCategory[]

const cart = useCartStore()

type ActiveSelection = { category: PackageCategory; tier: Tier } | null
const active = ref<ActiveSelection>(null)

const detail = computed(() =>
  active.value
    ? findPackageDetail(active.value.category.id, active.value.tier.id)
    : { title: '', description: '', bullets: [] }
)

const totalPrice = computed(() =>
  active.value ? calcTotal(active.value.category.leadPrice, active.value.tier.leads) : 0
)

function openDetails(category: PackageCategory, tier: Tier) {
  active.value = { category, tier }
}

function closeModal() {
  active.value = null
}

function confirmAdd() {
  if (!active.value) return
  const { category, tier } = active.value

  // ⬇️ Kein 'id' mitsenden – Store erzeugt die ID
  cart.add({
    categoryId: category.id,
    categoryName: category.name,
    tierId: tier.id,
    tierLabel: `Paket ${tier.id}`,
    leads: tier.leads,
    leadPrice: category.leadPrice,
    total: calcTotal(category.leadPrice, tier.leads)
  })

  closeModal()
}
</script>
