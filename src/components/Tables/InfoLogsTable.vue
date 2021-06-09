<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto">
      <div class="py-2 align-middle inline-block min-w-full">
        <div class="overflow-hidden">
          <table class="min-w-[640px]">
            <thead class="border-b border-dashed">
              <tr>
                <th class="font-bold pb-1 pr-3 whitespace-nowrap">Info logs</th>
                <td/>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th>16:14:01</th>
                <td>OPENED short position: Binance Futures, BTC-USDT, -0.178, $38042.2</td>
              </tr>
              <tr>
                <th>16:14:01</th>
                <td>Charged 2.03 as fee. Balance for USDT on Binance.</td>
              </tr>
              <tr>
                <th>16:14:01</th>
                <td>EXECUTED order: BTC-USDT, MARKET, sell, -0.178, $38042.2</td>
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

<style scoped>
  table tbody tr {
    @apply border-b border-dashed
  }
  table tbody tr:last-child {
    @apply border-none
  }
  table th {
    @apply border-r border-dashed
  }
  table tbody td {
    @apply py-1
  }
</style>

