import type { Router } from 'vue-router'
import { dirLabels, pageMeta } from '@/catalog/meta'

export interface CatalogItem {
  path: string
  title: string
  desc: string
  tags: string[]
  // page：有路由的 .vue 页面；source：只有源码的 .ts / .md 文件，由 ts/[group]/[name].vue 展示
  // page: a routed .vue page; source: a .ts / .md file shown through ts/[group]/[name].vue
  kind: 'page' | 'source'
  // 所在目录，如 css/layout/flex / directory, e.g. css/layout/flex
  dir: string
}

export interface TreeNode {
  key: string
  label: string
  item?: CatalogItem
  children?: TreeNode[]
}

export const sourceModules = import.meta.glob('/src/pages/ts/*/*.{ts,md}', { query: '?raw', import: 'default' })
export const pageModules = import.meta.glob('/src/pages/**/*.{vue,tsx}', { query: '?raw', import: 'default' })

const SOURCE_EXT = /\.(ts|md)$/

/** 源码文件 → 路由路径 / source file → route path */
export const sourceRoute = (file: string) => file.replace('/src/pages', '').replace(SOURCE_EXT, '')

const dirOrder = Object.keys(dirLabels)
function orderOf(dir: string) {
  const i = dirOrder.indexOf(dir)
  return i === -1 ? dirOrder.length : i
}

function toItem(path: string, kind: CatalogItem['kind']): CatalogItem {
  const segments = path.split('/').filter(Boolean)
  const name = segments.at(-1) ?? path
  const meta = pageMeta[path]
  return {
    path,
    title: meta?.title ?? name,
    desc: meta?.desc ?? '',
    tags: meta?.tags ?? [],
    kind,
    dir: segments.slice(0, -1).join('/'),
  }
}

/** 所有示例：路由里的页面 + 只有源码的 ts 文件 / all demos: routed pages + source-only ts files */
export function buildItems(router: Router): CatalogItem[] {
  const pages = router.getRoutes()
    .filter(r => r.path !== '/' && !r.path.includes(':') && !r.redirect)
    .map(r => toItem(r.path, 'page'))
  const sources = Object.keys(sourceModules).map(file => toItem(sourceRoute(file), 'source'))
  return [...pages, ...sources].sort((a, b) =>
    orderOf(a.dir) - orderOf(b.dir) || a.path.localeCompare(b.path),
  )
}

export function dirLabel(dir: string): string {
  return dirLabels[dir] ?? dir.split('/').at(-1) ?? dir
}

/** 侧栏菜单用的树：目录嵌套，页面作为叶子 / tree for the sidebar: nested directories, pages as leaves */
export function buildTree(items: CatalogItem[]): TreeNode[] {
  const root: TreeNode = { key: '', label: '', children: [] }
  for (const item of items) {
    let node = root
    let acc = ''
    for (const seg of item.dir.split('/').filter(Boolean)) {
      acc = acc ? `${acc}/${seg}` : seg
      const key = `dir:${acc}`
      let child = node.children!.find(c => c.key === key)
      if (!child) {
        child = { key, label: dirLabel(acc), children: [] }
        node.children!.push(child)
      }
      node = child
    }
    node.children!.push({ key: item.path, label: item.title, item })
  }
  // 同级里页面在前、目录在后；目录按 dirLabels 顺序 / leaves first, then directories in dirLabels order
  const sort = (nodes: TreeNode[]) => {
    nodes.sort((a, b) => {
      if (!!a.children !== !!b.children)
        return a.children ? 1 : -1
      return a.children ? orderOf(a.key.slice(4)) - orderOf(b.key.slice(4)) : 0
    })
    nodes.forEach(n => n.children && sort(n.children))
  }
  sort(root.children!)
  return root.children!
}

/** 首页分区：最多取目录前两级 / home sections: grouped by the first two directory levels */
export function sectionKeyOf(dir: string): string {
  return dir.split('/').slice(0, 2).join('/')
}

export function sectionTitle(key: string): string {
  const [top, second] = key.split('/')
  return second ? `${dirLabel(top!)} · ${dirLabel(key)}` : dirLabel(key)
}

let cache: { items: CatalogItem[], tree: TreeNode[], byPath: Map<string, CatalogItem> } | undefined

/** 路由是静态的，只需构建一次 / routes are static, so build once */
export function useCatalog() {
  if (!cache) {
    const items = buildItems(useRouter())
    cache = { items, tree: buildTree(items), byPath: new Map(items.map(i => [i.path, i])) }
  }
  return cache
}
