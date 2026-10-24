<template>
  <div class="page">
    <h2>Props / Emits / v-model / Slots / Expose</h2>

    <TypedUserCard
      ref="card"
      v-model="keyword"
      v-model:count="count"
      :user="user"
      :age="20"
      @select="onSelect"
      @rename="onRename"
    >
      <template #header="{ user: u }">
        ⭐ {{ u.name }}
      </template>
      默认插槽内容
    </TypedUserCard>

    <p>父组件拿到的 v-model：{{ keyword }}，count：{{ count }}，最近选择：{{ selectedId }}</p>
    <button @click="focusCard">
      调用子组件 focus()
    </button>
    <button @click="resetCard">
      调用子组件 reset()
    </button>

    <h3>泛型组件 TypedList</h3>
    <!-- T 根据 items 推断为 User，onPick 的参数和插槽里的 item 都是 User
         T is inferred as User from items; both the onPick param and the slot's item are User -->
    <TypedList :items="users" @select="onPick">
      <template #default="{ item }">
        {{ item.name }}（{{ item.age ?? '未知' }}）
      </template>
    </TypedList>
    <p>点击的用户：{{ picked?.name ?? '无' }}</p>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/components/ts-vue/types'
import { ref, useTemplateRef } from 'vue'
import TypedList from '@/components/ts-vue/TypedList.vue'
import TypedUserCard from '@/components/ts-vue/TypedUserCard.vue'

const user: User = { id: 1, name: '张三' }
const users = ref<User[]>([
  { id: 1, name: '张三', age: 20 },
  { id: 2, name: '李四' },
])

const keyword = ref('')
const count = ref(0)
const selectedId = ref<number | null>(null)
const picked = ref<User | null>(null)

// 事件处理函数的参数类型，来自子组件 defineEmits 的声明
// Handler param types come from the child's defineEmits declaration
function onSelect(id: number): void {
  selectedId.value = id
}

function onRename(name: string, oldName: string): void {
  console.log(`${oldName} -> ${name}`)
}

function onPick(item: User): void {
  picked.value = item
}

// 拿到子组件实例：InstanceType<typeof 组件> 带有 defineExpose 暴露的方法
// Get the child instance: InstanceType<typeof Component> includes methods exposed via defineExpose
const cardRef = useTemplateRef<InstanceType<typeof TypedUserCard>>('card')

function focusCard(): void {
  cardRef.value?.focus()
}

function resetCard(): void {
  cardRef.value?.reset()
}
</script>

<style scoped>
.page {
  padding: 16px;
}
</style>
