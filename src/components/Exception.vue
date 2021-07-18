<template>
  <Divider>
    Exception
  </Divider>

  <div class="rounded-md bg-red-50  p-4 my-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>

      <div class="ml-3">
        <h3 class="text-base font-medium text-red-800 mb-6" v-text="title"/>

        <pre v-if="content"
             class="mt-2 text-sm text-red-700  whitespace-pre-line px-6 py-6 rounded-md border-2 border-dashed border-red-200 dark:border-red-600"
             v-html="content"/>
      </div>
    </div>
  </div>
</template>

<script>
import { XCircleIcon } from '@heroicons/vue/solid'

export default {
  name: 'Exception',
  components: {
    XCircleIcon,
  },
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: ''
    }
  }
}
</script>
