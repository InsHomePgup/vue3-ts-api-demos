import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
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
