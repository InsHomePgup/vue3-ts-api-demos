<template>
  <n-drawer :show="show" :width="drawerWidth" placement="right" @update:show="emit('update:show', $event)">
    <n-drawer-content :title="`${title} · 源码`" closable :nativeScrollbar="false">
      <n-spin :show="loading">
        <n-code :code="code" language="xml" showLineNumbers wordWrap />
      </n-spin>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { pageModules } from '@/composables/useCatalog'

const props = defineProps<{ show: boolean, path: string, title: string }>()
const emit = defineEmits<{ 'update:show': [value: boolean] }>()

const code = ref('')
const loading = ref(false)
const drawerWidth = Math.min(760, window.innerWidth)

// 抽屉打开时才加载源码 / load the source only when the drawer opens
watch(() => [props.show, props.path] as const, async ([show, path]) => {
  if (!show)
    return
  const file = [`/src/pages${path}.vue`, `/src/pages${path}.tsx`].find(f => f in pageModules)
  loading.value = true
  try {
    code.value = file ? String(await pageModules[file]!()) : '// 找不到源码 / source not found'
  }
  finally {
    loading.value = false
  }
}, { immediate: true })
</script>
