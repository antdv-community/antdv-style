import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueTsxAutoProps from 'unplugin-vue-tsx-auto-props/vite'

const baseUrl = fileURLToPath(new URL('.', import.meta.url))
export default defineConfig({
  plugins: [
    vueTsxAutoProps(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      'antdv-style': resolve(baseUrl, '..', 'src'),
    },
  },
})
