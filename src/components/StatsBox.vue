<template>
  <div class="px-4 py-5 border dark:border-gray-600 rounded overflow-hidden sm:p-6 select-none">
    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
      {{ name }}
    </dt>
    <dd class="mt-1 text-base font-semibold text-gray-900 dark:text-gray-100">
      {{ value }}
    </dd>
  </div>
</template>


<script>
export default {
  name: 'StatsBox',
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
}
</script>
