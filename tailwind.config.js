module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xl: ['30px', '36px'], // H1
        lg: ['24px', '32px'], // H2
        base: ['16px', '24px'],
        sm: ['14px', '20px'],
        caption: ['12px', '16px']
      },
      colors: {
        primary: {
          DEFAULT: '#4f46e5'
        }
      },
      fontFamily: {
        sans: [
          '"Proxima Nova"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'
        ]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [],
  corePlugins: {
    container: false
  }
}
