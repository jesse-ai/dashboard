<template>
  <div class="max-w-2xl mx-auto my-5 px-4">
    <button
      class="btn-primary text-center px-10 mb-5"
      @click="startBacktest">
      Start backtest
    </button>

    <pre>{{ tabs }}</pre>
  </div>
</template>

<script>

import { defineComponent } from 'vue'
import { useBacktestStore } from '@/stores/backtest'
import { mapState } from 'pinia'
import axios from '@/http'

export default defineComponent({
  name: 'App',
  components: {},
  computed: {
    ...mapState(useBacktestStore, [
      'tabs'
    ])
  },
  methods: {
    async startBacktest () {
      const data = {
        id: '1',
        routes: [
          {
            exchange: 'Binance',
            symbol: 'BTC-USDT',
            timeframe: '1h',
            strategy: 'PinballMonster01'
          }],
        extra_routes: [],
        start_date: '2021-01-01',
        finish_date: '2021-02-10',
        debug_mode: false,
        export_csv: false,
        export_chart: false,
        export_tradingview: false,
        export_full_reports: false,
        export_json: false
      }

      await axios
        .post('/backtest', data)
        .catch((err) => {
          console.log(err)
          this.notyf.error('Request failed')
        })
    }
  }
})
</script>
