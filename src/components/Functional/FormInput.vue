<template>
  <div class="col-span-6 sm:col-span-3">
    <label 
      class="block text-sm font-medium text-gray-700">{{ title }}</label>

    <input v-model="object[name]"
           :name="name"
           :type="inputType"
           :autocomplete="name"
           class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" >
  </div>
</template>


<script>
export default {
  name: 'FormInput',
  props: {
    title: {
      type: String,
      required: true
    },
    object: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    inputType: {
      type: String,
      default: 'text'
    }
  }
}
</script>
