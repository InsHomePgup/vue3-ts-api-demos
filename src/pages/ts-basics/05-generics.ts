// ============================================================
// 05 泛型：把类型当作参数，写出可复用且类型安全的代码
// 05 Generics: treat types as parameters to write reusable and type-safe code
// ============================================================

// 1. 泛型函数
// 1. Generic functions
export function identity<T>(value: T): T {
  return value
}
identity<string>('a') // 显式指定 | Explicitly specified
identity(1) // 自动推断为 number | Automatically inferred as number

// 2. 多个类型参数
// 2. Multiple type parameters
export function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value]
}

// 3. 泛型约束 extends：限制类型参数必须满足的形状
// 3. Generic constraints with extends: limit the shape a type parameter must satisfy
export function getLength<T extends { length: number }>(value: T): number {
  return value.length
}
getLength('abc')
getLength([1, 2, 3])

// 4. keyof 约束：保证 key 一定是 obj 的属性名，并推断出对应的值类型
// 4. keyof constraint: ensures key is a property name of obj, and infers the corresponding value type
export function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
export const name1 = getProp({ id: 1, name: 'foo' }, 'name') // string

// 5. 泛型默认值
// 5. Generic defaults
export interface Response<T = unknown> {
  code: number
  data: T
}
export const res1: Response = { code: 0, data: null } // data: unknown
export const res2: Response<string[]> = { code: 0, data: ['a'] }

// 6. 泛型接口 / 类型别名
// 6. Generic interfaces / type aliases
export interface Box<T> {
  value: T
}
export type Nullable<T> = T | null
export type Fn<A extends unknown[], R> = (...args: A) => R

// 7. 泛型类
// 7. Generic classes
export class Stack<T> {
  private items: T[] = []

  push(item: T): void {
    this.items.push(item)
  }

  pop(): T | undefined {
    return this.items.pop()
  }

  get size(): number {
    return this.items.length
  }
}
export const stack = new Stack<number>()

// 8. 泛型与数组、Promise 配合
// 8. Generics with arrays and Promise
export function first<T>(arr: T[]): T | undefined {
  return arr[0]
}

export async function wrap<T>(fn: () => Promise<T>): Promise<[Error | null, T | null]> {
  try {
    return [null, await fn()]
  }
  catch (e) {
    return [e as Error, null]
  }
}

// 9. 泛型约束中引用其他类型参数
// 9. Referencing other type parameters in a generic constraint
export function assign<T extends object, U extends Partial<T>>(target: T, source: U): T & U {
  return Object.assign(target, source)
}

// 10. 条件约束 + 默认值：根据参数类型决定返回类型（更多见 08）
// 10. Conditional constraint + default: decide the return type from the parameter type (more in 08)
export function toArray<T>(value: T): T extends unknown[] ? T : T[] {
  return (Array.isArray(value) ? value : [value]) as T extends unknown[] ? T : T[]
}

// 11. const 类型参数（TS 5.0）：让字面量推断得更精确
// 11. const type parameters (TS 5.0): make literal inference more precise
export function tuple<const T extends readonly unknown[]>(arr: T): T {
  return arr
}
export const t = tuple(['a', 1]) // readonly ['a', 1] 而非 (string | number)[] | readonly ['a', 1] instead of (string | number)[]

// 12. 泛型的常见命名
// 12. Common generic naming
// T: Type，K: Key，V: Value，E: Element，R: Return，P: Props，U / S: 第二、三个类型
// T: Type, K: Key, V: Value, E: Element, R: Return, P: Props, U / S: the second and third type
// 复杂场景可以用有语义的名字，比如 TItem、TResponse
// For complex scenarios, use meaningful names such as TItem, TResponse

// 13. 泛型不要滥用：类型参数只出现一次时，通常没必要用泛型
// 13. Do not overuse generics: if a type parameter appears only once, a generic is usually unnecessary
// 不好：function log<T>(x: T): void
// Bad: function log<T>(x: T): void
// 好：  function log(x: unknown): void
// Good: function log(x: unknown): void
