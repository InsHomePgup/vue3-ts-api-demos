<template>
  <div>
    <InputCard :data="testData" />
    <ThreeLevelSelector v-model="selectorData" />
  </div>
</template>

<script setup lang="ts">
import ThreeLevelSelector from '@/components/ThreeLevelSelector.vue'

const testData = [
  {
    id: 'root',
    name: 'Root',
    children: [
      {
        id: 'child1',
        name: 'Child 1',
        children: [
          {
            id: 'grandchild1',
            name: 'Grandchild 1',
            children: [],
          },
          {
            id: 'grandchild2',
            name: 'Grandchild 2',
            children: [],
          },
        ],
      },
      {
        id: 'child2',
        name: 'Child 2',
        children: [],
      },
    ],
  },
]

const selectorData = ref([testData[0]])

const listData = [
  {
    title: '一级选项',
    list: [
      {
        name: '选项名称A-1',
        children: [
          {
            name: '选项名称A-1-1',
            children: [
              {
                name: '选项名称A-1-1',
              },
            ],
          },
        ],
      },
    ],
  },
]
</script>

<style scoped>

</style>
