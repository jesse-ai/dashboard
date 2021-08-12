<template>
  <button class="p-1 mx-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
          @click="toggle">
    <MoonIcon v-if="theme === 'light'"
              class="h-6 w-6"
              aria-hidden="true"/>

    <SunIcon v-if="theme === 'dark'"
             class="h-6 w-6"
             aria-hidden="true"/>
  </button>
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
    toggle () {
      const theme = this.theme === 'light' ? 'dark' : 'light'
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
