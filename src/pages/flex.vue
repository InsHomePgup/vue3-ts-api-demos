<template>
  <div class="flex flex-col h-screen max-w-800px mx-auto border border-gray-200 rounded-lg overflow-hidden shadow-md">
    <!-- 聊天头部 -->
    <div class="flex items-center p-4 bg-blue-500 text-white">
      <h2 class="text-xl font-medium">
        聊天记录
      </h2>
    </div>

    <!-- 聊天消息区域 -->
    <div class="p-4 flex flex-col flex-1 overflow-y-auto bg-gray-100 gap-4">
      <!-- 使用v-for遍历聊天记录 -->
      <div
        v-for="(message, index) in chatMessages"
        :key="index"
        class="flex gap-2 max-w-80%"
        :class="message.isSelf ? 'self-end' : ''"
      >
        <!-- 对方头像 (仅在非自己发送的消息显示在左侧) -->
        <div v-if="!message.isSelf" class="overflow-hidden w-10 h-10 rounded-full flex-shrink-0">
          <img :src="message.avatar" alt="头像" class="w-full h-full object-cover">
        </div>

        <!-- 消息内容 -->
        <div class="flex flex-col" :class="message.isSelf ? 'items-end' : ''">
          <div class="text-sm text-gray-600">
            {{ message.sender }}
          </div>
          <div
            class="rounded-lg p-3 shadow-sm mt-1"
            :class="message.isSelf ? 'bg-blue-500 text-white' : 'bg-white'"
          >
            {{ message.content }}
          </div>
          <div class="mt-1 text-xs text-gray-500">
            {{ message.time }}
          </div>
        </div>

        <!-- 自己的头像 (仅在自己发送的消息显示在右侧) -->
        <div v-if="message.isSelf" class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <img :src="message.avatar" alt="头像" class="w-full h-full object-cover">
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="flex p-4 border-gray-200 border-t bg-white">
      <input
        v-model="newMessage"
        type="text"
        placeholder="输入消息..."
        class="flex-1 border px-4 py-2 border-gray-300 rounded-l-lg focus:outline-none"
        @keyup.enter="sendMessage"
      >
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        @click="sendMessage"
      >
        发送
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 聊天记录数据
const chatMessages = ref([
  {
    sender: '张三',
    content: '你好，最近怎么样？',
    time: '10:30',
    avatar: 'https://placekitten.com/40/40',
    isSelf: false,
  },
  {
    sender: '我',
    content: '挺好的，谢谢关心！你呢？',
    time: '10:32',
    avatar: 'https://placekitten.com/41/41',
    isSelf: true,
  },
  {
    sender: '张三',
    content: '我也不错，最近在学习前端开发，特别是Flex布局。',
    time: '10:35',
    avatar: 'https://placekitten.com/40/40',
    isSelf: false,
  },
  {
    sender: '我',
    content: 'Flex布局很实用，加油！',
    time: '10:36',
    avatar: 'https://placekitten.com/41/41',
    isSelf: true,
  },
])

// 新消息输入
const newMessage = ref('')

// 发送消息方法
function sendMessage() {
  if (newMessage.value.trim()) {
    // 添加新消息到列表
    chatMessages.value.push({
      sender: '我',
      content: newMessage.value,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      avatar: 'https://placekitten.com/41/41',
      isSelf: true,
    })

    // 清空输入框
    newMessage.value = ''

    // 模拟对方回复
    setTimeout(() => {
      chatMessages.value.push({
        sender: '张三',
        content: '收到你的消息了！',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        avatar: 'https://placekitten.com/40/40',
        isSelf: false,
      })
    }, 1000)
  }
}
</script>

<style scoped>
/* 可以添加一些UnoCSS无法直接实现的自定义样式 */
</style>
