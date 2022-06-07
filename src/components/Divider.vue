<template>
  <div class="relative mb-4 select-none">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t-2 border-dashed border-gray-300 dark:border-gray-600" />
    </div>
    <div class="relative flex justify-start">
      <span class="pr-3 text-lg font-medium text-gray-900 dark:text-gray-100"
            :class="backgroundClasses"
            v-text="title"/>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Divider',
  props: {
    title: {
      type: String,
      required: true
    },
    bgLight: {
      type: String,
      required: false,
      default: 'bg-white'
    },
    bgDark: {
      type: String,
      required: false,
      default: 'dark:bg-backdrop-dark'
    }
  },
  computed: {
    /**
     * returns a string based on what's in the bgLight and bgDark props
     */
    backgroundClasses () {
      return this.bgLight + ' ' + this.bgDark
    }
  }
}
</script>
