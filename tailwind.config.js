const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.vue', './src/**/*.js'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      green: colors.teal,
      red: colors.red,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      yellow: colors.amber,
      'cool-gray': colors.coolGray,
      pink: colors.pink,
      blue: colors.blue,
      purple: colors.purple,
      primary: {
        DEFAULT: '#4f46e5',
        dark: '#f9b537'
      },
      // Background colors
      backdrop: {
        DEFAULT: '#ffffff',
        dark: '#333333'
      },
      // Background secondary colors
      'backdrop-secondary': {
        DEFAULT: '#f3f3f6',
        dark: '#282828'
      },
      // Text colors
      body: {
        DEFAULT: '#333333',
        dark: '#f6f7ee'
      }
    },
    extend: {
      fontSize: {
        xl: ['30px', '36px'], // H1
        lg: ['24px', '32px'], // H2
        base: ['16px', '24px'],
        sm: ['14px', '20px'],
        caption: ['12px', '16px']
      },
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  corePlugins: {}
}
