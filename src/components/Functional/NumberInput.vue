<template>
  <div class="flex items-center justify-between">
    <div class="font-semibold font-medium text-gray-700 dark:text-gray-200">
      {{ title }}
    </div>

    <div class="flex">
      <button class="select-none border py-2 px-4 cursor-pointer bg-gray-100 hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-900 dark:border-gray-900 rounded-l" @click="decrease">
        -
      </button>

      <input v-model="object[name]"
             class="border border-gray-200 p-2 text-center focus:outline-none focus:ring-0 dark:bg-gray-800 dark:border-gray-900"
             type="text"
             :name="name" >

      <button class="select-none border py-2 px-4 cursor-pointer bg-gray-100 hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-900 dark:border-gray-900 rounded-r" @click="increase">
        +
      </button>
    </div>
  </div>
</template>

<script>
export default {
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
    default: {
      type: Number,
      default: 1
    }
  },
  created () {
    this.setDefault()
  },
  methods: {
    setDefault () {
      // if no option is selected, set default value.
      if (!this.object[this.name]) {
        this.object[this.name] = this.default
      }
    },
    increase () {
      this.object[this.name]++
    },
    decrease () {
      if (this.object[this.name] > 1) {
        this.object[this.name]--
      }
    },
  },
}
</script>
