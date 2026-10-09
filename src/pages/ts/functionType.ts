// 1. 函数声明：参数和返回值类型
function add(a: number, b: number): number {
  return a + b
}

// 2. 函数表达式 / 箭头函数
const sub = (a: number, b: number): number => a - b

// 3. 函数类型注解（类型别名）
type MathFn = (a: number, b: number) => number

const mul: MathFn = (a, b) => a * b

// 4. 接口描述函数类型
interface DivFn {
  (a: number, b: number): number
}

const div: DivFn = (a, b) => a / b

// 5. 可选参数（必须放在必选参数之后）
function greet(name: string, greeting?: string): string {
  return `${greeting ?? 'Hello'}, ${name}`
}

// 6. 默认参数
function createUser(name: string, age: number = 18) {
  return { name, age }
}

// 7. 剩余参数
function sum(...nums: number[]): number {
  return nums.reduce((total, n) => total + n, 0)
}

// 8. 无返回值：void
function log(msg: string): void {
  console.log(msg)
}

// 9. 永不返回：never
function throwError(msg: string): never {
  throw new Error(msg)
}

// 10. 函数重载
function format(value: number): string
function format(value: string): string
function format(value: number | string): string {
  return typeof value === 'number' ? value.toFixed(2) : value.trim()
}

// 11. 泛型函数
function identity<T>(value: T): T {
  return value
}

// 泛型约束
function getLength<T extends { length: number }>(value: T): number {
  return value.length
}

// 12. this 参数类型
interface Counter {
  count: number
  inc: (this: Counter) => void
}

const counter: Counter = {
  count: 0,
  inc() {
    this.count++
  },
}

// 13. 回调函数类型
function fetchData(callback: (err: Error | null, data?: string) => void): void {
  callback(null, 'data')
}

// 14. 函数作为返回值（高阶函数）
function createAdder(base: number): (n: number) => number {
  return n => base + n
}

// 15. 异步函数：返回 Promise
async function getUser(id: number): Promise<{ id: number, name: string }> {
  return { id, name: 'foo' }
}

// 16. 常用工具类型：Parameters / ReturnType
type AddParams = Parameters<typeof add> // [a: number, b: number]
type AddReturn = ReturnType<typeof add> // number

// 17. 类型守卫函数
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

// 18. 断言函数
function assertNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number') {
    throw new TypeError('not a number')
  }
}

export {
  add,
  assertNumber,
  counter,
  createAdder,
  createUser,
  div,
  fetchData,
  format,
  getLength,
  getUser,
  greet,
  identity,
  isString,
  log,
  mul,
  sub,
  sum,
  throwError,
}
export type { AddParams, AddReturn, DivFn, MathFn }
