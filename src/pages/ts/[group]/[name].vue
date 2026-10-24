<template>
  <div class="p-5">
    <template v-if="code !== undefined">
      <n-space align="center" justify="space-between" class="mb-3">
        <div>
          <n-h3 class="!m-0">
            {{ item?.title ?? name }}
          </n-h3>
          <n-text depth="3" class="text-sm">
            {{ item?.desc }}
          </n-text>
        </div>
        <n-button size="small" @click="copy">
          {{ copied ? '已复制' : '复制代码' }}
        </n-button>
      </n-space>
      <n-code :code="code" :language="language" showLineNumbers wordWrap />
    </template>
    <n-result v-else-if="!loading" status="404" title="找不到该文件" :description="route.path" />
  </div>
</template>

<script setup lang="ts">
// 只有源码、没有运行界面的 .ts / .md 文件，统一在这里展示
// Source-only .ts / .md files (no UI of their own) are shown here
import { sourceModules, sourceRoute, useCatalog } from '@/composables/useCatalog'

const route = useRoute()
const { byPath } = useCatalog()

const code = ref<string>()
const loading = ref(true)
const copied = ref(false)

const name = computed(() => (route.params as { name?: string }).name ?? '')
const item = computed(() => byPath.get(route.path))
const file = computed(() => Object.keys(sourceModules).find(f => sourceRoute(f) === route.path))
const language = computed(() => file.value?.endsWith('.md') ? 'markdown' : 'typescript')

watch(file, async (f) => {
  loading.value = true
  code.value = f ? String(await sourceModules[f]!()) : undefined
  loading.value = false
}, { immediate: true })

async function copy() {
  try {
    await navigator.clipboard.writeText(code.value ?? '')
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  }
  catch {}
}
</script>
