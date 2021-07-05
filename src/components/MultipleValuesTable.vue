<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="border overflow-hidden sm:rounded">
          <table class="min-w-full divide-y divide-gray-200">
            <tbody>
              <tr v-for="(d, index) in data" :key="index"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                <td v-for="(item, subIndex) in d" :key="item" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    v-text="d[subIndex]" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'MultipleValuesTable',
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>
