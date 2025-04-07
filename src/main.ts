import { pinia } from '@/stores/index.js'
import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import 'virtual:uno.css'

const app = createApp(App)
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})
app.use(router)
app.use(pinia)
app.mount('#app')
