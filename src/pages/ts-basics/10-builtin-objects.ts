// ============================================================
// 10 内置对象的类型
// 10 Types of built-in objects
// 这些类型都定义在 TypeScript 自带的 lib.*.d.ts 里（node_modules/typescript/lib），
// These types are all defined in TypeScript's bundled lib.*.d.ts files (node_modules/typescript/lib),
// 加载哪些由 tsconfig 的 target / lib 决定：ES 标准库在 lib.es20xx.*.d.ts，浏览器 API 在 lib.dom.d.ts
// which ones get loaded is decided by tsconfig target / lib: the ES standard library is in lib.es20xx.*.d.ts, browser APIs in lib.dom.d.ts
// 在编辑器里对 Map、Promise 等按 F12 即可跳转到定义
// In the editor, press F12 on Map, Promise, etc. to jump to the definition
// ============================================================

// ---------- Map ----------

// 1. 带初始值时自动推断；空集合必须写泛型，否则会推断成 Map<any, any>
// 1. Inferred automatically with initial values; an empty collection needs explicit generics, otherwise it is inferred as Map<any, any>
export const scores = new Map([['math', 90], ['english', 80]]) // Map<string, number>
export const users = new Map<number, { name: string }>()

// 2. get 返回 V | undefined：取不到时是 undefined，必须处理
// 2. get returns V | undefined: undefined when the key is missing, must be handled
export function getScore(subject: string): number {
  return scores.get(subject) ?? 0
}

// 3. 遍历：解构出来的是元组 [K, V]
// 3. Iteration: destructuring yields the tuple [K, V]
export function sumScores(): number {
  let total = 0
  for (const [, score] of scores) {
    total += score
  }
  return total
}

// 4. Map 与 Object 的选择
// 4. Choosing between Map and Object
// - key 类型不是 string / symbol（如对象、数字）、需要频繁增删、需要保证插入顺序和 size：用 Map
// - Use Map when keys are not string / symbol (e.g. objects, numbers), with frequent add/remove, or when insertion order and size are needed
// - 结构固定、需要 JSON 序列化：用 Object / Record
// - Use Object / Record for fixed structure and JSON serialization
export const byObjectKey = new Map<object, string>()

// 5. 转换：Object <-> Map
// 5. Conversion: Object <-> Map
export const fromObject = new Map(Object.entries({ a: 1, b: 2 })) // Map<string, number>
export const toObject = Object.fromEntries(fromObject) // { [k: string]: number }

// ---------- Set ----------

// 6. 基本用法与数组去重
// 6. Basic usage and array deduplication
export const ids = new Set<number>([1, 2, 2, 3])
export const unique = [...new Set([1, 1, 2])] // number[]
export const hasTwo: boolean = ids.has(2)

// 7. 集合运算（ES2025，lib 需要 ESNext）
// 7. Set operations (ES2025, lib needs ESNext)
export const a = new Set([1, 2, 3])
export const b = new Set([2, 3, 4])
export const union = a.union(b) // Set<number>
export const intersection = a.intersection(b)
export const difference = a.difference(b)

// ---------- WeakMap / WeakSet ----------

// 8. key 必须是对象，且不会阻止垃圾回收，常用于给对象挂私有数据 / 缓存
// 8. Keys must be objects and do not prevent garbage collection; often used to attach private data / caches to objects
export const cache = new WeakMap<object, number>()
export const visited = new WeakSet<object>()

// ---------- Array ----------

// 9. find / at / 索引访问都会带上 undefined（开启 noUncheckedIndexedAccess 后索引访问也是）
// 9. find / at / index access all include undefined (index access too once noUncheckedIndexedAccess is on)
export const list = [1, 2, 3]
export const found = list.find(n => n > 1) // number | undefined
export const last = list.at(-1) // number | undefined
export const firstItem = list[0] // number | undefined

// 10. filter 配合类型守卫收窄元素类型
// 10. filter combined with a type guard narrows the element type
export const mixed: (number | null)[] = [1, null, 2]
export const numbers = mixed.filter((x): x is number => x !== null) // number[]

// 11. 其他常用方法的返回类型
// 11. Return types of other common methods
export const grouped = Object.groupBy(list, n => (n % 2 === 0 ? 'even' : 'odd')) // Partial<Record<'even' | 'odd', number[]>>
export const groupedMap = Map.groupBy(list, n => n % 2) // Map<number, number[]>
export const flat = [[1], [2, 3]].flat() // number[]
export const entries = Array.from({ length: 3 }, (_, i) => i * 2) // number[]
export const readonlyList: ReadonlyArray<number> = list // 不能 push | cannot push

// ---------- Object ----------

// 12. Object.keys 返回 string[] 而不是 keyof T（对象可能有多余属性，所以 TS 不敢假设）
// 12. Object.keys returns string[] rather than keyof T (objects may have extra properties, so TS won't assume)
export const person = { name: 'foo', age: 18 }
export const keys = Object.keys(person) // string[]
export const typedKeys = Object.keys(person) as (keyof typeof person)[]
export const values = Object.values(person) // (string | number)[]
export const frozen = Object.freeze({ a: 1 }) // Readonly<{ a: number }>

// ---------- Promise ----------

// 13. Promise<T>：async 函数的返回值会被包成 Promise
// 13. Promise<T>: the return value of an async function is wrapped in a Promise
export async function fetchNum(): Promise<number> {
  return 1
}

// 14. 并发：all 保留元组类型，allSettled 返回结果状态
// 14. Concurrency: all preserves tuple types, allSettled returns result statuses
export async function runAll() {
  const [n, s] = await Promise.all([fetchNum(), Promise.resolve('a')]) // n: number, s: string
  const results = await Promise.allSettled([fetchNum(), Promise.reject(new Error('x'))])
  const values = results.map(r => (r.status === 'fulfilled' ? r.value : r.reason)) // 判别联合收窄 | narrowing a discriminated union
  const first = await Promise.race([fetchNum(), Promise.resolve(2)]) // number
  return { n, s, values, first }
}

// 15. 手写 Promise 要显式写泛型，否则 resolve 的参数是 unknown
// 15. A hand-written Promise needs an explicit generic, otherwise resolve's parameter is unknown
export function sleep(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

// 16. Awaited 取出 Promise 的结果类型
// 16. Awaited gets the result type of a Promise
export type FetchNumResult = Awaited<ReturnType<typeof fetchNum>> // number

// ---------- JSON / 错误 ----------
// ---------- JSON / Errors ----------

// 17. JSON.parse 返回 any，不会检查任何东西：先当 unknown 处理，再校验 / 收窄
// 17. JSON.parse returns any and checks nothing: treat it as unknown first, then validate / narrow
export interface Todo {
  id: number
  title: string
}

export function isTodo(value: unknown): value is Todo {
  return typeof value === 'object'
    && value !== null
    && 'id' in value
    && typeof value.id === 'number'
    && 'title' in value
    && typeof value.title === 'string'
}

export function parseTodo(text: string): Todo | null {
  const data: unknown = JSON.parse(text)
  return isTodo(data) ? data : null
}

// 18. catch 里的错误是 unknown，需要收窄
// 18. The error in catch is unknown and needs narrowing
export function safeParse(text: string): string {
  try {
    JSON.parse(text)
    return 'ok'
  }
  catch (e) {
    return e instanceof Error ? e.message : String(e)
  }
}

// 19. 自定义错误类（带 cause，ES2022）
// 19. Custom error class (with cause, ES2022)
export class HttpError extends Error {
  constructor(public status: number, message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'HttpError'
  }
}

// ---------- Date / RegExp / 字符串 ----------
// ---------- Date / RegExp / String ----------

// 20. Date：getTime() 返回 number，可以直接做减法
// 20. Date: getTime() returns number, so you can subtract directly
export const diff: number = new Date('2024-01-02').getTime() - new Date('2024-01-01').getTime()

// 21. 正则匹配结果可能为 null；命名分组在 groups 里（索引签名，取值带 undefined）
// 21. A regex match may be null; named groups live in groups (index signature, values include undefined)
const YEAR_RE = /(?<year>\d{4})-\d{2}/

export function parseDate(text: string): string | null {
  const match = YEAR_RE.exec(text)
  // eslint-disable-next-line dot-notation
  return match?.groups?.['year'] ?? null
}

// 22. 字符串 split / match 的结果
// 22. Results of string split / match
export const parts = 'a,b'.split(',') // string[]
export const firstPart = parts[0] // string | undefined（noUncheckedIndexedAccess）

// ---------- 迭代器 / 生成器 ----------
// ---------- Iterators / generators ----------

// 23. 自定义可迭代对象：实现 [Symbol.iterator]
// 23. Custom iterable: implement [Symbol.iterator]
export class Range implements Iterable<number> {
  constructor(private from: number, private to: number) {}

  * [Symbol.iterator](): Generator<number, void, undefined> {
    for (let i = this.from; i <= this.to; i++) {
      yield i
    }
  }
}
export const rangeList = [...new Range(1, 3)] // number[]

// 24. 生成器的三个泛型：Generator<产出类型, 返回类型, next 接收的类型>
// 24. The three generics of a generator: Generator<yield type, return type, type accepted by next>
export function* counter(): Generator<number, string, undefined> {
  yield 1
  yield 2
  return 'done'
}

// ---------- 浏览器（lib.dom.d.ts） ----------
// ---------- Browser (lib.dom.d.ts) ----------

// 25. DOM 查询：返回值可能为 null；querySelector 可以传泛型指定元素类型
// 25. DOM queries: the result may be null; querySelector accepts a generic to specify the element type
export function readInput(): string {
  const input = document.querySelector<HTMLInputElement>('#name') // HTMLInputElement | null
  return input?.value ?? ''
}

// 26. 标签名会自动映射到具体元素类型
// 26. Tag names are automatically mapped to concrete element types
export const canvas = document.createElement('canvas') // HTMLCanvasElement

// 27. localStorage.getItem 返回 string | null
// 27. localStorage.getItem returns string | null
export const token: string | null = localStorage.getItem('token')

// 28. fetch：Response.json() 返回 Promise<any>，同样要先当 unknown 处理
// 28. fetch: Response.json() returns Promise<any>, so likewise treat it as unknown first
export async function loadTodo(id: number): Promise<Todo | null> {
  const res = await fetch(`/api/todos/${id}`)
  const data: unknown = await res.json()
  return isTodo(data) ? data : null
}

// 29. URL / URLSearchParams / AbortController
export const url = new URL('https://example.com?a=1')
export const q: string | null = url.searchParams.get('a')
export const controller = new AbortController()

// 30. structuredClone：深拷贝，类型保持不变（函数、类实例等不可克隆的值运行时会报错）
// 30. structuredClone: deep copy, type unchanged (non-cloneable values such as functions and class instances throw at runtime)
export const cloned = structuredClone({ a: 1, b: new Date() }) // { a: number, b: Date }

// 31. 事件处理函数的参数类型：通过事件名映射，参数自动推断
// 31. Event handler parameter types: mapped by event name, parameters inferred automatically
export function listen(): void {
  document.addEventListener('click', (e) => {
    console.log(e.clientX) // e: MouseEvent
  })
  window.addEventListener('resize', (e) => {
    console.log(e.type) // e: UIEvent
  })
}
