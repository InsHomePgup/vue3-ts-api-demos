<template>
  <div>
    <!-- 递归终止条件 -->
    <div v-if="!data || data.length === 0">
    </div>
    <!-- 递归渲染 -->
    <div v-else class="flex items-center flex-row">
      <div v-for="(item, index) in data" :key="index">
        {{ item.name }}
        <Card02 v-if="item.children" :data="item.children" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface inputItem {
  name: string
  id: string
  children: inputItem[]
}

interface listDataItem {
  title: string
  list: inputItem[]
}
interface propType {
  listData: listDataItem[]
}
const props = withDefaults(defineProps<propType>(), {})
</script>

<style scoped>
/* 添加一些基本样式 */
div {
    margin-left: 20px;
    padding: 5px;
    border-left: 1px solid #ccc;
}
</style>
