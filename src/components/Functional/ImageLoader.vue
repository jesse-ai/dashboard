<template>
  <div class="inline-block relative">
    <slot :setLoaded="setLoaded"/>

    <Spinner
      v-show="!isLoaded"
      class="absolute inset-0 h-full w-full bg-gray-300 dark:bg-gray-500"/>
  </div>
</template>

<script>

import Spinner from '@/components/Functional/Spinner'

export default {
  name: 'ImageLoader',
  components: {
    Spinner
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

