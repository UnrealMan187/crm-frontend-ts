<template>
    <span :class="classes" class="inline-flex items-center rounded-full px-2 py-0.5 text-xs">
      {{ label }}
    </span>
  </template>
  
  <script setup lang="ts">
  import type { LeadStatus } from '../../types/lead';
  const props = defineProps<{ status: LeadStatus }>();
  
  const map: Record<LeadStatus, {label:string; cls:string}> = {
    neu:          { label: 'Neu',          cls: 'bg-primary-100/15 text-primary-100 border-primary-100/30' },
    kontaktiert:  { label: 'Kontaktiert',  cls: 'bg-muted text-text border-border' },
    erneut:       { label: 'Erneut',       cls: 'bg-muted text-text border-border' },
    erinnerung:   { label: 'Erinnerung',   cls: 'bg-yellow-500/15 text-yellow-400 border-yellow-400/30' },
    termin:       { label: 'Termin',       cls: 'bg-blue-500/15 text-blue-400 border-blue-400/30' },
    angebot:      { label: 'Angebot',      cls: 'bg-indigo-500/15 text-indigo-400 border-indigo-400/30' },
    gewonnen:     { label: 'Gewonnen',     cls: 'bg-green-500/15 text-green-400 border-green-400/30' },
    verloren:     { label: 'Verloren',     cls: 'bg-red-500/15 text-red-400 border-red-400/30' },
  };
  const label = map[props.status].label;
  const classes = `border ${map[props.status].cls}`;
  </script>
  