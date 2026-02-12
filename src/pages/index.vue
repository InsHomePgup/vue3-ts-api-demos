<template>
  <div class="container">
    <header class="header">
      <h1>Demo Pages Index</h1>
      <div class="counter-demo">
        <span>Counter: {{ countStore.count }}</span>
        <button @click="countStore.increment" class="btn">+</button>
      </div>
    </header>

    <div class="route-list">
      <div v-for="route in availableRoutes" :key="route.path" class="route-item">
        <router-link :to="route.path" class="route-link">
          {{ route.name || route.path }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const countStore = useCounterStore()
const router = useRouter()

const availableRoutes = computed(() => {
  return router.getRoutes()
    .filter(route => 
      // Filter out the home page ("/") and internal routes
      route.path !== '/' && 
      !route.path.includes(':') && // Exclude dynamic routes if needed, or keep them
      !route.redirect // Exclude redirect routes
    )
    .sort((a, b) => a.path.localeCompare(b.path))
})
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}

.counter-demo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
}

.btn {
  padding: 4px 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #2563eb;
  }
}

.route-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.route-item {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s;
  
  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
}

.route-link {
  display: block;
  padding: 16px;
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  word-break: break-all;
  
  &:hover {
    color: #2563eb;
  }
}
</style>
