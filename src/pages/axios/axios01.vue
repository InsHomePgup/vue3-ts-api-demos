<template>
  <div>
  </div>
</template>

<script setup lang="ts">
const controller = new AbortController()
axios.get('/foo/bar', {
  signal: controller.signal,
}).then((response) => {
  console.log('响应--', response)
})
// cancel the request
controller.abort()
</script>

<style scoped>

</style>
