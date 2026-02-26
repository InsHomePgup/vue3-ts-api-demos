import {
  defineConfig,
  presetUno,
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'

export default defineConfig({
  presets: [
    presetUno(),
    presetAnimations(),
  ],
})
