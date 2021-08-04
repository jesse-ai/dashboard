<template>
  <div class="relative mb-4 select-none">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t-2 border-dashed border-gray-300 dark:border-gray-600"/>
    </div>

    <!-- Trading Routes-->
    <div class="relative flex items-center justify-between">
      <span class="pr-3 bg-white dark:bg-backdrop-dark text-lg font-medium text-gray-900 dark:text-gray-200" v-text="title"/>

      <span>
        <slot/>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DividerWithButtons',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
