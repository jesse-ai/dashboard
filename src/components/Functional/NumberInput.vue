<template>
  <div class="flex items-center justify-between">
    <div class="font-semibold font-medium text-gray-700">{{ title }}</div>

    <div class="flex">
      <div class="select-none border py-2 px-4 cursor-pointer bg-gray-100 hover:bg-gray-50 rounded-l" @click="decrease">
        -
      </div>

      <input v-model="object[name]"
             class="border border-gray-200 p-2 text-center focus:outline-none focus:ring-0"
             type="text"
             :name="name" >

      <div class="select-none border py-2 px-4 cursor-pointer bg-gray-100 hover:bg-gray-50 rounded-r" @click="increase">
        +
      </div>
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
  },
  methods: {
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
