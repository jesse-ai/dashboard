<template>
  <div class="flex items-start select-none">
    <div class="h-5 flex items-center">
      <input :id="value" v-model="form[value]"
             type="checkbox"
             :name="value"
             :class="[form[value] ? 'dark:border-gray-600' : 'dark:border-gray-500', 'focus:ring-0 h-4 w-4 text-indigo-600 dark:text-gray-600 dark:bg-gray-600 border-gray-300 focus:ring-offset-0 rounded cursor-pointer']"
      >
    </div>
    <div class="ml-3 text-sm">
      <label :for="value" class="font-medium text-gray-700 dark:text-gray-200 cursor-pointer">{{ title }}</label>
      <p class="text-gray-500 dark:text-gray-400">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  components: {},
  props: {
    description: {
      type: String,
      required: false,
      default: '' 
    },
    title: {
      type: String,
      required: true
    },
    form: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
  },
}
</script>
