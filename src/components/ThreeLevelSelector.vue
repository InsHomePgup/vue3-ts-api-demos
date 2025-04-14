<template>
  <div class="flex p-4 gap-4">
    <LevelCard
      v-model="level1Data"
      title="一级选项"
      @update:model-value="handleLevel1Update"
    />
    <LevelCard
      v-model="level2Data"
      title="二级选项"
      :disabled="!level1Data.length"
      @update:model-value="handleLevel2Update"
    />
    <LevelCard
      v-model="level3Data"
      title="三级选项"
      :disabled="!level2Data.length"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'

interface LevelItem {
  id: string
  name: string
  children: LevelItem[]
}

const level1Data = ref<LevelItem[]>([])
const level2Data = ref<LevelItem[]>([])
const level3Data = ref<LevelItem[]>([])

// 本地存储键名
const STORAGE_KEY = 'three-level-selector-data'

// 初始化从本地存储加载
onMounted(() => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      level1Data.value = parsedData.level1 || []
      level2Data.value = parsedData.level2 || []
      level3Data.value = parsedData.level3 || []
    }
  }
  catch (e) {
    console.error('本地存储数据解析失败:', e)
  }
})

// 监听数据变化保存到本地存储
watchEffect(() => {
  const saveData = {
    level1: level1Data.value,
    level2: level2Data.value,
    level3: level3Data.value,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData))
})

const generateId = () => Math.random().toString(36).substr(2, 9)

function handleLevel1Update(newItems: LevelItem[]) {
  level2Data.value = []
  level3Data.value = []
  // 清除下级本地存储数据
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'),
    level2: [],
    level3: [],
  }))
}

function handleLevel2Update(newItems: LevelItem[]) {
  level3Data.value = []
}
</script>
