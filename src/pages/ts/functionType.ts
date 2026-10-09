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

// 6.1 默认参数 + 可选参数混用
// 默认参数自带可选性，不能同时写 `?` 和默认值；可选参数 `?` 必须放在必选参数之后
function createUserWithEmail(name: string, age: number = 18, email?: string) {
  return { name, age, email }
}

createUserWithEmail('foo') // age = 18, email = undefined
createUserWithEmail('foo', undefined, 'a@b.com') // 传 undefined 跳过 age，使用默认值

// 新增参数时：追加到末尾，且必须是可选或带默认值，旧调用不受影响（不能插到中间、不能是必选）
// 位置参数的问题：想用新参数又要跳过前面的参数时，需要一串 undefined 占位
// createUserWithEmail('foo', undefined, undefined, 'admin')
//
// 参数较多时，用对象参数 + 解构默认值更清晰：
// 之后再加参数只需在 opts 里加字段，调用方不用关心顺序，也不会破坏旧调用
function createUserByOpts(name: string, opts: { age?: number, email?: string } = {}) {
  const { age = 18, email } = opts
  return { name, age, email }
}

createUserByOpts('foo', { email: 'a@b.com' })

// 函数类型里只能用 `?`，默认值只能写在实现中
type CreateUserFn = (name: string, age?: number, email?: string) => object

// 6.2 对象参数 + 解构（推荐：参数多、可能继续新增时）
// - 有默认值：解构默认值（age = 18）
// - 可不传且无默认值：`?`（email?: string）
// - 必传：不加 `?`
// 类型单独定义便于复用；整个对象都可选时要给 `= {}`，否则 f() 会报错
// 不适合的场景：1~2 个含义明显的参数、需对应其他 API 签名的回调、重载 / this / 类型守卫
interface CreateUserOpts {
  name: string
  age?: number
  email?: string
  role?: string
}

function createUserByDestructure({ name, age = 18, email, role = 'user' }: CreateUserOpts) {
  return { name, age, email, role }
}

createUserByDestructure({ name: 'foo', role: 'admin' }) // 不用占位，也不关心顺序

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
  createUserByDestructure,
  createUserByOpts,
  createUserWithEmail,
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
export type { AddParams, AddReturn, CreateUserFn, CreateUserOpts, DivFn, MathFn }
