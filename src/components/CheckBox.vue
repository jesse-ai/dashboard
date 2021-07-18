<template>
  <div class="flex items-start select-none">
    <div class="h-5 flex items-center">
      <input id="debug_mode" v-model="value"
             name="debug_mode"
             type="checkbox"
             class="focus:ring-0 h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer">
    </div>
    <div class="ml-3 text-sm">
      <label for="debug_mode" class="font-medium text-gray-700 cursor-pointer">{{ title }}</label>
      <p class="text-gray-500">{{ description }}</p>
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
    value: {
      type: Boolean,
      required: true
    }
  },
}
</script>
