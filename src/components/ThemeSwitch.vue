<template>
  <ImageLoader
    v-slot="{ setLoaded }"
    class="w-6 h-6 cursor-pointer"
    @click="switchTheme">
    <InlineSvg
      class="text-gray-600"
      :src="iconSource"
      @loaded="setLoaded"/>
  </ImageLoader>
</template>

<script>
import moonStarsSVG from '@/assets/svg/moon-stars.svg'
import sunSVG from '@/assets/svg/sun.svg'
import ImageLoader from '@/components/Functional/ImageLoader'
import InlineSvg from 'vue-inline-svg'

export default {
  name: 'ThemeSwitch',
  components: {
    ImageLoader,
    InlineSvg
  },
  setup () {
    return {
      moonStarsSVG
    }
  },
  data () {
    return {
      theme: localStorage.theme
    }
  },
  computed: {
    iconSource () {
      return this.theme === 'dark' ? sunSVG : moonStarsSVG
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

