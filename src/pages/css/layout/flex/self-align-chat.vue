<template>
  <div>
    <div>123</div>
    <div v-for="(item, index) in list" :key="index" class="w-100 flex flex-col">
      <div :class="item.isSelf ? 'self-end' : 'self-start'">
        {{ item.msg }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const list = ref([
  {
    msg: '消息A',
    isSelf: false,
  },
  {
    msg: '消息B',
    isSelf: true,
  },
])
</script>

<style scoped>

</style>
