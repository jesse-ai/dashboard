<template>
  <table>
    <thead class="border-b border-dashed">
      <tr>
        <th class="font-bold pb-1 pr-3">Info logs</th>
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

