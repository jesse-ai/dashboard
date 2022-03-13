<template>
  <span class="relative underline" @mouseenter="showIt" @mouseleave="hideIt">
    <span v-show="show"
          class="absolute -top-10 z-90 bg-gray-900 rounded px-2 py-1 text-sm text-white"
          v-text="title"
    />
    <slot />
  </span>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    title: {
      type: String,
      required: true
    },
  },
  data () {
    return {
      show: false,
    }
  },
  methods: {
    showIt () {
      this.show = true
    },
    hideIt () {
      this.show = false
    }
  }
}
</script>
