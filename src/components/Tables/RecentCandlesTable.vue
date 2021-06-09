<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto">
      <div class="py-2 align-middle inline-block min-w-full">
        <div class="overflow-hidden">
          <table>
            <thead class="border-b border-dashed">
              <tr>
                <th class="whitespace-nowrap">Exchange symbol-timeframe</th>
                <th>timestamp</th>
                <th>open</th>
                <th>close</th>
                <th>high</th>
                <th>low</th>
              </tr>
            </thead>

            <tbody>
              <tr class="text-green-500">
                <td class="text-main dark:text-main-dark">Binance Futures-ETC-USDT-1m</td>
                <td>2021-06-02T16:14:00+00:00</td>
                <td>69.132</td>
                <td>69.168</td>
                <td>69.213</td>
                <td>69.120</td>
              </tr>
              <tr class="text-green-500">
                <td class="text-main dark:text-main-dark">Binance Futures-BTC-USDT-1m</td>
                <td>2021-06-02T16:14:00+00:00</td>
                <td>38042.2</td>
                <td>38051.7</td>
                <td>38073.7</td>
                <td>38022.6</td>
              </tr>
              <tr class="text-red-500">
                <td class="text-main dark:text-main-dark">Binance Futures-ETC-USDT-5m</td>
                <td>2021-06-02T16:10:00+00:00</td>
                <td>69.187</td>
                <td>69.168</td>
                <td>69.385</td>
                <td>69.102</td>
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
  name: 'RecentCandlesTable',
  components: {},
  data () {
    return {
    }
  },
  computed: {},
  mounted () {
  },
  methods: {}
}
</script>

<style scoped>
  table tbody td, table thead th {
    @apply py-1 whitespace-nowrap
  }
  table tr {
    @apply border-b border-dashed
  }
  table tr:last-child {
    @apply border-none
  }
  table th, table td {
    @apply border-r border-dashed
  }
  table th:last-child, table td:last-child {
    @apply border-none
  }
</style>

