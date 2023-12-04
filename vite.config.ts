import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueTsxAutoProps from 'vite-plugin-tsx-auto-props'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vueTsxAutoProps(),
    vue(),
    vueJsx(),
    dts({
      outDir: ['es', 'lib'],
      entryRoot: 'src',
    }),
  ],
  build: {
    rollupOptions: {
      external: [
        'vue',
        '@babel/runtime',
        /^ant-design-vue/,
        /^@emotion/,
        '@vueuse/core',
      ],
      output: [
        {
          preserveModulesRoot: 'src',
          preserveModules: true,
          dir: 'es',
          format: 'es',
          entryFileNames: '[name].js',
        },
        {
          preserveModulesRoot: 'src',
          preserveModules: true,
          dir: 'lib',
          format: 'cjs',
          entryFileNames: '[name].js',
          exports: 'named',
        },
      ],
    },
    lib: {
      entry: 'src/index.ts',
      // formats: [
      //   'es',
      //   'cjs',
      // ],
    },
  },
})
