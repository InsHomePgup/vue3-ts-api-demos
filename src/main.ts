import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import {createPersistedStatePlugin} from "pinia-plugin-persistedstate-2";

import { routes } from 'vue-router/auto-routes'
import 'virtual:uno.css'

import { createPinia } from 'pinia'
const pinia = createPinia()
const persistedStatePlugin = createPersistedStatePlugin({
})
pinia.use(persistedStatePlugin)

const app = createApp(App)
const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL),
})
app.use(router)
app.use(pinia)
app.mount('#app')
