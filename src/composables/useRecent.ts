// 最近访问的页面，存在 localStorage；读写失败时静默忽略
// Recently visited pages stored in localStorage; failures are silently ignored
const KEY = 'recent-pages'
const MAX = 6

export const recent = ref<string[]>(read())

function read(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(v) ? v.filter(x => typeof x === 'string') : []
  }
  catch {
    return []
  }
}

export function pushRecent(path: string) {
  recent.value = [path, ...recent.value.filter(p => p !== path)].slice(0, MAX)
  try {
    localStorage.setItem(KEY, JSON.stringify(recent.value))
  }
  catch {}
}
