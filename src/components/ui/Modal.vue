<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, computed } from 'vue'

type Size = 'sm' | 'md' | 'lg'

/**
 * Backwards-compatible Props:
 * - open: boolean           // alte API (read-only)
 * - modelValue: boolean     // neue API für v-model
 * - title, ariaLabel, size, hideClose, persistent
 */
const props = withDefaults(defineProps<{
  open?: boolean
  modelValue?: boolean
  title?: string
  ariaLabel?: string
  size?: Size
  hideClose?: boolean
  persistent?: boolean
}>(), {
  open: undefined,
  modelValue: undefined,
  size: 'md',
  hideClose: false,
  persistent: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'close'): void
}>()

/**
 * Interne „Quelle der Wahrheit“ für den Open-State.
 * - Wenn modelValue definiert => v-model kontrolliert
 * - Sonst fallback auf `open` (alte API)
 */
const isControlled = computed(() => props.modelValue !== undefined)
const isOpen = computed<boolean>({
  get() {
    return isControlled.value ? !!props.modelValue : !!props.open
  },
  set(v: boolean) {
    if (props.persistent && !v && isOpen.value) return
    if (isControlled.value) emit('update:modelValue', v)
    else {
      // Uncontrolled: wir können nicht in Props schreiben; nur „close“ emitten
      if (!v) emit('close')
    }
  }
})

const panelRef = ref<HTMLElement | null>(null)

function requestClose() {
  if (props.persistent) return
  isOpen.value = false
  emit('close')
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') requestClose()
}

watch(() => isOpen.value, (open) => {
  if (open) {
    document.addEventListener('keydown', onKey)
    // rudimentärer Fokus
    setTimeout(() => panelRef.value?.focus(), 0)
    // Scroll lock
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', onKey)
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  if (isOpen.value) {
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
  }
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})

const sizeClass = computed(() => ({
  sm: 'sm:w-[420px]',
  md: 'sm:w-[640px]',
  lg: 'sm:w-[820px]'
}[props.size || 'md']))
</script>

<template>
  <Teleport to="body">
    <Transition name="fade" appear>
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50"
        role="dialog"
        :aria-label="ariaLabel || title"
        aria-modal="true"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          @click="requestClose"
          aria-hidden="true"
        />

        <!-- Panel -->
        <Transition name="scale" appear>
          <div
            v-show="isOpen"
            ref="panelRef"
            tabindex="-1"
            class="absolute inset-x-4 top-16 sm:top-24 mx-auto rounded-2xl border border-border bg-surface p-6 shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
            :class="sizeClass"
          >
            <!-- Header -->
            <div class="mb-3 flex items-center justify-between gap-4">
              <h3 v-if="title" class="font-display text-lg sm:text-xl truncate">{{ title }}</h3>
              <button
                v-if="!hideClose && !persistent"
                class="rounded-lg px-2 py-1 hover:bg-muted"
                @click="requestClose"
                aria-label="Close"
              >✕</button>
            </div>

            <!-- Body -->
            <div class="min-w-0">
              <!-- Falls Slots liefern einen eigenen Titel -->
              <slot name="title" />
              <slot />
            </div>

            <!-- Footer -->
            <div class="mt-4 sm:mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-from, .fade-leave-to { opacity: 0 }
.fade-enter-active, .fade-leave-active { transition: opacity 150ms ease-out }

.scale-enter-from { transform: scale(0.965); opacity: 0 }
.scale-enter-active { transition: transform 180ms ease-out, opacity 180ms ease-out }
.scale-leave-to { transform: scale(0.985); opacity: 0 }
.scale-leave-active { transition: transform 120ms ease-in, opacity 120ms ease-in }
</style>
