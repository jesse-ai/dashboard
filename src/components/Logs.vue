<template>
  <Divider>Logs</Divider>

  <pre class="whitespace-pre-line rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 select-text text-sm dark:text-gray-300 w-full px-4 sm:px-6 py-2"
       :class="full ? 'max-h-[90%]' : 'max-h-[48em]'" v-html="logs"
  />
</template>

<script>
import helpers from '@/helpers'


export default {
  name: 'Logs',
  props: {
    full: {
      type: Boolean,
      default: true
    },
    logs: {
      type: String,
      required: true
    }
  },
  methods: {
    timestampToTime: helpers.timestampToTime,
  }
}
</script>
