<template>
  <div class="flex flex-col select-none">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="border dark:border-gray-600 overflow-hidden sm:rounded">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead v-if="header" class="bg-gray-100 dark:bg-gray-800 select-none">
              <tr>
                <th v-for="item in headerItems" :key="item" scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  {{ item }}
                </th>
              </tr>
            </thead>

            <tbody v-if="dataItems.length">
              <tr v-for="(d, index) in dataItems" :key="index" class="text-gray-900 dark:text-gray-200"
                  :class="index % 2 === 0 ? 'bg-white dark:bg-backdrop-dark' : 'bg-gray-50 dark:bg-gray-700'">
                <td
                  v-for="(item, subIndex) in d" :key="item"
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                  :class="d[subIndex].style"
                >
                  <Tooltip v-if="d[subIndex].tooltip" :title="d[subIndex].tooltip">
                    <code v-if="d[subIndex].tag === 'code'"
                          class="rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 select-text text-sm dark:text-gray-300 w-full px-4 sm:px-6 py-2"
                          v-text="d[subIndex].value === 0 ? '' : d[subIndex].value"/>
                    <pre v-else-if="d[subIndex].tag === 'pre'"
                         class="whitespace-pre-line rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 select-text text-sm dark:text-gray-300 w-full px-4 sm:px-6 py-2"
                         v-text="d[subIndex].value === 0 ? '' : d[subIndex].value"/>
                    <span v-else
                          v-text="d[subIndex].value === 0 ? '' : d[subIndex].value"/>
                  </Tooltip>

                  <span v-else>
                    <code v-if="d[subIndex].tag === 'code'"
                          class="rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 select-text text-sm dark:text-gray-300 w-full px-4 sm:px-6 py-2"
                          v-text="d[subIndex].value === 0 ? '' : d[subIndex].value"/>
                    <pre v-else-if="d[subIndex].tag === 'pre'"
                         class="whitespace-pre-line rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 select-text text-sm dark:text-gray-300 w-full px-4 sm:px-6 py-2"
                         v-text="d[subIndex].value === 0 ? '' : d[subIndex].value"/>
                    <span v-else
                          v-text="d[subIndex].value === 0 ? '' : d[subIndex].value"/>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="!dataItems.length"
               class="text-center text-xs dark:bg-gray-700 py-4 opacity-30 dark:opacity-75 select-none">
            Empty List
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Tooltip from '@/components/Tooltip'
export default {
  name: 'MultipleValuesTable',
  components: { Tooltip },
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
