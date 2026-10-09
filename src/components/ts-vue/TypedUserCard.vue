<template>
  <div class="user-card">
    <header>
      <slot name="header" :user="user">
        {{ user.name }}
      </slot>
    </header>
    <p>{{ user.name }}，{{ age }} 岁</p>
    <input
      ref="input"
      v-model="keyword"
      placeholder="v-model（defineModel）"
      @change="emit('rename', keyword, user.name)"
    >
    <button @click="emit('select', user.id)">
      选择
    </button>
    <button @click="count++">
      count: {{ count }}
    </button>
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { User } from './types'
import { useTemplateRef } from 'vue'

// 1. Props：纯类型声明
//    Vue 3.5+ 支持响应式解构并直接写默认值（旧写法：withDefaults(defineProps<Props>(), { age: 18 })）
interface Props {
  user: User
  age?: number
}
const { user, age = 18 } = defineProps<Props>()

// 2. Emits：具名元组语法，参数名会出现在父组件的事件提示里
const emit = defineEmits<{
  select: [id: number]
  rename: [name: string, oldName: string]
}>()

// 3. Slots：约束插槽名称和作用域参数的类型
defineSlots<{
  default?: () => any
  header?: (props: { user: User }) => any
}>()

// 4. v-model：defineModel 返回 ref，泛型指定类型
const keyword = defineModel<string>({ default: '' }) // v-model
const count = defineModel<number>('count', { default: 0 }) // v-model:count

// 5. 暴露给父组件的方法：父组件通过 InstanceType<typeof 组件> 得到类型
const inputRef = useTemplateRef<HTMLInputElement>('input')

function focus(): void {
  inputRef.value?.focus()
}

function reset(): void {
  keyword.value = ''
  count.value = 0
}

defineExpose({ focus, reset })
</script>

<style scoped>
.user-card {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
</style>
