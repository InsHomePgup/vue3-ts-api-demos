<template>
  <div class="mx-auto h-screen max-w-800px flex flex-col overflow-hidden border border-gray-200 rounded-lg shadow-md">
    <div class="bg-blue-500 p-4 text-center text-white">
      <h2 class="text-xl font-medium">
        聊天记录
      </h2>
    </div>

    <div class="flex-1 overflow-y-auto bg-gray-100 p-4">
      <template v-for="(message, index) in messages" :key="index">
        <!-- 时间戳分隔线 -->
        <div v-if="shouldShowTimestamp(index)" class="my-4 flex justify-center">
          <div class="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600">
            {{ formatTimestamp(message.time) }}
          </div>
        </div>

        <!-- 消息气泡 -->
        <div
          class="mb-5 flex items-center"
          :class="[
            message.isSelf ? 'flex-row-reverse' : 'flex-row',
          ]"
        >
          <!-- 时间戳 - 放在头像左边 -->
          <div class="mx-2 text-xs text-gray-500">
            {{ formatMessageTime(message.time) }}
          </div>

          <!-- 头像 -->
          <div class="mx-2 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
            <img :src="message.avatar" alt="头像" class="h-full w-full object-cover">
          </div>

          <!-- 消息内容 -->
          <div
            class="max-w-70% flex flex-col"
            :class="[
              message.isSelf ? 'items-end' : 'items-start',
            ]"
          >
            <div class="mb-1 text-sm font-bold">
              {{ message.sender }}
            </div>
            <div
              class="max-w-full break-words rounded-lg p-3"
              :class="[
                message.isSelf ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-white rounded-tl-none',
              ]"
            >
              {{ message.content }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

// 聊天记录数据
const messages = [
  {
    id: uuidv4(),
    sender: '张三',
    content: '你好，最近怎么样？',
    time: '2023-11-20 10:30',
    avatar: 'https://placekitten.com/40/40',
    isSelf: false,
  },
  {
    id: uuidv4(),
    sender: '我',
    content: '挺好的，谢谢关心！你呢？',
    time: '2023-11-20 10:32',
    avatar: 'https://placekitten.com/41/41',
    isSelf: true,
  },
  {
    id: uuidv4(),
    sender: '张三',
    content: '我也不错，最近在学习前端开发，特别是Vue 3和TypeScript。',
    time: '2023-11-20 10:35',
    avatar: 'https://placekitten.com/40/40',
    isSelf: false,
  },
  {
    id: uuidv4(),
    sender: '我',
    content: '那很棒啊！Vue 3和TypeScript的组合非常强大。有什么具体的项目在做吗？',
    time: '2023-11-20 10:38',
    avatar: 'https://placekitten.com/41/41',
    isSelf: true,
  },
  {
    id: uuidv4(),
    sender: '张三',
    content: '是的，我正在尝试开发一个聊天应用，就像我们现在使用的这种。想学习如何处理实时数据和用户界面。',
    time: '2023-11-20 10:42',
    avatar: 'https://placekitten.com/40/40',
    isSelf: false,
  },
  {
    id: uuidv4(),
    sender: '我',
    content: '这是个很好的学习项目！如果你有任何问题，可以随时问我。',
    time: '2023-11-20 11:00',
    avatar: 'https://placekitten.com/41/41',
    isSelf: true,
  },
]

// 判断是否需要显示时间戳分隔线
function shouldShowTimestamp(index: number): boolean {
  if (index === 0) {
    return true
  } // 第一条消息总是显示时间戳

  const current = messages[index]
  const prev = messages[index - 1]
  if (!current || !prev) {
    return false
  }

  const currentTime = new Date(current.time)
  const prevTime = new Date(prev.time)

  // 计算时间差（毫秒）
  const timeDiff = currentTime.getTime() - prevTime.getTime()

  // 如果时间差超过15分钟（900000毫秒），则显示时间戳
  return timeDiff > 900000
}

// 格式化时间戳显示
function formatTimestamp(timeStr: string): string {
  const date = new Date(timeStr)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 格式化消息时间显示
function formatMessageTime(timeStr: string): string {
  const date = new Date(timeStr)
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}
</script>
