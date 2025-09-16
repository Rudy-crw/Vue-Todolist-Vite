import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

//匯出 store
export const useCountStore = defineStore('countStore', () => {
  // State
  const count = ref(1)

  //Getter
  const doubleCount = computed(() => count.value * 2)

  // Action
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
