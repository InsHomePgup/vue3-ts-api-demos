<template>
  <div class="min-h-screen flex flex-col font-sans">
    <header class="bg-blue-500 py-4 text-center text-white">
      <h1 class="text-xl font-bold">
        响应式布局示例
      </h1>
      <div class="mt-2 rounded px-2 py-1" :class="isMobile ? 'bg-red-500' : 'bg-green-500'">
        当前设备: {{ isMobile ? '移动端' : 'PC端' }}
      </div>
    </header>

    <main class="flex flex-1 flex-col p-4 md:flex-row">
      <section class="grid flex-1 gap-4" :class="isMobile ? 'grid-cols-1' : 'grid-cols-3'">
        <div
          v-for="i in 3"
          :key="i"
          class="border border-gray-200 rounded-lg bg-white p-4 shadow-sm"
        >
          <h3 class="font-medium">
            功能 {{ i }}
          </h3>
          <p class="text-gray-600">
            这是一个响应式卡片内容
          </p>
        </div>
      </section>

      <aside v-if="!isMobile" class="ml-4 w-64 rounded-lg bg-gray-100 p-4">
        <h3 class="font-medium">
          侧边栏
        </h3>
        <p class="text-gray-600">
          仅在PC端显示
        </p>
      </aside>
    </main>

    <footer class="bg-gray-800 py-4 text-center text-white">
      <p>© 2023 响应式布局示例</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const isMobile = ref(false)

function checkScreenSize() {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>
