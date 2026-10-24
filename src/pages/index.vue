<template>
  <div class="mx-auto max-w-6xl p-6">
    <n-space vertical :size="20">
      <div>
        <n-h1 class="!mb-1">
          Vue3 + TS API Demos
        </n-h1>
        <n-text depth="3">
          共 {{ items.length }} 个示例,按主题分类。打开页面后,右上角可以查看源码。
        </n-text>
      </div>

      <n-input v-model:value="keyword" clearable placeholder="搜索标题 / 说明 / 标签 / 路径" />

      <n-space :size="8">
        <n-tag
          v-for="t in allTags"
          :key="t"
          checkable
          :checked="tag === t"
          @update:checked="tag = $event ? t : ''"
        >
          {{ t }}
        </n-tag>
      </n-space>

      <section v-if="recentItems.length && !filtering">
        <n-h3>最近访问</n-h3>
        <n-grid :cols="gridCols" responsive="screen" :xGap="12" :yGap="12">
          <n-gi v-for="item in recentItems" :key="item.path">
            <CatalogCard :item="item" />
          </n-gi>
        </n-grid>
      </section>

      <section v-for="s in sections" :key="s.key">
        <n-h3>
          {{ s.title }}
          <n-text depth="3" class="text-sm">
            {{ s.items.length }}
          </n-text>
        </n-h3>
        <n-grid :cols="gridCols" responsive="screen" :xGap="12" :yGap="12">
          <n-gi v-for="item in s.items" :key="item.path">
            <CatalogCard :item="item" />
          </n-gi>
        </n-grid>
      </section>

      <n-empty v-if="!sections.length" description="没有匹配的示例" />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { sectionKeyOf, sectionTitle, useCatalog } from '@/composables/useCatalog'
import { recent } from '@/composables/useRecent'

const { items, byPath } = useCatalog()

const gridCols = '1 s:2 l:3'
const keyword = ref('')
const tag = ref('')
const filtering = computed(() => !!keyword.value.trim() || !!tag.value)

const allTags = [...new Set(items.flatMap(i => i.tags))].sort()

const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase()
  return items.filter((i) => {
    if (tag.value && !i.tags.includes(tag.value))
      return false
    return !k || [i.title, i.desc, i.path, ...i.tags].some(s => s.toLowerCase().includes(k))
  })
})

// 按目录前两级分区,items 已按目录顺序排好 / group by the first two directory levels; items are already ordered
const sections = computed(() => {
  const map = new Map<string, typeof items>()
  for (const i of filtered.value) {
    const key = sectionKeyOf(i.dir)
    map.set(key, [...(map.get(key) ?? []), i])
  }
  return Array.from(map, ([key, list]) => ({ key, title: sectionTitle(key), items: list }))
})

const recentItems = computed(() => recent.value.flatMap((p) => {
  const i = byPath.get(p)
  return i ? [i] : []
}))
</script>
