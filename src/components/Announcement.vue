<template>
  <div v-if="modals.announcement"
       class="relative bg-indigo-600 dark:bg-indigo-400 select-none text-white dark:text-black">
    <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
      <div class="pr-16 sm:text-center sm:px-16">
        <p class="font-medium">
          <span class="md:inline">
            Big news! We're excited to announce a brand new product.
          </span>
          <span class="block sm:ml-2 sm:inline-block">
            <a href="#" class="font-bold underline"> Learn more <span aria-hidden="true">&rarr;</span></a>
          </span>
        </p>
      </div>
      <div class="absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start">
        <button type="button"
                class="flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-0"
                @click="close"
        >
          <XIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { XIcon } from '@heroicons/vue/outline'
import { mapState } from 'pinia'
import { useMainStore } from '@/stores/main'

export default {
  components: {
    XIcon,
  },
  computed: {
    ...mapState(useMainStore, ['modals']),
  },
  methods: {
    close () {
      this.modals.announcement = false
    },
  },
}
</script>
