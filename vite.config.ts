import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
export default defineConfig({
    plugins: [
        VueRouter(),
        vue(),
        UnoCSS(),
    ],
    server: {
        port: 5150,
        host: '0.0.0.0'
    },
})
