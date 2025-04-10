<template>
  <div>
  </div>
</template>

<script setup lang="ts">
// 1. 字符串基本操作
const str: string = 'Hello, TypeScript'

// 获取长度
const length: number = str.length // 17

// 转换为大写/小写
const upper: string = str.toUpperCase() // "HELLO, TYPESCRIPT"
const lower: string = str.toLowerCase() // "hello, typescript"

// 2. 字符串查找
const contains: boolean = str.includes('Type') // true
const index: number = str.indexOf('Script') // 10
const lastIndex: number = str.lastIndexOf('e') // 9

// 3. 字符串截取
const slice1: string = str.slice(7, 11) // "Type"
const substring: string = str.substring(7, 11) // "Type"
const substr: string = str.substr(7, 4) // "Type" (不推荐使用)
// 4. 字符串替换
const replaced: string = str.replace('Type', 'Java') // "Hello, JavaScript"
const replacedAll: string = str.replace(/e/g, 'E') // "HEllo, TypEScript"

// 5. 字符串分割与连接
const splitArr: string[] = str.split(', ') // ["Hello", "TypeScript"]
const joined: string = ['Hello', 'TS'].join(' ') // "Hello TS"

// 6. 字符串模板
const name = '张三'
const age = 25
const template: string = `姓名: ${name}, 年龄: ${age}` // "姓名: 张三, 年龄: 25"

// 7. 字符串验证
const startsWith: boolean = str.startsWith('Hello') // true
const endsWith: boolean = str.endsWith('Script') // true
const isWhitespace: boolean = '  '.trim().length === 0 // true

// 8. 字符串填充
const padded: string = '5'.padStart(3, '0') // "005"
const paddedEnd: string = '5'.padEnd(3, '0') // "500"
</script>

<style scoped>

</style>
