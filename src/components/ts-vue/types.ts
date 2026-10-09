// ts-vue 示例共用的类型

export interface User {
  id: number
  name: string
  age?: number
}

/** 后端统一响应结构：data 的类型由泛型决定 */
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export type Theme = 'light' | 'dark'
