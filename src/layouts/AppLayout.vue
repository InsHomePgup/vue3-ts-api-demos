<template>
  <!-- 整体布局：左侧菜单 + 顶部面包屑 + 内容区 / Shell: sidebar menu + breadcrumb header + content -->
  <div class="relative h-screen">
    <n-layout hasSider position="absolute">
      <n-layout-sider
        bordered
        showTrigger="bar"
        collapseMode="width"
        :collapsedWidth="0"
        :width="270"
        :nativeScrollbar="false"
        :collapsed="collapsed"
        @update:collapsed="collapsed = $event"
      >
        <div class="px-4 py-3">
          <RouterLink to="/" class="brand">
            Vue3 · TS · API Demos
          </RouterLink>
        </div>
        <n-menu
          :value="route.path"
          :options="menuOptions"
          :expandedKeys="expandedKeys"
          :indent="16"
          @update:expanded-keys="expandedKeys = $event"
        />
      </n-layout-sider>

      <n-layout>
        <n-layout-header bordered class="header">
          <n-breadcrumb>
            <n-breadcrumb-item>
              <RouterLink to="/">
                首页
              </RouterLink>
            </n-breadcrumb-item>
            <n-breadcrumb-item v-for="c in crumbs" :key="c">
              {{ c }}
            </n-breadcrumb-item>
            <n-breadcrumb-item v-if="current">
              {{ current.title }}
            </n-breadcrumb-item>
          </n-breadcrumb>
          <n-button v-if="canViewSource" size="small" @click="showSource = true">
            查看源码
          </n-button>
        </n-layout-header>

        <n-layout-content position="absolute" class="content" :nativeScrollbar="false">
          <router-view />
        </n-layout-content>
      </n-layout>
    </n-layout>

    <SourceDrawer v-if="current" v-model:show="showSource" :path="current.path" :title="current.title" />
  </div>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import type { TreeNode } from '@/composables/useCatalog'
import { RouterLink } from 'vue-router'
import { dirLabel, pageModules, useCatalog } from '@/composables/useCatalog'
import { pushRecent } from '@/composables/useRecent'

const route = useRoute()
const { tree, byPath } = useCatalog()

// 窄屏默认收起菜单 / collapse the menu by default on narrow screens
const collapsed = ref(window.innerWidth < 768)

// 菜单项：叶子用 RouterLink，支持新标签页打开 / leaves use RouterLink so they can open in a new tab
function toOption(node: TreeNode): MenuOption {
  if (node.item) {
    const { path, title } = node.item
    return { key: path, label: () => h(RouterLink, { to: path }, () => title) }
  }
  return { key: node.key, label: node.label, children: node.children?.map(toOption) }
}
const menuOptions = tree.map(toOption)

// 当前页所在的目录要展开 / expand the directories of the current page
const expandedKeys = ref<string[]>([])
const current = computed(() => byPath.get(route.path))
watch(() => route.path, (path) => {
  const item = byPath.get(path)
  if (!item)
    return
  const parts = item.dir.split('/')
  const keys = parts.map((_, i) => `dir:${parts.slice(0, i + 1).join('/')}`)
  expandedKeys.value = [...new Set([...expandedKeys.value, ...keys])]
  pushRecent(path)
}, { immediate: true })

const crumbs = computed(() => {
  const parts = current.value?.dir.split('/').filter(Boolean) ?? []
  return parts.map((_, i) => dirLabel(parts.slice(0, i + 1).join('/')))
})

// 只有 .vue / .tsx 页面才有「查看源码」；ts 源码页本身就是源码
// Only .vue / .tsx pages get "view source"; source pages already are the source
const showSource = ref(false)
const canViewSource = computed(() => {
  const item = current.value
  if (!item || item.kind === 'source')
    return false
  return [`/src/pages${item.path}.vue`, `/src/pages${item.path}.tsx`].some(f => f in pageModules)
})
</script>

<style scoped>
.brand {
  font-weight: 600;
  font-size: 16px;
  color: inherit;
  text-decoration: none;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 16px;
}
.content {
  top: 48px;
}
</style>
