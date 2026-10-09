// ============================================================
// 03 函数
// ============================================================

// 1. 参数与返回值类型
export function add(a: number, b: number): number {
  return a + b
}

export const sub = (a: number, b: number): number => a - b

// 2. 函数类型：type / interface 两种写法
export type MathFn = (a: number, b: number) => number
export interface DivFn {
  (a: number, b: number): number
}

export const mul: MathFn = (a, b) => a * b // 参数类型由 MathFn 推断（上下文类型）
export const div: DivFn = (a, b) => a / b

// 3. 可选参数 ?：必须放在必选参数之后
export function greet(name: string, greeting?: string): string {
  return `${greeting ?? 'Hello'}, ${name}`
}

// 4. 默认参数：自带可选性，不能同时写 ? 和默认值
export function createUser(name: string, age: number = 18) {
  return { name, age }
}

// 默认参数 + 可选参数混用：新增参数追加到末尾，且必须是可选或带默认值，旧调用不受影响
export function createUser2(name: string, age: number = 18, email?: string) {
  return { name, age, email }
}
createUser2('foo', undefined, 'a@b.com') // 想跳过中间的默认参数，要传 undefined 占位

// 5. 对象参数 + 解构（推荐：参数超过 2~3 个，或以后会继续新增时）
// - 有默认值：解构默认值；可不传且无默认值：?；必传：不加 ?
// - 整个对象都可选时要给 = {}，否则 f() 会报错
export interface CreateUserOpts {
  name: string
  age?: number
  email?: string
  role?: string
}

export function createUser3({ name, age = 18, email, role = 'user' }: CreateUserOpts) {
  return { name, age, email, role }
}
createUser3({ name: 'foo', role: 'admin' }) // 不用占位，也不关心顺序

export function search({ keyword = '', page = 1 }: { keyword?: string, page?: number } = {}) {
  return { keyword, page }
}
search() // 整个对象可不传

// 6. 剩余参数
export function sum(...nums: number[]): number {
  return nums.reduce((total, n) => total + n, 0)
}

// 展开参数到元组类型的函数
export function pairFn(a: string, b: number): string {
  return a + b
}
const args: [string, number] = ['a', 1]
pairFn(...args)

// 7. void 与 never
export function log(msg: string): void {
  console.log(msg)
}

export function throwError(msg: string): never {
  throw new Error(msg)
}

// 回调的返回值声明为 void 时，允许返回任意值（会被忽略）
export const cb: () => void = () => 123

// 8. 函数重载：多个签名 + 一个实现，实现签名对外不可见
export function format(value: number): string
export function format(value: string): string
export function format(value: number | string): string {
  return typeof value === 'number' ? value.toFixed(2) : value.trim()
}

// 9. this 参数：伪参数，仅用于约束 this 类型，编译后会被擦除
export interface Counter {
  count: number
  inc: (this: Counter) => void
}

export const counter: Counter = {
  count: 0,
  inc() {
    this.count++
  },
}

// 10. 回调函数类型
export function fetchData(callback: (err: Error | null, data?: string) => void): void {
  callback(null, 'data')
}

// 11. 函数作为返回值（高阶函数）
export function createAdder(base: number): (n: number) => number {
  return n => base + n
}

// 12. 异步函数：返回 Promise<T>
export async function getUser(id: number): Promise<{ id: number, name: string }> {
  return { id, name: 'foo' }
}

// 13. 泛型函数（详见 05）
export function identity<T>(value: T): T {
  return value
}

// 14. 取函数的类型信息
export type AddParams = Parameters<typeof add> // [a: number, b: number]
export type AddReturn = ReturnType<typeof add> // number

// 15. 构造函数类型
export type Ctor<T> = new (...args: any[]) => T
export function create<T>(Class: Ctor<T>, ...args: any[]): T {
  return new Class(...args)
}

// 16. 类型守卫与断言函数（详见 04）
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function assertNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number') {
    throw new TypeError('not a number')
  }
}
