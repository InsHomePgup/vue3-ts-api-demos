<template>
  <div>
    <h2>事件循环测试</h2>
    <button @click="testEventLoop">
      开始测试
    </button>
    <div class="results">
      <p v-for="(log, index) in logs" :key="index">
        {{ log }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const logs = ref<string[]>([])

function addLog(message: string) {
  logs.value.push(`${logs.value.length + 1}. ${message}`)
}

async function testEventLoop() {
  // 清空之前的日志
  logs.value = []

  console.log('开始测试事件循环')
  addLog('开始测试事件循环')

  // 同步代码
  addLog('同步代码执行')

  // 注册宏任务 (setTimeout)
  setTimeout(() => {
    addLog('第一个宏任务 (setTimeout) 执行')

    // 在宏任务中注册微任务
    Promise.resolve().then(() => {
      addLog('宏任务中的微任务执行')
    })
  }, 1000)

  // 注册微任务 (Promise)
  Promise.resolve().then(() => {
    addLog('第一个微任务执行')

    // 在微任务中注册新的微任务
    Promise.resolve().then(() => {
      addLog('微任务中的微任务执行')
    })
  })

  // 使用 async/await
  await Promise.resolve()
  addLog('async/await 后的代码执行')

  // 注册第二个宏任务
  setTimeout(() => {
    addLog('第二个宏任务执行')
  }, 1000)

  addLog('同步代码执行完毕')
}
</script>

<style scoped>
.results {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin: 10px 0;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
