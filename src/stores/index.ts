import localforage from 'localforage'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'

const pinia = createPinia()

pinia.use(createPersistedStatePlugin({
  storage: {
    getItem: async (key) => {
      return localforage.getItem(key)
    },
    setItem: async (key, value) => {
      return localforage.setItem(key, value)
    },
    removeItem: async (key) => {
      return localforage.removeItem(key)
    },
  },
}))
export {
  pinia,
}
export default pinia
