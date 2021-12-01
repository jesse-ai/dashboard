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
    'vue/no-template-shadow': 'off',
    'no-multiple-empty-lines': 0,
    'no-trailing-spaces': process.env.NODE_ENV === 'production' ? 'warn' : 'warn',
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'always',
      asyncArrow: 'always'
    }],
    'prefer-const': process.env.NODE_ENV === 'production' ? 'error' : 'error',
    'padded-blocks': process.env.NODE_ENV === 'production' ? 'warn' : 'warn',
    'comma-dangle': 0,
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'warn',
    'vue/no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'error',
    'vue/no-unused-components': process.env.NODE_ENV === 'production' ? 'error' : 'error',
    'vue/max-attributes-per-line': ['error', {
      singleline: 4,
      multiline: {
        max: 4,
        allowFirstLine: true
      }
    }],
    'no-extra-semi': 'warn',
    'vue/no-mutating-props': 'off',
    'vue/no-v-html': 'off'
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
