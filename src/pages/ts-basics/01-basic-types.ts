// ============================================================
// 01 基础类型
// 本系列目标：覆盖 TS 的全部基础用法，更深入的类型到使用的库里去查看学习
// ============================================================

// 1. 原始类型
export const str: string = 'hello'
export const num: number = 42
export const bool: boolean = true
export const big: bigint = 100n
export const sym: symbol = Symbol('id')
export const nul: null = null
export const undef: undefined = undefined

// 2. 类型推断：能推断出来的就不用手写
export const inferred = 'abc' // string
export const inferredConst = 'abc' as const // 'abc'（字面量类型）
export const inferredArr = [1, 2, 3] // number[]
export const inferredObj = { id: 1, name: 'foo' } // { id: number, name: string }

// 3. 数组
export const nums: number[] = [1, 2, 3]
export const strs: Array<string> = ['a', 'b'] // 泛型写法，等价于 string[]
export const readonlyNums: readonly number[] = [1, 2, 3] // 不能 push / 修改
export const matrix: number[][] = [[1, 2], [3, 4]]

// 4. 元组：固定长度、每一项类型固定的数组
export const pair: [string, number] = ['age', 18]
export const named: [name: string, age: number] = ['foo', 18] // 具名元组，仅用于提示
export const optionalTuple: [string, number?] = ['foo'] // 可选元素
export const restTuple: [string, ...number[]] = ['scores', 90, 80, 70] // 剩余元素
export const readonlyTuple: readonly [number, number] = [1, 2]

// 5. 对象类型
export const point: { x: number, y: number } = { x: 1, y: 2 }
export const user: { readonly id: number, name: string, nick?: string } = { id: 1, name: 'foo' }
// user.id = 2 // 报错：只读属性

// 6. object / Object / {} 的区别
let lowerObject: object = { a: 1 } // 任何非原始值（对象、数组、函数）
// lowerObject = 1                          // 报错：原始值不行
// eslint-disable-next-line ts/no-empty-object-type
let emptyType: {} = 1 // 除 null / undefined 外的任何值，一般不推荐使用
export function useObject(): object {
  lowerObject = [1, 2]
  emptyType = 'str'
  return { lowerObject, emptyType }
}

// 7. 联合类型：多选一
export type ID = string | number
export function printId(id: ID): string {
  return typeof id === 'string' ? id.toUpperCase() : id.toFixed(0)
}

// 8. 字面量类型：值本身就是类型，常与联合类型配合
export type Direction = 'up' | 'down' | 'left' | 'right'
export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6
export type Truthy = true
export const dir: Direction = 'up'

// 9. any：关闭类型检查，尽量避免
export function useAny(): void {
  let anything: any = 1
  anything = 'str'
  anything.foo.bar() // 编译不报错，运行时才会崩
}

// 10. unknown：安全的 any，使用前必须收窄
export function handleUnknown(value: unknown): string {
  // value.toUpperCase() // 报错：必须先收窄
  if (typeof value === 'string') {
    return value.toUpperCase()
  }
  return String(value)
}

// 11. void：函数没有返回值
export function logMsg(msg: string): void {
  console.log(msg)
}

// 12. never：永远不会有值（抛错 / 死循环 / 穷尽检查）
export function fail(msg: string): never {
  throw new Error(msg)
}

// 13. 枚举
// 数字枚举：从 0 开始自增，同时支持反向映射
export enum Color {
  Red,
  Green,
  Blue,
}
export const colorName = Color[0] // 'Red'

// 字符串枚举：没有反向映射，调试时更直观
export enum Status {
  Pending = 'pending',
  Done = 'done',
}

// 枚举的替代方案（推荐）：as const 对象 + 联合类型，没有运行时额外代码，也兼容 erasableSyntaxOnly
export const Role = {
  Admin: 'admin',
  User: 'user',
} as const
// eslint-disable-next-line ts/no-redeclare
export type Role = (typeof Role)[keyof typeof Role] // 'admin' | 'user'

// 14. 类型断言：告诉编译器"我比你更清楚"，不会做运行时检查
export const input = document.createElement('input')
export const el = document.getElementById('app') as HTMLDivElement | null
export const value1 = 'abc' as unknown as number // 双重断言，强制转换，慎用
export const angle = <string>'abc' // 尖括号写法，.tsx 中不可用，一般用 as

// 15. 非空断言 ! 与可选链 ?. / 空值合并 ??
export function getLen(s?: string): number {
  const a = s!.length // 断言 s 一定有值，不安全
  const b = s?.length // number | undefined，安全
  const c = s?.length ?? 0 // 只对 null / undefined 取默认值
  return a + (b ?? 0) + c
}

// 16. null 与 undefined（strict 模式下不能赋给其他类型）
// const s: string = null // 报错
export const maybe: string | null = null

// 17. 类型别名：给类型起名字
export interface Point { x: number, y: number }
export type Callback = (err: Error | null) => void

// 18. Symbol 与 unique symbol
export const KEY: unique symbol = Symbol('key')
export const withSymbol = { [KEY]: 1 }

// 19. 日期、正则、Map、Set 等内置类型
export const date: Date = new Date()
export const reg: RegExp = /abc/
export const map: Map<string, number> = new Map([['a', 1]])
export const set: Set<number> = new Set([1, 2, 3])
export const promise: Promise<number> = Promise.resolve(1)
