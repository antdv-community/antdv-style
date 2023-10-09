import mist from '@mistjs/eslint-config'

export default mist({
  vue: true,
  vueJsx: true,
  typescript: true,
  gitignore: true,
  markdown: true,
  ignores: [
    'tsconfig.*.json',
    'tsconfig.json',
    'es',
    'lib',
  ],
}, {
  rules: {
    'vars-on-top': 'off',
  },
})
