import { resolve } from 'node:path'
import * as process from 'node:process'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueRouter from 'unplugin-vue-router/vite'

import { defineConfig } from 'vite'

const root: string = process.cwd()

/** 路径拼接函数，简化代码 */
const pathResolve = (path: string): string => resolve(root, path)

export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: pathResolve('src') },
    ],
  },
  plugins: [
    VueRouter(),
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          pinia: ['useCounterStore'],
        },
        // '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts', // 自动生成 dts 文件
    }),
    UnoCSS(),
  ],
  server: {
    port: 5150,
    host: '0.0.0.0',
  },
})
