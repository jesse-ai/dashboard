module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // Custom rules below
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'no-multiple-empty-lines': 0,
    'no-trailing-spaces': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'always',
      asyncArrow: 'always'
    }],
    'prefer-const': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'padded-blocks': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'comma-dangle': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'warn',
    'vue/no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'vue/no-unused-components': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'vue/max-attributes-per-line': ['error', {
      singleline: 4,
      multiline: {
        max: 1,
        allowFirstLine: false
      }
    }],
    'no-extra-semi': 'warn'
  }
}
