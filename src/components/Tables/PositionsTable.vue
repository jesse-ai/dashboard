<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto">
      <div class="py-2 align-middle inline-block min-w-full">
        <div class="overflow-hidden">
          <table>
            <thead class="border-b border-dashed">
              <tr>
                <th>type</th>
                <th>strategy</th>
                <th>symbol</th>
                <th>leverage</th>
                <th>opened at</th>
                <th>qty</th>
                <th>entry</th>
                <th>current price</th>
                <th>liq price</th>
                <th>PNL (%)</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="p in positions" :key="p.symbol">
                <td class="text-red-500">short</td>
                <td>TestLiveMode01</td>
                <td>ETC-USDT</td>
                <td>3</td>
                <td>26 seconds ago</td>
                <td>-206</td>
                <td>69.112</td>
                <td>69.168</td>
                <td>91.8729</td>
                <td>
                  <span class="text-red-500">-11.54</span> (<span class="text-red-500">-0.2431</span>%)
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
  name: 'PositionsTable',
  components: {},
  data () {
    return {
    }
  },
  computed: {
    positions () {
      return this.$store.state.modes.paper.positions
    }
  },
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

