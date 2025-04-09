import path, { resolve } from 'node:path'
import * as process from 'node:process'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueRouter from 'unplugin-vue-router/vite'

import { defineConfig } from 'vite'

import { consoleBuildInfo } from 'vite-plugin-build-console'
import vueDevTools from 'vite-plugin-vue-devtools'

const root: string = process.cwd()

/** 路径拼接函数，简化代码 */
const pathResolve = (path: string): string => resolve(root, path)

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
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
    consoleBuildInfo(),
    vueDevTools(),
  ],
  server: {
    open: true,
    port: 5150,
    host: '0.0.0.0',
  },
})
