<script setup lang="ts">
// 1. 会改变原数组的方法
function mutableMethods() {
  const arr = [1, 2, 3]

  // 添加/删除元素
  arr.push(4) // [1,2,3,4]
  arr.pop() // [1,2,3]
  arr.unshift(0) // [0,1,2,3]
  arr.shift() // [1,2,3]

  // 修改数组
  arr.splice(1, 1) // [1,3]
  arr.reverse() // [3,1]
  arr.sort() // [1,3]
  arr.fill(0) // [0,0]
}

// 2. 不会改变原数组的方法
function immutableMethods() {
  const arr = [1, 2, 3]

  // 返回新数组
  const mapped = arr.map(x => x * 2) // [2,4,6]
  const filtered = arr.filter(x => x > 1) // [2,3]
  const sliced = arr.slice(1) // [2,3]
  const concated = arr.concat([4, 5]) // [1,2,3,4,5]

  // 查找/检查
  const found = arr.find(x => x === 2) // 2
  const foundIndex = arr.findIndex(x => x === 2) // 1
  const includes = arr.includes(3) // true
  const every = arr.every(x => x > 0) // true
  const some = arr.some(x => x > 2) // false

  // 聚合
  const reduced = arr.reduce((a, b) => a + b) // 6
  const joined = arr.join(',') // "1,2,3"
}
</script>
