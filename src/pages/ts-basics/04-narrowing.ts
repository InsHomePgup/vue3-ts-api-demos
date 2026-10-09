// ============================================================
// 04 类型收窄：在代码分支里把宽类型缩小为具体类型
// 04 Type narrowing: narrow a wide type to a specific type inside code branches
// ============================================================

// 1. typeof：原始类型
// 1. typeof: primitive types
export function padLeft(value: string | number): string {
  if (typeof value === 'string') {
    return value.padStart(4) // string
  }
  return value.toFixed(2) // number
}

// 2. 真值收窄
// 2. Truthiness narrowing
export function printName(name?: string | null): string {
  if (name) {
    return name // string（排除了 undefined / null / ''） | string (excludes undefined / null / '')
  }
  return 'anonymous'
}

// 3. 相等性收窄
// 3. Equality narrowing
export function compare(a: string | number, b: string | boolean): string | undefined {
  if (a === b) {
    return a.toUpperCase() // a、b 此时都是 string | a and b are both string here
  }
  return undefined
}

// 4. in：判断属性是否存在
// 4. in: check whether a property exists
export interface Fish {
  swim: () => void
}
export interface Bird {
  fly: () => void
}
export function move(animal: Fish | Bird): void {
  if ('swim' in animal) {
    animal.swim()
  }
  else {
    animal.fly()
  }
}

// 5. instanceof：判断类的实例
// 5. instanceof: check class instances
export function formatDate(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString()
  }
  return value
}

// 6. Array.isArray
// 6. Array.isArray
export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

// 7. 自定义类型守卫：返回值写成 `参数 is 类型`
// 7. Custom type guards: write the return type as `param is Type`
export interface Cat {
  meow: () => void
}
export interface Dog {
  bark: () => void
}
export function isCat(pet: Cat | Dog): pet is Cat {
  return (pet as Cat).meow !== undefined
}
export function speak(pet: Cat | Dog): void {
  if (isCat(pet)) {
    pet.meow()
  }
  else {
    pet.bark()
  }
}

// 常见用法：过滤数组时去掉 null / undefined
// Common usage: filter out null / undefined from an array
export const list = [1, null, 2, undefined].filter((x): x is number => x != null) // number[]

// 8. 断言函数：不满足就抛错，之后的代码里类型就被收窄了
// 8. Assertion functions: throw if not satisfied, and the type is narrowed in the code after
export function assertDefined<T>(value: T | undefined | null): asserts value is T {
  if (value == null) {
    throw new Error('value is null or undefined')
  }
}
export function useAssert(v: string | undefined): number {
  assertDefined(v)
  return v.length // string
}

// 9. 判别联合（Discriminated Union）：用一个共同的字面量属性区分
// 9. Discriminated union: distinguish members by a common literal property
export type Shape
  = | { kind: 'circle', radius: number }
    | { kind: 'square', size: number }
    | { kind: 'rect', width: number, height: number }

export function area(shape: Shape): number {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2
  }
  if (shape.kind === 'square') {
    return shape.size ** 2
  }
  if (shape.kind === 'rect') {
    return shape.width * shape.height
  }
  // 10. never 穷尽检查：新增 kind 却忘了处理时，这里会编译报错（switch 的 default 分支同理）
  // 10. never exhaustive check: if a new kind is added but not handled, this fails to compile (same for the default branch of a switch)
  const _exhaustive: never = shape
  return _exhaustive
}

// 11. 请求状态建模：比一堆可选字段更安全
// 11. Modeling request state: safer than a bunch of optional fields
export type RequestState<T>
  = | { status: 'loading' }
    | { status: 'success', data: T }
    | { status: 'error', error: Error }

export function render(state: RequestState<string>): string {
  if (state.status === 'success') {
    return state.data
  }
  if (state.status === 'error') {
    return state.error.message
  }
  return 'loading...'
}

// 12. 赋值收窄与控制流分析
// 12. Assignment narrowing and control flow analysis
export function flow(): string {
  let x: string | number = 'abc'
  x.toUpperCase() // 赋值后收窄为 string | Narrowed to string after assignment
  x = 1
  return x.toFixed() // 收窄为 number | Narrowed to number
}

// 13. 回调里的收窄：对象属性在回调中可能已被修改，需要时先存到 const
// 13. Narrowing in callbacks: object properties may have changed by the time the callback runs; store them in a const first if needed
export function lostNarrowing(obj: { value?: string }): number {
  if (obj.value) {
    const len = obj.value.length // 这里是 string | Here it is string
    setTimeout(() => {
      const v = obj.value // 回调执行时 obj.value 可能已变化，重新取值并判断 | obj.value may have changed when the callback runs; re-read and check it
      console.log(v?.length)
    })
    return len
  }
  return 0
}
