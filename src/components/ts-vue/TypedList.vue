<template>
  <ul>
    <li v-for="item in items" :key="item.id" @click="emit('select', item)">
      <slot :item="item">
        {{ item.id }}
      </slot>
    </li>
  </ul>
</template>

<!-- 泛型组件：generic 属性声明类型参数，T 会在使用处根据 items 自动推断 -->
<script setup lang="ts" generic="T extends { id: number | string }">
defineProps<{
  items: T[]
}>()

const emit = defineEmits<{
  select: [item: T]
}>()

defineSlots<{
  default?: (props: { item: T }) => any
}>()
</script>
