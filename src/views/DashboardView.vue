<template>
  <section class="space-y-6">
    <header>
      <h1 class="text-2xl font-display font-semibold tracking-tight">{{ t('nav.dashboard') }}</h1>
      <p class="text-textMuted mt-1">{{ t('dashboard.subtitle') }}</p>
    </header>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="rounded-xl border border-border bg-surface p-4 shadow-card">
        <div class="text-sm text-textMuted">{{ t('dashboard.kpis.leads') }}</div>
        <div class="mt-2 text-2xl font-semibold">128</div>
      </div>
      <div class="rounded-xl border border-border bg-surface p-4 shadow-card">
        <div class="text-sm text-textMuted">{{ t('dashboard.kpis.newLeads') }}</div>
        <div class="mt-2 text-2xl font-semibold">12</div>
      </div>
      <div class="rounded-xl border border-border bg-surface p-4 shadow-card">
        <div class="text-sm text-textMuted">{{ t('dashboard.kpis.conversion') }}</div>
        <div class="mt-2 text-2xl font-semibold">18%</div>
      </div>
      <div class="rounded-xl border border-border bg-surface p-4 shadow-card">
        <div class="text-sm text-textMuted">{{ t('dashboard.kpis.revenue') }}</div>
        <div class="mt-2 text-2xl font-semibold">€ 9.420</div>
      </div>
    </div>

    <!-- zwei Spalten: Tabelle / Aktivitäten -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 rounded-xl border border-border bg-surface p-4 shadow-card">
        <h2 class="text-lg font-display font-semibold">{{ t('dashboard.latestLeads') }}</h2>
        <p class="text-sm text-textMuted mb-4">{{ t('dashboard.latestLeadsHint') }}</p>
        <!-- hier später Tabelle -->
        <div class="text-sm text-textMuted">{{ t('dashboard.placeholderTable') }}</div>
      </div>

      <div class="rounded-xl border border-border bg-surface p-4 shadow-card">
        <h2 class="text-lg font-display font-semibold">{{ t('dashboard.activity') }}</h2>
        <ul class="mt-3 space-y-2 text-sm">
          <li>• {{ t('dashboard.activityItem1') }}</li>
          <li>• {{ t('dashboard.activityItem2') }}</li>
          <li>• {{ t('dashboard.activityItem3') }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n({ useScope: 'global' })
</script>
