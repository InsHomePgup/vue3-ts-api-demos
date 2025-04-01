// stores/counter.ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  getters: {
    doubleCount(state): number {
      return state.count * 2
    },
    isEven(state): boolean {
      return state.count % 2 === 0
    },
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    },
    setCount(value: number) {
      this.count = value
    },
  },
})
