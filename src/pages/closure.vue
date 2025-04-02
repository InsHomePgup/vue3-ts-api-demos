<template>
  <div />
</template>

<script setup lang="ts">
function outer() {
  const message = 'Hello, world!'

  return function inner() {
    console.log(message) // 这里的 message 来自外部函数 outer
  }
}

const greet = outer() // outer() 执行并返回 inner
greet() // 输出 'Hello, world!'
greet() // 输出 'Hello, world!'
greet() // 输出 'Hello, world!'
</script>

<style scoped>

</style>
