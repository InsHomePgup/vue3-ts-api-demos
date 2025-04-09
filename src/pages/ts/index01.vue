<template>
  <div>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: string
  name: string
  age: number
  email: string
  address: string
  phone: string
}

// 移除email和age两个属性
type UserBasicInfo = Omit<User, 'email' | 'age'>

type UserExtraInfo = User & {
  job: string
}

// 使用示例
const userWithJob: UserExtraInfo = {
  id: '1',
  name: '张三',
  age: 25,
  email: 'zhangsan@example.com',
  address: '北京市',
  phone: '13800138000',
  job: '前端工程师', // 新增的job属性
}

const userBasicInfo: UserBasicInfo = {
  id: '1',
  name: '张三',
  address: '北京市',
  phone: '13800138000',
}

// Partial<T> - 将所有属性变为可选
  type PartialUser = Partial<User> // 所有属性变为可选

// Required<T> - 将所有属性变为必选
type RequiredUser = Required<PartialUser> // 还原为必选

// Readonly<T> - 将所有属性变为只读
type ReadonlyUser = Readonly<User>

// Pick<T, K> - 从类型中选择部分属性
  type UserNameAndAge = Pick<User, 'name' | 'age'>

// Omit<T, K> - 从类型中排除部分属性
type UserWithoutEmail = Omit<User, 'email'>

// Record<K, T> - 创建键值对类型
type UserMap = Record<string, User>

// 1. 普通函数
function getAge(): number {
  return 25
}
type Age = ReturnType<typeof getAge> // number

// 2. 异步函数
async function fetchData() {
  return { id: 1, name: '张三' }
}
type Data = ReturnType<typeof fetchData> // Promise<{ id: number; name: string }>

// 3. 箭头函数
const getUser = () => ({ id: '1', name: '李四' })
type UserData = ReturnType<typeof getUser> // { id: string; name: string }

const foo: UserData = {
  id: '1',
  name: 'foo',
}

const num = 6
if (num > 5) {
  console.log(num)
}
</script>

<style scoped>

</style>
