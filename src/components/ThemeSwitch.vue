<template>
  <div @click="switchTheme">
    theme: {{ theme }}
  </div>
</template>

<script>

export default {
  name: 'ThemeSwitch',
  components: {},
  data () {
    return {
      theme: localStorage.theme
    }
  },
  computed: {
  },
  beforeMount () {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.theme = 'dark'
    } else {
      this.theme = 'light'
    }
  },
  methods: {
    switchTheme () {
      if (!this.theme || this.theme === 'light') {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
        this.theme = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
        this.theme = 'light'
      }
    }
  }
}
</script>

