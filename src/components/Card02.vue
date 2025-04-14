<template>
  <div>
    <!-- 递归终止条件 -->
    <div v-if="!data || data.length === 0">
      无子项
    </div>
    <!-- 递归渲染 -->
    <div v-else>
      <div v-for="(item, index) in data" :key="index">
        {{ item.name }}
        <Card02 v-if="item.children" :data="item.children" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Item {
  name: string
  children?: Item[]
}

const { data } = defineProps<{
  data?: Item[]
}>()

console.log(data)
</script>

<style scoped>
/* 添加一些基本样式 */
div {
  margin-left: 20px;
  padding: 5px;
  border-left: 1px solid #ccc;
}
</style>
