<template>
  <div v-if="open" class="rounded-md p-4 mb-10" :class="backgroundColor">
    <div class="flex">
      <div class="flex-shrink-0">
        <component :is="icon" class="h-5 w-5 text-green-400" :class="textColor" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium" :class="textColor" v-text="data.message"/>
      </div>
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button type="button"
                  class="inline-flex rounded-md p-1.5 focus:outline-none"
                  :class="textColor"
                  @click="close">
            <span class="sr-only">Dismiss</span>
            <XIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon, XIcon, ExclamationIcon, ExclamationCircleIcon } from '@heroicons/vue/solid'

export default {
  components: {
    CheckCircleIcon,
    XIcon,
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      open: true
    }
  },
  computed: {
    icon () {
      switch (this.data.type) {
        case 'success':
          return CheckCircleIcon
        case 'error':
          return ExclamationIcon
        case 'warning':
          return ExclamationCircleIcon
        default:
          return CheckCircleIcon
      }
    },
    textColor () {
      switch (this.data.type) {
        case 'success':
          return 'text-green-800 dark:text-green-900'
        case 'error':
          return 'text-red-800 dark:text-red-900'
        case 'warning':
          return 'text-yellow-600 dark:text-yellow-700'
        default:
          return 'text-green-800 dark:text-green-900'
      }
    },
    backgroundColor () {
      switch (this.data.type) {
        case 'success':
          return 'bg-green-50 dark:bg-green-500'
        case 'error':
          return 'bg-red-50 dark:bg-red-500'
        case 'warning':
          return 'bg-yellow-100 dark:bg-yellow-300'
        default:
          return 'bg-green-50 dark:bg-green-500'
      }
    },
  },
  methods: {
    close () {
      this.open = false
    }
  }
}
</script>
