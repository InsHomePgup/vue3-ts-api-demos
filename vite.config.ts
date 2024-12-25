import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue(),
        UnoCSS(),
    ],
    server: {
        port: 5150,
        host: '0.0.0.0'
    },
})
