import mist from '@mistjs/eslint-config'

export default mist({
  ignores: [
    'tsconfig.*.json',
    'tsconfig.json',
    'es',
    'lib',
  ],
}, {
  rules: {
    'vars-on-top': 0,
  },
})
