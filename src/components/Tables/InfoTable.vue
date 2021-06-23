<template>
  <div class="flex flex-col max-w-sm">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  colspan="2"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paper trade
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Odd row -->
              <tr class="bg-white">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Started at
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  a minute ago
                </td>
              </tr>

              <!-- Even row -->
              <tr class="bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Current time
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2021-06-02T16:14:26
                </td>
              </tr>

              <!-- Odd row -->
              <tr class="bg-white">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Errors/info
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  0/18
                </td>
              </tr>

              <!-- Even row -->
              <tr class="bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Active orders
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2
                </td>
              </tr>

              <!-- Odd row -->
              <tr class="bg-white">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Open positions
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2
                </td>
              </tr>

              <!-- Even row -->
              <tr class="bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Started/current balance
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  10000/9993.7
                </td>
              </tr>

              <!-- Odd row -->
              <tr class="bg-white">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Debug mode
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  True
                </td>
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
  name: 'InfoTable',
  components: {},
  data () {
    return {}
  },
  computed: {},
  mounted () {
  },
  methods: {}
}
</script>
