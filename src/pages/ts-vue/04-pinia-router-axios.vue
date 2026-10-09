<template>
  <div class="page">
    <h2>Pinia / Vue Router / Axios</h2>

    <h3>Pinia（setup store）</h3>
    <input v-model="title" placeholder="待办标题" @keyup.enter="onAdd">
    <button @click="onAdd">
      添加
    </button>
    <p>已完成 {{ doneCount }} / {{ todos.length }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="toggle(todo.id)">
        {{ todo.done ? '✅' : '⬜' }} {{ todo.title }}
      </li>
    </ul>

    <h3>Vue Router</h3>
    <p>path: {{ route.path }}，tab: {{ tab }}</p>
    <button @click="goToTab('a')">
      ?tab=a
    </button>
    <button @click="goToTab('b')">
      ?tab=b
    </button>
    <button @click="goToProps">
      跳转到 01-props-emits
    </button>

    <h3>Axios（泛型响应）</h3>
    <button @click="load">
      请求 /users
    </button>
    <ul>
      <li v-for="u in users" :key="u.id">
        {{ u.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/components/ts-vue/types'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUsers } from '@/api/users'
import { useTodoStore } from '@/stores/todo'

// ---------- Pinia ----------
const store = useTodoStore()
// 状态和 getter 要用 storeToRefs 才能解构且保持响应式；action 直接解构即可
// State and getters need storeToRefs to be destructured while staying reactive; actions can be destructured directly
const { todos, doneCount } = storeToRefs(store)
const { add, toggle } = store

const title = ref('')
function onAdd(): void {
  if (title.value.trim()) {
    add(title.value.trim())
    title.value = ''
  }
}

// ---------- Vue Router ----------
const route = useRoute()
const router = useRouter()

// route.query 的值可能是 string | string[] | null，要先收窄
// route.query values may be string | string[] | null; narrow first
const tab = computed(() => {
  // eslint-disable-next-line dot-notation
  const value = route.query['tab'] // noPropertyAccessFromIndexSignature 要求索引签名属性用方括号 | noPropertyAccessFromIndexSignature requires bracket access for index-signature properties
  return typeof value === 'string' ? value : '无'
})

function goToTab(name: 'a' | 'b'): void {
  router.push({ query: { tab: name } })
}

// 开启类型化路由后（typed-router.d.ts），也可以用 router.push({ name: '/ts-vue/01-props-emits' })，路由名有提示
// With typed routes enabled (typed-router.d.ts), you can also use router.push({ name: '/ts-vue/01-props-emits' }) with route-name hints
function goToProps(): void {
  router.push('/ts-vue/01-props-emits')
}

// ---------- Axios ----------
// getUsers 内部用 request<User[]> 解包了统一响应，这里直接拿到 User[]
// getUsers unwraps the unified response via request<User[]> internally, so User[] is obtained directly here
const users = ref<User[]>([])
async function load(): Promise<void> {
  users.value = await getUsers()
}
</script>

<style scoped>
.page {
  padding: 16px;
}
</style>
