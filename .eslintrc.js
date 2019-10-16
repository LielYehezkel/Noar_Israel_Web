module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'semi': 0,
    'no-extra-semi': 0,
    'quotes': 0,
    'indent': 0,
    'space-before-function-paren': 0
  }
}
