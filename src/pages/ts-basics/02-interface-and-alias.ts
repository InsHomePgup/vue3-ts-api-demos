// ============================================================
// 02 interface 与 type：描述对象的形状
// 02 interface and type: describing the shape of objects
// ============================================================

// 1. interface 基本写法：必选 / 可选 / 只读
// 1. Basic interface syntax: required / optional / readonly
export interface Person {
  readonly id: number
  name: string
  age?: number
}

export const p: Person = { id: 1, name: 'foo' }
// p.id = 2 // 报错：只读 | Error: readonly

// 2. 继承 extends（可多继承）
// 2. Inheritance with extends (multiple inheritance allowed)
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
// 3. type alias: use intersection types & to achieve inheritance-like behavior
export type Teacher = Person & { subject: string }

// 4. 声明合并：同名 interface 会自动合并（type 不行）
// 4. Declaration merging: interfaces with the same name merge automatically (type cannot)
export interface Config {
  host: string
}
export interface Config {
  port: number
}
export const config: Config = { host: 'localhost', port: 80 }

// 5. 索引签名：属性名不确定时使用
// 5. Index signatures: use when property names are not known in advance
export interface StringMap {
  [key: string]: number
}
export const scores: StringMap = { math: 90, english: 80 }
// eslint-disable-next-line dot-notation
export const math = scores['math'] // 开启 noPropertyAccessFromIndexSignature 后，索引签名的属性必须用方括号访问 | With noPropertyAccessFromIndexSignature enabled, index-signature properties must be accessed with brackets

// 已知属性必须兼容索引签名的值类型
// Known properties must be compatible with the index signature value type
export interface Mixed {
  [key: string]: string | number
  name: string
  age: number
}

// 6. 函数类型 / 构造函数类型
// 6. Function types / constructor types
export interface Add {
  (a: number, b: number): number
}
export const add: Add = (a, b) => a + b

export interface PersonCtor {
  new (name: string): { name: string }
}

// 带属性的函数（函数也是对象）
// Function with properties (functions are objects too)
export interface Counter {
  (): number
  count: number
}

// 7. 方法的两种写法
// 7. Two ways to write methods
export interface Methods {
  methodStyle: (x: number) => void // 属性写法：strictFunctionTypes 下参数双向协变检查更严格 | Property style: stricter (contravariant) parameter checking under strictFunctionTypes
  // eslint-disable-next-line ts/method-signature-style
  method(x: number): void // 方法写法：参数检查更宽松（bivariant） | Method style: looser parameter checking (bivariant)
}

// 8. 多余属性检查：字面量直接赋值时，不允许出现类型中没有的属性
// 8. Excess property check: object literals assigned directly cannot contain properties not in the type
// const p2: Person = { id: 1, name: 'foo', extra: 1 } // 报错 | Error
const tmp = { id: 1, name: 'foo', extra: 1 }
export const p3: Person = tmp // 通过变量赋值不会触发多余属性检查 | Assigning through a variable does not trigger the excess property check

// 9. type 能做、interface 不能做的事
// 9. Things type can do but interface cannot
export type StrOrNum = string | number // 联合类型 | Union type
export type TupleType = [string, number] // 元组 | Tuple
export type Keys = keyof Person // 'id' | 'name' | 'age'
export type Mapped = { [K in Keys]: boolean } // 映射类型 | Mapped type

// 10. 递归类型
// 10. Recursive types
export interface TreeNode {
  value: number
  children?: TreeNode[]
}

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

// 11. 类型的兼容性：结构化类型（鸭子类型），只看形状不看名字
// 11. Type compatibility: structural typing (duck typing), only the shape matters, not the name
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
export const p2d: Point2D = p3d // 属性更多的可以赋给更少的 | A type with more properties can be assigned to one with fewer

// 12. 选择建议
// 12. Recommendations
// - 描述对象 / 类的契约：优先用 interface（可扩展、可合并、报错信息更友好）
// - Describing an object / class contract: prefer interface (extendable, mergeable, friendlier error messages)
// - 联合类型、元组、映射类型、函数类型别名：用 type
// - Unions, tuples, mapped types, function type aliases: use type
// - 团队内保持一致即可
// - Just stay consistent within the team
