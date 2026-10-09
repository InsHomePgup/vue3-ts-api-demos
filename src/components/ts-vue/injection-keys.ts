import type { InjectionKey, Ref } from 'vue'
import type { Theme } from './types'
import { inject } from 'vue'

export interface ThemeContext {
  theme: Ref<Theme>
  toggle: () => void
}

// InjectionKey<T> 把类型绑定在 key 上：provide / inject 时都会自动检查类型
export const ThemeKey: InjectionKey<ThemeContext> = Symbol('theme')

// 封装 inject：找不到 provider 时直接报错，使用方拿到的就是非 undefined 的类型
export function useThemeContext(): ThemeContext {
  const ctx = inject(ThemeKey)
  if (!ctx) {
    throw new Error('useThemeContext 必须在 ThemeKey 的 provider 内使用')
  }
  return ctx
}
