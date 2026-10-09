import type { Ref } from 'vue'
import { shallowRef } from 'vue'

export interface UseAsyncDataReturn<T> {
  data: Ref<T | null>
  error: Ref<Error | null>
  loading: Ref<boolean>
  execute: () => Promise<void>
}

// 泛型 composable：T 由 fetcher 的返回值推断
// 这里用 shallowRef：ref<T> 会把 T 递归解包成 UnwrapRef<T>，在泛型函数里无法和 Ref<T> 对上
export function useAsyncData<T>(fetcher: () => Promise<T>): UseAsyncDataReturn<T> {
  const data = shallowRef<T | null>(null)
  const error = shallowRef<Error | null>(null)
  const loading = shallowRef(false)

  async function execute(): Promise<void> {
    loading.value = true
    error.value = null
    try {
      data.value = await fetcher()
    }
    catch (e) {
      // catch 里的 e 是 unknown，需要收窄
      error.value = e instanceof Error ? e : new Error(String(e))
    }
    finally {
      loading.value = false
    }
  }

  return { data, error, loading, execute }
}
