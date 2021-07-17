<template>
  <div class="flex flex-col select-none">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="border dark:border-gray-600 overflow-hidden sm:rounded">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead v-if="header" class="bg-gray-50 dark:bg-backdrop-dark select-none">
              <tr>
                <th v-for="item in headerItems" :key="item" scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {{ item }}
                </th>
              </tr>
            </thead>

            <tbody v-if="dataItems.length">
              <tr v-for="(d, index) in dataItems" :key="index"
                  :class="index % 2 === 0 ? 'bg-white dark:bg-gray-700' : 'bg-gray-50 dark:bg-backdrop-dark'">
                <td v-for="(item, subIndex) in d" :key="item" class=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200"
                    v-text="d[subIndex]" />
              </tr>
            </tbody>
          </table>

          <div v-if="!dataItems.length" class="text-center text-xs dark:bg-gray-700 py-4 opacity-30 dark:opacity-75 select-none">
            Empty List
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'MultipleValuesTable',
  props: {
    header: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    headerItems () {
      return this.data[0]
    },
    dataItems () {
      if (this.header) {
        return this.data.slice(1)
      }

      return this.data
    }
  }
}
</script>
