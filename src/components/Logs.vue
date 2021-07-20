<template>
  <pre
    class="whitespace-pre-line rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 select-text text-sm dark:text-gray-300 w-full px-4 sm:px-6 py-2"
    v-html="logs"
  />
</template>

<script>
import helpers from '@/helpers'

export default {
  name: 'Logs',
  props: {
    logs: {
      type: String,
      required: true
    }
  },
  setup () {
    return {
      timestampToTime: helpers.timestampToTime
    }
  },
}
</script>
