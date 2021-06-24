<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  colspan="2"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Info logs
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Odd row -->
              <tr class="bg-white">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  16:14:01
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  OPENED short position: Binance Futures, BTC-USDT, -0.178, $38042.2
                </td>
              </tr>

              <!-- Even row -->
              <tr class="bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  16:14:01
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Charged 2.03 as fee. Balance for USDT on Binance.
                </td>
              </tr>

              <!-- Odd row -->
              <tr class="bg-white">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  16:14:01
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  EXECUTED order: BTC-USDT, MARKET, sell, -0.178, $38042.2
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
  name: 'InfoLogsTable',
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

