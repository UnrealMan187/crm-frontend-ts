// src/composables/useTheme.ts
import { ref } from 'vue';

type Theme = 'dark' | 'light';

// Single source of truth im Frontend:
const theme = ref<Theme>((() => {
  // 1) gespeicherte Nutzerwahl
  const saved = localStorage.getItem('theme') as Theme | null;
  if (saved === 'dark' || saved === 'light') return saved;

  // 2) Systempräferenz als Fallback
  const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)').matches;
  return prefersLight ? 'light' : 'dark';
})());

// Sofort aufs <html data-theme="..."> anwenden (noch vor Komponenten-Mount)
document.documentElement.setAttribute('data-theme', theme.value);

function setTheme(next: Theme) {
  theme.value = next;
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark');
}

/**
 * Option für die Zukunft: Primärfarbe dynamisch setzen
 * -> jetzt schon als Hook vorgesehen, derzeit nicht im UI benutzt.
 */
function setPrimary(hex: string) {
  document.documentElement.style.setProperty('--primary', hex);
}

export function useTheme() {
  return {
    theme,
    setTheme,
    toggleTheme,
    // für spätere Modularität vorbereitet:
    setPrimary,
  };
}
