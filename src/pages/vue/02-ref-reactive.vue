<template>
  <div>
    <div>{{ count }}</div>
    <div>{{ obj }}</div>
  </div>
</template>

<script setup lang="ts">
const count = ref(0)
const obj = reactive({
  name: 'foo',
})
</script>

<style scoped>

</style>
