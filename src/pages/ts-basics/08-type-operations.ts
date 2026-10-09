// ============================================================
// 08 类型运算：keyof / typeof / 索引访问 / 条件类型 / 映射类型 / 模板字面量
// 平时主要用于"读懂"库的类型，自己写的机会相对少
// 08 Type operations: keyof / typeof / indexed access / conditional types / mapped types / template literals
// Mainly used to "read" library types; you rarely write them yourself
// ============================================================

export const person = { name: 'foo', age: 18, tags: ['a', 'b'] }

// 1. typeof：从值得到类型
// 1. typeof: get a type from a value
export type Person = typeof person // { name: string, age: number, tags: string[] }

// 2. keyof：取对象类型的所有键，得到联合类型
// 2. keyof: get all keys of an object type as a union
export type PersonKeys = keyof Person // 'name' | 'age' | 'tags'

// 3. 索引访问类型 T[K]
// 3. Indexed access type T[K]
export type NameType = Person['name'] // string
export type NameOrAge = Person['name' | 'age'] // string | number
export type Tag = Person['tags'][number] // string
export type AllValues = Person[keyof Person] // string | number | string[]

// 4. as const：推断为只读字面量，常配合 typeof 得到联合类型
// 4. as const: infer readonly literals, often combined with typeof to get a union
export const ROLES = ['admin', 'user', 'guest'] as const
export type RoleType = (typeof ROLES)[number] // 'admin' | 'user' | 'guest'

export const HTTP = { OK: 200, NOT_FOUND: 404 } as const
export type HttpCode = (typeof HTTP)[keyof typeof HTTP] // 200 | 404

// 5. satisfies（TS 4.9）：校验类型的同时保留精确的推断
// 5. satisfies (TS 4.9): validate the type while keeping precise inference
export const routes = {
  home: '/',
  about: '/about',
} satisfies Record<string, string>
export type RouteName = keyof typeof routes // 'home' | 'about'（用 : Record<string, string> 注解会丢失） | Lost if annotated with : Record<string, string>

// 6. 条件类型：T extends U ? X : Y
// 6. Conditional types: T extends U ? X : Y
export type IsString<T> = T extends string ? true : false
export type R1 = IsString<'a'> // true
export type R2 = IsString<1> // false

// 7. 分布式条件类型：对联合类型会逐个分发
// 7. Distributive conditional types: distribute over each member of a union
export type ToArray<T> = T extends unknown ? T[] : never
export type R3 = ToArray<string | number> // string[] | number[]

// 用 [] 包裹可以关闭分发
// Wrapping in [] turns off distribution
export type ToArrayNoDist<T> = [T] extends [unknown] ? T[] : never
export type R4 = ToArrayNoDist<string | number> // (string | number)[]

// 8. infer：在条件类型中"提取"类型
// 8. infer: "extract" a type inside a conditional type
export type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never
export type MyParameters<T> = T extends (...args: infer P) => any ? P : never
export type ElementOf<T> = T extends (infer E)[] ? E : never
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

export type R5 = MyReturnType<() => string> // string
export type R6 = ElementOf<number[]> // number
export type R7 = UnwrapPromise<Promise<boolean>> // boolean

// 9. 映射类型：遍历键生成新类型
// 9. Mapped types: iterate over keys to build a new type
export type MyPartial<T> = { [K in keyof T]?: T[K] }
export type MyReadonly<T> = { readonly [K in keyof T]: T[K] }
export type MyRequired<T> = { [K in keyof T]-?: T[K] } // -? 去掉可选 | -? removes optional
export type Mutable<T> = { -readonly [K in keyof T]: T[K] } // -readonly 去掉只读 | -readonly removes readonly
export type Booleans<T> = { [K in keyof T]: boolean }

// 10. 键重映射 as：改名或过滤键
// 10. Key remapping with as: rename or filter keys
export type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}
export type PersonGetters = Getters<Person> // { getName: () => string, getAge: ..., getTags: ... }

export type OnlyStringKeys<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K]
}
export type StrProps = OnlyStringKeys<Person> // { name: string }

// 11. 模板字面量类型
// 11. Template literal types
export type EventName = 'click' | 'focus'
export type Handler = `on${Capitalize<EventName>}` // 'onClick' | 'onFocus'
export type CssUnit = `${number}px` | `${number}rem`
export const width: CssUnit = '100px'

// 12. 递归类型
// 12. Recursive types
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
}

// 13. 联合转交叉、元组操作等更复杂的"类型体操"
// 13. Union to intersection, tuple operations and other more complex "type gymnastics"
export type First<T extends unknown[]> = T extends [infer F, ...unknown[]] ? F : never
export type Last<T extends unknown[]> = T extends [...unknown[], infer L] ? L : never
export type R8 = First<[1, 2, 3]> // 1
export type R9 = Last<[1, 2, 3]> // 3

// 14. 常见组合：从函数/对象推导类型，避免重复声明
// 14. Common combo: derive types from functions/objects to avoid duplicate declarations
function createStore() {
  return { count: 0, inc() {} }
}
export type Store = ReturnType<typeof createStore>

// 提示：类型体操不必精通，只要能读懂库里的类型定义（infer / extends / 映射）即可
// Tip: no need to master type gymnastics; just be able to read library type definitions (infer / extends / mapped types)
