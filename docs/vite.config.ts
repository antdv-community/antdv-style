import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

const baseUrl = fileURLToPath(new URL('.', import.meta.url))
export default defineConfig({
  plugins: [
    vueJsx(),
  ],
  resolve: {
    alias: {
      'antdv-style': resolve(baseUrl, '..', 'src'),
    },
  },
})
