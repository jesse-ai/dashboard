<template>
  <div>
    <div class="mt-1 relative rounded-md shadow-sm">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <CalendarIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
      </div>
      <input id="email"
             type="text"
             name="email"
             class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
             placeholder="YYYY-MM-DD">
    </div>
  </div>
</template>

<script>
import { CalendarIcon } from '@heroicons/vue/solid'

export default {
  components: {
    CalendarIcon
  },
}
</script>
