<template>
  <n-config-provider :hljs="hljs" :locale="zhCN" :dateLocale="dateZhCN">
    <AppLayout />
  </n-config-provider>
</template>

<script setup lang="ts">
import { dateZhCN, zhCN } from 'naive-ui'
import hljs from '@/plugins/hljs'
</script>
