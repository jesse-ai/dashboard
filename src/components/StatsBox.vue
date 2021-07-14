<template>
  <div class="px-4 py-5 border rounded overflow-hidden sm:p-6">
    <dt class="text-sm font-medium text-gray-500 truncate">
      {{ name }}
    </dt>
    <dd class="mt-1 text-base font-semibold text-gray-900">
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
