<template>
  <div class="relative mb-4 select-none">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t-2 border-dashed border-gray-300 dark:border-gray-600" />
    </div>
    <div class="relative flex justify-start">
      <span class="pr-3 bg-white dark:bg-backdrop-dark text-lg font-medium text-gray-900 dark:text-gray-100"
            v-text="title"/>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Divider',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  // define a bool property that if true, will allow to toggle the content
}
</script>
