<template>
  <div />
</template>

<script setup lang="ts">
import _ from 'lodash-es'

const res = _.sortBy([{ a: 1 }, { a: 4 }, { a: 2 }, { a: 3 }], ['a'])
console.log(res)
</script>

<style scoped>

</style>
