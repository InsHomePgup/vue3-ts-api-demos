// typeof 和 instanceof 类型检查示例
import Person from '../../../../person.ts'

// 1. 基本类型检测
export function checkPrimitiveTypes() {
  console.log('--- 基本类型检测 ---')
  console.log(typeof 'hello') // "string"
  console.log(typeof 123) // "number"
  console.log(typeof true) // "boolean"
  console.log(typeof undefined) // "undefined"
  console.log(typeof null) // "object" (历史遗留问题)
  console.log(typeof Symbol('sym')) // "symbol"
  console.log(typeof 123n) // "bigint"
  console.log(typeof function () {}) // "function"
}

// 2. 对象类型判断
export function checkObjectTypes() {
  console.log('\n--- 对象类型判断 ---')
  console.log(typeof {}) // "object"
  console.log(typeof []) // "object"
  console.log(typeof new Date()) // "object"

  // 使用instanceof判断具体对象类型
  console.log(Array.isArray([])) // true
  console.log({} instanceof Object) // true
  console.log(new Date() instanceof Date) // true
  console.log(/regex/ instanceof RegExp) // true
}

// 3. 自定义类实例检查
export function checkCustomClassInstances() {
  console.log('\n--- 自定义类实例检查 ---')
  const person = new Person('张三', 25)

  console.log(typeof person) // "object"
  console.log(person instanceof Person) // true
  console.log(person instanceof Object) // true

  // 继承关系检查
  class Student extends Person {}
  const student = new Student('李四', 20)
  console.log(student instanceof Student) // true
  console.log(student instanceof Person) // true
  console.log(student instanceof Object) // true
}

// 4. 特殊情况
export function checkEdgeCases() {
  console.log('\n--- 特殊情况 ---')
  // 原始值 vs 包装对象
  console.log('hello' instanceof String) // false
  console.log(new String('hello') instanceof String) // true

  // 跨窗口/框架问题
  const iframe = document.createElement('iframe')
  document.body.appendChild(iframe)
  const iframeArray = window.frames[0].Array
  const arr = new iframeArray()
  console.log(Array.isArray(arr)) // false (不同全局环境)
  console.log(arr instanceof iframeArray) // true
  document.body.removeChild(iframe)
}

// 运行所有检查
export function runAllTypeChecks() {
  checkPrimitiveTypes()
  checkObjectTypes()
  checkCustomClassInstances()
  checkEdgeCases()
}

runAllTypeChecks()
