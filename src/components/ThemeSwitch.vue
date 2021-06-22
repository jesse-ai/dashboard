<template>
  <span class="relative z-0 inline-flex shadow-sm rounded-md">
    <button
      type="button"
      :class="{ 'selected': theme === 'light' }"
      class="relative inline-flex items-center px-4 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      @click="setTheme('light')">
      <SunIcon class="w-4 h-4 mr-1"/>

      Light
    </button>

    <button
      type="button"
      :class="{ 'selected': theme === 'dark' }"
      class="-ml-px relative inline-flex items-center px-4 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      @click="setTheme('dark')">
      <MoonIcon class="w-4 h-4 mr-1"/>

      Dark
    </button>
  </span>
</template>

<script>

import {
  MoonIcon,
  SunIcon
} from '@heroicons/vue/outline'

export default {
  name: 'ThemeSwitch',
  components: {
    MoonIcon,
    SunIcon
  },
  data () {
    return {
      theme: localStorage.theme
    }
  },
  beforeMount () {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.theme = 'dark'
    } else {
      this.theme = 'light'
    }
  },
  methods: {
    toggleTheme () {
      if (!this.theme || this.theme === 'light') {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
        this.theme = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
        this.theme = 'light'
      }
    },
    setTheme (theme) {
      if (theme === 'light') {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
        this.theme = 'light'
      } else if (theme === 'dark') {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
        this.theme = 'dark'
      }
    }
  }
}
</script>

<style scoped>
  .selected {
    @apply bg-gray-100
  }
</style>
