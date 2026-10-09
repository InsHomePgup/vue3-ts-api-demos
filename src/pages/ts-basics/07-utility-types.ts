// ============================================================
// 07 内置工具类型：TS 自带，日常开发最常用
// ============================================================

interface User {
  id: number
  name: string
  age: number
  email?: string
}

// ---------- 对象属性相关 ----------

// 1. Partial<T>：所有属性变可选
export type PartialUser = Partial<User>

// 2. Required<T>：所有属性变必选
export type RequiredUser = Required<User>

// 3. Readonly<T>：所有属性变只读（浅层）
export type ReadonlyUser = Readonly<User>

// 4. Pick<T, K>：挑选部分属性
export type UserBasic = Pick<User, 'id' | 'name'>

// 5. Omit<T, K>：排除部分属性
export type UserWithoutAge = Omit<User, 'age'>

// 6. Record<K, V>：构造 key 为 K、值为 V 的对象类型
export type RoleMap = Record<'admin' | 'user', string[]>
export type IdMap = Record<number, User>

// ---------- 联合类型相关 ----------
type Status = 'pending' | 'done' | 'error' | null | undefined

// 7. Exclude<U, E>：从联合类型中排除
export type NotError = Exclude<Status, 'error'>

// 8. Extract<U, E>：从联合类型中提取
export type OnlyStr = Extract<Status, string>

// 9. NonNullable<T>：排除 null 和 undefined
export type DefinedStatus = NonNullable<Status>

// ---------- 函数相关 ----------
function createUser(name: string, age: number): User {
  return { id: 1, name, age }
}

// 10. Parameters<F> / ReturnType<F>
export type CreateUserParams = Parameters<typeof createUser> // [name: string, age: number]
export type CreateUserReturn = ReturnType<typeof createUser> // User

// 11. ConstructorParameters<C> / InstanceType<C>
class Foo {
  constructor(public a: string, public b: number) {}
}
export type FooParams = ConstructorParameters<typeof Foo> // [a: string, b: number]
export type FooInstance = InstanceType<typeof Foo> // Foo

// 12. Awaited<T>：取出 Promise 的最终结果类型
export type A1 = Awaited<Promise<string>> // string
export type A2 = Awaited<Promise<Promise<number>>> // number
export type UserResult = Awaited<ReturnType<typeof fetchUser>>
async function fetchUser(): Promise<User> {
  return { id: 1, name: 'foo', age: 18 }
}

// ---------- 字符串相关 ----------

// 13. Uppercase / Lowercase / Capitalize / Uncapitalize
export type Upper = Uppercase<'abc'> // 'ABC'
export type Cap = Capitalize<'abc'> // 'Abc'

// ---------- 组合使用（常见业务场景） ----------

// 14. 创建表单：id 由后端生成，其余字段必填
export type CreateUserForm = Omit<User, 'id'>

// 15. 更新表单：id 必填，其余可选
export type UpdateUserForm = Pick<User, 'id'> & Partial<Omit<User, 'id'>>

// 16. 让指定的几个属性变成可选
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type UserOptionalAge = PartialBy<User, 'age'>

// 17. 取数组元素类型
export type Arr = string[]
export type Item = Arr[number] // string

// 18. 让交叉类型展开成一个对象，便于悬浮提示查看
export type Simplify<T> = { [K in keyof T]: T[K] } & {}
export type Flat = Simplify<UpdateUserForm>

// 其他：NoInfer<T>（TS 5.4）、ThisParameterType、OmitThisParameter、ThisType 等较少使用，用到时查文档
