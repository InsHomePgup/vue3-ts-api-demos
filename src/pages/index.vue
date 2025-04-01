<template>
  <div>
    home page
    <div>{{ countStore.count }}</div>
    <button @click="countStore.increment">
      +
    </button>
    <div class="w-10 h-10 bg-blue-500"></div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const countStore = useCounterStore()
</script>

<style scoped>

</style>
