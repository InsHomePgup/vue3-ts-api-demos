<template>
  <p>当前主题：{{ theme }}</p>
  <button @click="toggle">
    切换主题
  </button>
</template>

<script setup lang="ts">
import { useThemeContext } from './injection-keys'

// 类型来自 ThemeKey，不需要手写泛型
const { theme, toggle } = useThemeContext()
</script>
