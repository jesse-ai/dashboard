<template>
  <div class="inline-block relative">
    <slot :setLoaded="setLoaded"/>

    <CubeSpinner
      v-show="!isLoaded"
      class="absolute inset-0 h-full w-full bg-gray-300 dark:bg-gray-500"/>
  </div>
</template>

<script>

import CubeSpinner from '@/components/Functional/Spinner'

export default {
  name: 'ImageLoader',
  components: {
    CubeSpinner
  },
  data () {
    return {
      isLoaded: false
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
    setLoaded () {
      this.isLoaded = true
    }
  }
}
</script>

