<template>
  <div v-if="open" class="rounded-md bg-green-50 dark:bg-green-800 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <CheckCircleIcon class="h-5 w-5 text-green-400 dark:text-green-600" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium text-green-800 dark:text-green-200" v-text="message"/>
      </div>
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button type="button"
                  class="inline-flex bg-green-50 dark:bg-green-800 rounded-md p-1.5 text-green-500 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-900 focus:outline-none"
                  @click="open = false">
            <span class="sr-only">Dismiss</span>
            <XIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon, XIcon } from '@heroicons/vue/solid'

export default {
  components: {
    CheckCircleIcon,
    XIcon,
  },
  props: {
    message: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      open: true
    }
  }
}
</script>
