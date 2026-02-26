<template>
  <div class="container p-10 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">UnoCSS Preset Animations Demo</h1>
    
    <p class="mb-8 text-gray-600">
      Using <code>unocss-preset-animations</code> (a port of tailwindcss-animate).
      This allows composable animations!
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 1. Fade In -->
      <div class="demo-card">
        <h3 class="font-bold mb-4">Fade In</h3>
        <div class="flex gap-4">
          <div 
            v-if="toggle"
            class="box animate-in fade-in duration-1000"
          >
            Fade In
          </div>
        </div>
      </div>

      <!-- 2. Zoom In -->
      <div class="demo-card">
        <h3 class="font-bold mb-4">Zoom In</h3>
        <div class="flex gap-4">
          <div 
            v-if="toggle"
            class="box animate-in zoom-in duration-500 delay-200"
          >
            Zoom In
          </div>
        </div>
      </div>

      <!-- 3. Slide In from Bottom -->
      <div class="demo-card">
        <h3 class="font-bold mb-4">Slide In (Bottom)</h3>
        <div class="flex gap-4">
          <div 
            v-if="toggle"
            class="box animate-in slide-in-from-bottom-8 fade-in duration-700"
          >
            Slide Up
          </div>
        </div>
      </div>

      <!-- 4. Spin (Infinite) -->
      <div class="demo-card">
        <h3 class="font-bold mb-4">Spin (Infinite)</h3>
        <div class="flex gap-4">
          <!-- animate-spin is from preset-uno, but composed here -->
          <div class="box rounded-full animate-spin bg-gradient-to-r from-blue-500 to-purple-500">
            Wait
          </div>
        </div>
      </div>

      <!-- 5. Bounce -->
      <div class="demo-card">
        <h3 class="font-bold mb-4">Bounce</h3>
        <div class="flex gap-4">
          <div class="box animate-bounce">
            Boing
          </div>
        </div>
      </div>

      <!-- 6. Complex Composition -->
      <div class="demo-card">
        <h3 class="font-bold mb-4">Complex Composition</h3>
        <p class="text-xs text-gray-500 mb-2">zoom-in + slide-in-from-left + spin-in</p>
        <div class="flex gap-4">
          <div 
            v-if="toggle"
            class="box animate-in zoom-in slide-in-from-left-10 spin-in-90 duration-1000 ease-out"
          >
            Combo
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10 flex justify-center">
      <button 
        @click="toggle = !toggle"
        class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Re-run Animations
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const toggle = ref(true)

// Simple reset logic to re-trigger enter animations
watch(toggle, (val) => {
  if (!val) {
    setTimeout(() => {
      toggle.value = true
    }, 100)
  }
})
</script>

<style scoped>
.demo-card {
  @apply p-6 border rounded-lg bg-white shadow-sm;
}

.box {
  @apply w-24 h-24 flex items-center justify-center bg-indigo-500 text-white font-bold rounded shadow-md;
}
</style>