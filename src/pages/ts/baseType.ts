// 1. 原始类型
const counter: number = 1
const str: string = ''
const boo: boolean = false
const big: bigint = 100n
const sym: symbol = Symbol('id')
const nul: null = null
const undef: undefined = undefined

// 2. 数组
const numArr: number[] = [1, 2, 3]
const strArr: Array<string> = ['a', 'b']
const readonlyArr: readonly number[] = [1, 2, 3]

// 3. 元组：固定长度和每一项的类型
const abc: [boolean, number] = [false, 1]
const namedTuple: [name: string, age: number] = ['foo', 20]
const optionalTuple: [string, number?] = ['foo']

// 4. 对象
const person: { name: string, age: number, nickname?: string } = {
  name: 'foo',
  age: 20,
}
const readonlyPerson: { readonly id: number } = { id: 1 }

// 索引签名
const dict: Record<string, number> = { a: 1, b: 2 }

// object 只表示非原始类型，访问不到具体属性
const obj: object = { name: 'foo' }

// 5. 联合类型
const def: number | string = 123

// 6. 字面量类型
const direction: 'up' | 'down' | 'left' | 'right' = 'up'
const one = 1 as const

// 7. 类型别名
type ID = number | string
const userId: ID = 'abc'

// 8. 接口
interface User {
  id: number
  name: string
  age?: number
}
const user: User = { id: 1, name: 'foo' }

// 9. 交叉类型
type Admin = User & { role: string }
const admin: Admin = { id: 1, name: 'foo', role: 'admin' }

// 10. 枚举
enum Color {
  Red,
  Green,
  Blue,
}
const color: Color = Color.Red

enum Status {
  Success = 'success',
  Fail = 'fail',
}
const status: Status = Status.Success

// 11. any：关闭类型检查，尽量避免
let anything: any = 1
anything = 'now a string'

// 12. unknown：安全的 any，使用前必须收窄
const aaa: unknown = 123
if (typeof aaa === 'number') {
  aaa.toFixed(2)
}

// 类型断言
const unknownArr: unknown = ['a', 'b']
;(unknownArr as string[]).join(',')

// 13. void / never
function noReturn(): void {}
function fail(): never {
  throw new TypeError('fail')
}

// 14. 类型推断：能推断出来的不用手写
const inferred = 'hello' // string 字面量 'hello'
const inferredNum = 1 // 字面量 1（用 let 声明则推断为 number）

// 15. 非空断言与可选链
const maybe: string | undefined = Math.random() > 0.5 ? 'a' : undefined
const len = maybe?.length ?? 0
const forced = maybe!.length

// 16. as const：把值推断为只读字面量
const config = { mode: 'dark', size: 12 } as const

// 17. typeof / keyof
type PersonType = typeof person
type PersonKeys = keyof PersonType

// 18. 常用工具类型
type PartialUser = Partial<User>
type RequiredUser = Required<User>
type PickUser = Pick<User, 'id' | 'name'>
type OmitUser = Omit<User, 'age'>
type ReadonlyUser = Readonly<User>

export {
  abc,
  admin,
  big,
  boo,
  color,
  config,
  counter,
  def,
  dict,
  direction,
  fail,
  forced,
  inferred,
  inferredNum,
  len,
  namedTuple,
  noReturn,
  nul,
  numArr,
  obj,
  one,
  optionalTuple,
  person,
  readonlyArr,
  readonlyPerson,
  status,
  str,
  strArr,
  sym,
  undef,
  user,
  userId,
}
export type {
  Admin,
  ID,
  OmitUser,
  PartialUser,
  PersonKeys,
  PersonType,
  PickUser,
  ReadonlyUser,
  RequiredUser,
  User,
}
export { Color, Status }
