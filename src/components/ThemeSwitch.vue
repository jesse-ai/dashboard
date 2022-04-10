<template>
  <button id="theme-switch-button" class="btn-nav"
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
import helpers from '@/helpers'

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
    this.theme = helpers.currentTheme()
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
