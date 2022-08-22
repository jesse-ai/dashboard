<template>
  <div class="col-span-6 sm:col-span-3">
    <label
      class="input-label">{{ title }}</label>

    <input v-if="inputType === 'number'"
           v-model="object[name]"
           :name="name"
           type="number"
           :autocomplete="name"
           :placeholder="placeholder"
           :step="step"
           :min="min"
           class="mt-1 input" >

    <input v-else
           v-model="object[name]"
           :name="name"
           :type="inputType"
           :autocomplete="name"
           :placeholder="placeholder"
           class="mt-1 input" >

    <p v-if="description" class="mt-2 text-sm text-gray-500">{{ description }}</p>
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
    },
    description: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    step: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 0
    },
  }
}
</script>
