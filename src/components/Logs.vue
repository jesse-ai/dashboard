<template>
  <Divider>Logs</Divider>

  <pre class="whitespace-pre-line rounded border bg-gray-50 select-text text-sm w-full px-4 sm:px-6 py-2"
       :class="full ? 'max-h-[90%]' : 'max-h-[48em]'"
  >
    <span v-for="item in logs" :key="item.id" class="block overflow-hidden">[{{
        timestampToTime(item.time)
      }}]: {{ item.message }}</span>
  </pre>
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
      type: Array,
      required: true
    }
  },
  methods: {
    timestampToTime: helpers.timestampToTime,
  }
}
</script>
