<template>
  <div class="col-span-6 sm:col-span-3">
    <label v-if="title" class="input-label">{{ title }}</label>

    <textarea :id="name"
              v-model="object[name]"
              :name="name"
              :rows="rows"
              class="mt-1 input"
              :placeholder="placeholder" />

    <p v-if="description" class="mt-2 text-sm text-gray-500">{{ description }}</p>
  </div>
</template>


<script>
export default {
  name: 'FormTextarea',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    object: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      required: false,
      default: 8
    }
  }
}
</script>
