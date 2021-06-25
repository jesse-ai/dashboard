<template>
  <input :id="name"
         type="date"
         :name="name"
         class="focus:ring-indigo-500 focus:border-indigo-500 flex justify-center items-center w-48 text-center sm:text-sm border-gray-300 rounded-md"
  >
</template>

<script>

export default {
  name: 'DatePicker',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
