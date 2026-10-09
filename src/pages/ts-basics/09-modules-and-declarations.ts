// ============================================================
// 09 模块、声明文件与类型扩展：使用第三方库时最常遇到的部分
// ============================================================

// 1. import type / export type：只导入类型，编译后会被擦除
// （isolatedModules 下，仅作类型使用时建议显式写 type）
import type { Person } from './02-interface-and-alias.js'
import type { CreateUserOpts } from './03-functions.js'
import { createUser } from './03-functions.js'
// 也可以写成行内形式：import { type CreateUserOpts, createUser } from '...'（本项目 lint 规则要求拆开写）
export type { CreateUserOpts, Person }
export { createUser }

// 2. 声明文件 .d.ts：只有类型，没有实现
// - 给没有类型的 JS 库补类型
// - 库自带：package.json 的 "types" 字段；或安装 @types/xxx（DefinitelyTyped）
// - 项目里常见：env.d.ts / vite-env.d.ts / auto-imports.d.ts / typed-router.d.ts

// 3. declare：声明一个"已存在"的变量 / 函数 / 类型（不生成代码）
declare const __APP_VERSION__: string // 例如构建工具通过 define 注入的全局常量
export const version = typeof __APP_VERSION__ === 'undefined' ? 'dev' : __APP_VERSION__

declare function legacyApi(id: number): string
export const useLegacy = typeof legacyApi

// 4. 全局类型扩展：在模块文件（有 import / export）里用 declare global
declare global {
  interface Window {
    __DEMO__?: string
  }
}
export const demo = window.__DEMO__

// 5. 模块扩展 module augmentation：给第三方库补充类型，常见于 Vue / Vue Router / Pinia
// 需放在 .d.ts 或模块文件中，且要先 import 该模块，否则会变成"覆盖"而不是"扩展"
//
// import 'vue-router'
// declare module 'vue-router' {
//   interface RouteMeta {
//     title?: string
//     requiresAuth?: boolean
//   }
// }
//
// 给 .vue 文件补类型（vite-env.d.ts 里常见）：
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const component: DefineComponent<object, object, any>
//   export default component
// }
//
// 声明环境变量类型：
// interface ImportMetaEnv {
//   readonly VITE_API_URL: string
// }

// 6. 命名空间 namespace：历史写法，现在优先用 ES 模块；多见于旧的 .d.ts
// eslint-disable-next-line ts/no-namespace
export namespace Geometry {
  export interface Point {
    x: number
    y: number
  }
  export function distance(a: Point, b: Point): number {
    return Math.hypot(a.x - b.x, a.y - b.y)
  }
}
export type GeoPoint = Geometry.Point

// 7. 三斜线指令：引入类型依赖，现代项目里多用 tsconfig 的 types 选项代替
// /// <reference types="vite/client" />

// 8. 类型导入的两种来源
// - import type { X } from 'lib'：lib 自带或 @types 提供的类型
// - import('lib').X：类型位置的动态导入，不需要顶层 import
export type Lazy = import('./02-interface-and-alias.js').Config

// 9. 动态导入的类型推断
export async function loadFunctions() {
  const mod = await import('./03-functions.js')
  return mod.add(1, 2)
}

// 10. 从声明文件里读类型的方法（学库时最实用）
// - 编辑器里 Ctrl/Cmd + 点击 跳转到定义，或 F12
// - 悬浮查看展开后的类型；类型太复杂时用 Simplify（见 07）展开
// - 看 node_modules/xxx/*.d.ts 或 @types/xxx
// - 重点读懂：泛型参数、函数重载、条件类型和 infer
