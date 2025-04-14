<template>
  <div class="flex flex-col min-h-screen font-sans">
    <header class="bg-blue-500 text-white text-center py-4">
      <h1 class="text-xl font-bold">
        响应式布局示例
      </h1>
      <div class="py-1 px-2 rounded mt-2" :class="isMobile ? 'bg-red-500' : 'bg-green-500'">
        当前设备: {{ isMobile ? '移动端' : 'PC端' }}
      </div>
    </header>

    <main class="flex flex-col flex-1 p-4 md:flex-row">
      <section class="flex-1 gap-4 grid" :class="isMobile ? 'grid-cols-1' : 'grid-cols-3'">
        <div
          v-for="i in 3"
          :key="i"
          class="p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
        >
          <h3 class="font-medium">
            功能 {{ i }}
          </h3>
          <p class="text-gray-600">
            这是一个响应式卡片内容
          </p>
        </div>
      </section>

      <aside v-if="!isMobile" class="p-4 rounded-lg bg-gray-100 w-64 ml-4">
        <h3 class="font-medium">
          侧边栏
        </h3>
        <p class="text-gray-600">
          仅在PC端显示
        </p>
      </aside>
    </main>

    <footer class="text-white text-center py-4 bg-gray-800">
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
