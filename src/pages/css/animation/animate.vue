<template>
  <div class="container mx-auto max-w-4xl p-10">
    <h1 class="mb-8 text-3xl font-bold">
      UnoCSS Preset Animations Demo
    </h1>

    <p class="mb-8 text-gray-600">
      Using <code>unocss-preset-animations</code> (a port of tailwindcss-animate).
      This allows composable animations!
    </p>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <!-- 1. Fade In -->
      <div class="demo-card">
        <h3 class="mb-4 font-bold">
          Fade In
        </h3>
        <div class="flex gap-4">
          <div
            v-if="toggle"
            class="box animate-in duration-1000 fade-in"
          >
            Fade In
          </div>
        </div>
      </div>

      <!-- 2. Zoom In -->
      <div class="demo-card">
        <h3 class="mb-4 font-bold">
          Zoom In
        </h3>
        <div class="flex gap-4">
          <div
            v-if="toggle"
            class="box animate-in duration-500 delay-200 zoom-in"
          >
            Zoom In
          </div>
        </div>
      </div>

      <!-- 3. Slide In from Bottom -->
      <div class="demo-card">
        <h3 class="mb-4 font-bold">
          Slide In (Bottom)
        </h3>
        <div class="flex gap-4">
          <div
            v-if="toggle"
            class="box animate-in duration-700 fade-in slide-in-from-bottom-8"
          >
            Slide Up
          </div>
        </div>
      </div>

      <!-- 4. Spin (Infinite) -->
      <div class="demo-card">
        <h3 class="mb-4 font-bold">
          Spin (Infinite)
        </h3>
        <div class="flex gap-4">
          <!-- animate-spin is from preset-uno, but composed here -->
          <div class="box animate-spin rounded-full from-blue-500 to-purple-500 bg-gradient-to-r">
            Wait
          </div>
        </div>
      </div>

      <!-- 5. Bounce -->
      <div class="demo-card">
        <h3 class="mb-4 font-bold">
          Bounce
        </h3>
        <div class="flex gap-4">
          <div class="box animate-bounce">
            Boing
          </div>
        </div>
      </div>

      <!-- 6. Complex Composition -->
      <div class="demo-card">
        <h3 class="mb-4 font-bold">
          Complex Composition
        </h3>
        <p class="mb-2 text-xs text-gray-500">
          zoom-in + slide-in-from-left + spin-in
        </p>
        <div class="flex gap-4">
          <div
            v-if="toggle"
            class="box animate-in duration-1000 ease-out zoom-in spin-in-90 slide-in-from-left-10"
          >
            Combo
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10 flex justify-center">
      <button
        class="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
        @click="toggle = !toggle"
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
