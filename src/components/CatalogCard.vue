<template>
  <router-link :to="item.path" class="card-link">
    <n-card hoverable size="small" :title="item.title" class="h-full">
      <n-text depth="3" class="block min-h-10 text-sm">
        {{ item.desc || item.path }}
      </n-text>
      <n-space :size="4" class="mt-2">
        <n-tag v-if="item.kind === 'source'" size="small" type="info" :bordered="false">
          源码
        </n-tag>
        <n-tag v-for="t in item.tags" :key="t" size="small" :bordered="false">
          {{ t }}
        </n-tag>
      </n-space>
    </n-card>
  </router-link>
</template>

<script setup lang="ts">
import type { CatalogItem } from '@/composables/useCatalog'

defineProps<{ item: CatalogItem }>()
</script>

<style scoped>
.card-link {
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;
}
</style>
