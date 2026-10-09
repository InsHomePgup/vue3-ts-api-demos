<template>
  <div class="page">
    <h2>Composable / provide-inject</h2>

    <h3>useToggle（返回元组）</h3>
    <button @click="toggleOpen()">
      {{ open ? '关闭' : '打开' }}
    </button>

    <h3>useAsyncData&lt;T&gt;（泛型 composable）</h3>
    <button :disabled="loading" @click="execute">
      {{ loading ? '加载中...' : '加载用户' }}
    </button>
    <p v-if="error">
      出错：{{ error.message }}
    </p>
    <ul v-if="data">
      <li v-for="u in data" :key="u.id">
        {{ u.name }}
      </li>
    </ul>

    <h3>provide / inject（InjectionKey）</h3>
    <ThemeConsumer />
  </div>
</template>

<script setup lang="ts">
import type { Theme, User } from '@/components/ts-vue/types'
import { provide, ref } from 'vue'
import { ThemeKey } from '@/components/ts-vue/injection-keys'
import ThemeConsumer from '@/components/ts-vue/ThemeConsumer.vue'
import { useAsyncData } from '@/composables/useAsyncData'
import { useToggle } from '@/composables/useToggle'

// 1. 元组解构：open 是 Ref<boolean>，toggleOpen 是函数
// 1. Tuple destructuring: open is Ref<boolean>, toggleOpen is a function
const [open, toggleOpen] = useToggle()

// 2. T 由 fetcher 的返回值推断为 User[]，所以 data 是 Ref<User[] | null>
// 2. T is inferred as User[] from the fetcher's return value, so data is Ref<User[] | null>
const { data, error, loading, execute } = useAsyncData(
  () => new Promise<User[]>((resolve) => {
    setTimeout(resolve, 500, [{ id: 1, name: '张三' }, { id: 2, name: '李四' }])
  }),
)

// 3. provide 的值必须符合 ThemeKey 绑定的 ThemeContext，写错会直接报错
// 3. The provided value must match the ThemeContext bound to ThemeKey; mistakes error out immediately
const theme = ref<Theme>('light')
provide(ThemeKey, {
  theme,
  toggle: () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  },
})
</script>

<style scoped>
.page {
  padding: 16px;
}
</style>
