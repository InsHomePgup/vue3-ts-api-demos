<template>
  <div>
    home page
    <div>{{ countStore.count }}</div>
    <button @click="countStore.increment">
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter.ts'

const countStore = useCounterStore()
console.log('导入的store-----', countStore)
</script>

<style scoped>

</style>
