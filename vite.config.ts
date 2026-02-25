import path, { resolve } from 'node:path'
import * as process from 'node:process'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

import Components from 'unplugin-vue-components/vite'

import { defineConfig } from 'vite'

import { consoleBuildInfo } from 'vite-plugin-build-console'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'vue-router/vite'

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
    VueRouter({
      dts: 'src/typed-router.d.ts',
    }),
    vue(),
    vueJsx(),
    Components({
      dirs: ['src/components', 'src/layouts'], // 添加layouts目录
      extensions: ['vue', 'tsx'], // 支持tsx组件
      globs: ['src/components/*.{vue,tsx}', 'src/layouts/*.{vue,tsx}'],
      deep: true, // 深度扫描子目录
      dts: 'src/components.d.ts', // 类型声明文件
      directoryAsNamespace: true, // 使用目录作为命名空间
      globalNamespaces: ['global'], // 全局命名空间
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/], // 包含的文件类型
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/], // 排除的目录
      resolvers: [
        // 可以添加UI库解析器，例如：
        // (name) => {
        //   if (name.startsWith('El'))
        //     return { importName: name.slice(2), path: 'element-plus' }
        // }
      ],
      types: [{
        from: 'vue-router',
        names: ['RouterLink', 'RouterView'],
      }],
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          axios: [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
            // named imports
            'AxiosInstance',
            'AxiosRequestConfig',
            'AxiosResponse',
          ],
        },
        {
          pinia: ['useCounterStore'],
        },
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
