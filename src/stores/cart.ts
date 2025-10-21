import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type CartItem = {
  id: string
  categoryId: 'handwerk' | 'finanzen' | 'energie' | 'dienstleistungen'
  categoryName: string
  tierId: 'S' | 'M' | 'L'
  tierLabel: string
  leads: number
  leadPrice: number
  total: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const count = computed(() => items.value.length)
  const subtotal = computed(() =>
    items.value.reduce((sum, it) => sum + it.total, 0)
  )

  function add(payload: Omit<CartItem, 'id'>) {
    const id = `${payload.categoryId}-${payload.tierId}-${Date.now()}`
    items.value.push({ id, ...payload })
  }

  function remove(id: string) {
    items.value = items.value.filter((it) => it.id !== id)
  }

  function clear() {
    items.value = []
  }

  return { items, count, subtotal, add, remove, clear }
})
