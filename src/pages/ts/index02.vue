<template>
  <div>
  </div>
</template>

<script setup lang="ts">
const arr = [1, 2, 3]
const resArr = arr.map((item) => {
  if (item > 2) {
    return item
  }
  else {
    return item
  }
})
console.log(resArr)



function getAge(name: string): number {
  if (name === 'foo') {
    return 25;
  } else {
    return 0
  }
}

getAge('foo');



</script>

<style scoped></style>
