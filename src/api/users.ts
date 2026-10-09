import type { AxiosAdapter, AxiosRequestConfig } from 'axios'
import type { ApiResponse, User } from '@/components/ts-vue/types'
import axios from 'axios'

// 用自定义 adapter 模拟后端，示例不依赖真实网络
const mockAdapter: AxiosAdapter = async (config) => {
  const body: ApiResponse<User[]> = {
    code: 0,
    message: 'ok',
    data: [
      { id: 1, name: '张三', age: 20 },
      { id: 2, name: '李四' },
    ],
  }
  return { data: body, status: 200, statusText: 'OK', headers: {}, config }
}

export const http = axios.create({ baseURL: '/api', adapter: mockAdapter })

// 统一封装：调用方只需要指定业务数据 T，不用关心外层的 ApiResponse
export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const res = await http.request<ApiResponse<T>>(config)
  if (res.data.code !== 0) {
    throw new Error(res.data.message)
  }
  return res.data.data
}

export function getUsers(): Promise<User[]> {
  return request<User[]>({ url: '/users' })
}
