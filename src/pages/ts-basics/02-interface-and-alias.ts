// ============================================================
// 02 interface 与 type：描述对象的形状
// ============================================================

// 1. interface 基本写法：必选 / 可选 / 只读
export interface Person {
  readonly id: number
  name: string
  age?: number
}

export const p: Person = { id: 1, name: 'foo' }
// p.id = 2 // 报错：只读

// 2. 继承 extends（可多继承）
export interface Student extends Person {
  school: string
}

export interface Worker extends Person {
  company: string
}

export interface Intern extends Student, Worker {
  mentor: string
}

// 3. type 别名：用交叉类型 & 实现类似继承
export type Teacher = Person & { subject: string }

// 4. 声明合并：同名 interface 会自动合并（type 不行）
export interface Config {
  host: string
}
export interface Config {
  port: number
}
export const config: Config = { host: 'localhost', port: 80 }

// 5. 索引签名：属性名不确定时使用
export interface StringMap {
  [key: string]: number
}
export const scores: StringMap = { math: 90, english: 80 }
// eslint-disable-next-line dot-notation
export const math = scores['math'] // 开启 noPropertyAccessFromIndexSignature 后，索引签名的属性必须用方括号访问

// 已知属性必须兼容索引签名的值类型
export interface Mixed {
  [key: string]: string | number
  name: string
  age: number
}

// 6. 函数类型 / 构造函数类型
export interface Add {
  (a: number, b: number): number
}
export const add: Add = (a, b) => a + b

export interface PersonCtor {
  new (name: string): { name: string }
}

// 带属性的函数（函数也是对象）
export interface Counter {
  (): number
  count: number
}

// 7. 方法的两种写法
export interface Methods {
  methodStyle: (x: number) => void // 属性写法：strictFunctionTypes 下参数双向协变检查更严格
  // eslint-disable-next-line ts/method-signature-style
  method(x: number): void // 方法写法：参数检查更宽松（bivariant）
}

// 8. 多余属性检查：字面量直接赋值时，不允许出现类型中没有的属性
// const p2: Person = { id: 1, name: 'foo', extra: 1 } // 报错
const tmp = { id: 1, name: 'foo', extra: 1 }
export const p3: Person = tmp // 通过变量赋值不会触发多余属性检查

// 9. type 能做、interface 不能做的事
export type StrOrNum = string | number // 联合类型
export type TupleType = [string, number] // 元组
export type Keys = keyof Person // 'id' | 'name' | 'age'
export type Mapped = { [K in Keys]: boolean } // 映射类型

// 10. 递归类型
export interface TreeNode {
  value: number
  children?: TreeNode[]
}

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

// 11. 类型的兼容性：结构化类型（鸭子类型），只看形状不看名字
interface Point2D {
  x: number
  y: number
}
interface Point3D {
  x: number
  y: number
  z: number
}
const p3d: Point3D = { x: 1, y: 2, z: 3 }
export const p2d: Point2D = p3d // 属性更多的可以赋给更少的

// 12. 选择建议
// - 描述对象 / 类的契约：优先用 interface（可扩展、可合并、报错信息更友好）
// - 联合类型、元组、映射类型、函数类型别名：用 type
// - 团队内保持一致即可
