import type { Ref } from 'vue'
import { ref } from 'vue'

// 返回元组：用 readonly [...] 固定每一项的类型，解构时才能得到正确的类型
export function useToggle(initial = false): readonly [Ref<boolean>, () => void] {
  const state = ref(initial)

  function toggle(): void {
    state.value = !state.value
  }

  return [state, toggle] as const
}
