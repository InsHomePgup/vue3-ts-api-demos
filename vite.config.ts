import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'
/** 当前执行 node 命令时文件夹的地址（工作目录） */
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
                // 'pinia',
                // '@vueuse/core',
            ],
        }),
        UnoCSS(),
    ],
    server: {
        port: 5150,
        host: '0.0.0.0'
    },
})
