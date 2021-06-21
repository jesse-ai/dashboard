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
                <td>{{ p.type }}</td>
                <td>{{ p.strategy_name }}</td>
                <td>{{ p.symbol }}</td>
                <td>{{ p.leverage }}</td>
                <td>{{ p.opened_at }}</td>
                <td>{{ p.qty }}</td>
                <td>{{ p.entry }}</td>
                <td>{{ p.current_price }}</td>
                <td>{{ p.liq_price }}</td>
                <td>
                  <span class="text-red-500">{{ p.pnl }}</span> (<span class="text-red-500">{{ p.pnl_perc }}</span>%)
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
import store from '../../store'

export default {
  name: 'PositionsTable',
  components: {},
  data () {
    return {
    }
  },
  computed: {
    positions () {
      return store.state.modes.paper.positions
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

