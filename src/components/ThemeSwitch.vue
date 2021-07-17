<template>
  <span class="relative z-0 inline-flex shadow-sm rounded-md">
    <button
      type="button"
      :class="{ 'selected': theme === 'light' }"
      class="switch-btn rounded-l-md"
      @click="setTheme('light')">
      <SunIcon class="w-4 h-4 mr-1"/>

      Light
    </button>

    <button
      type="button"
      :class="{ 'selected': theme === 'dark' }"
      class="-ml-px switch-btn rounded-r-md"
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
import { mapWritableState } from 'pinia'
import { useMainStore } from '@/stores/main'

export default {
  name: 'ThemeSwitch',
  components: {
    MoonIcon,
    SunIcon
  },
  computed: {
    ...mapWritableState(useMainStore, [
      'theme'      
    ])
  },
  beforeMount () {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.theme = 'dark'
    } else {
      this.theme = 'light'
    }
  },
  methods: {
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
  .switch-btn {
    @apply relative inline-flex items-center px-4 py-1 text-sm font-medium focus:z-10;
    @apply border border-gray-200 dark:border-gray-600;
    @apply bg-transparent;
    @apply text-gray-600 dark:text-gray-500;
    @apply focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary dark:focus:ring-primary-dark dark:focus:border-primary-dark;
  }
  .switch-btn.selected {
    @apply bg-gray-100 dark:bg-backdrop-secondary-dark;
  }
</style>
