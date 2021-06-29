<template>
  <div class="max-w-2xl mx-auto my-5">
    <Spinner
      v-if="0"
      class="h-6 w-6 bg-gray-300"/>

    <button
      class="btn-primary text-center px-10 mb-5"
      @click="startBacktest">
      Start backtest {{ progressPercent }}
    </button>

    <h3>Candles</h3>
    <pre>{{ candlesInfo }}</pre>

    <h3>Routes</h3>
    <pre>{{ routesInfo }}</pre>

    <h3>Progressbar</h3>
    <pre>{{ progressbar }}</pre>

    <h3>Metrics</h3>
    <pre>{{ metrics }}</pre>
  </div>
</template>

<script>

import Spinner from '@/components/Functional/Spinner'
import { defineComponent, computed } from 'vue'
import { useBacktestStore } from '@/stores/backtest'
import axios from 'axios'

export default defineComponent({
  name: 'App',
  components: {
    Spinner
  },
  setup () {
    const backtest = useBacktestStore()

    async function startBacktest () {
      await axios.post('http://127.0.0.1:8000/backtest', {
        start_date: '2021-04-01',
        finish_date: '2021-04-18',
        debug_mode: false,
        export_csv: false,
        export_chart: false,
        export_tradingview: false,
        export_full_reports: false,
        export_json: false,
      })
    }

    return {
      candlesInfo: computed(() => backtest.candlesInfo),
      routesInfo: computed(() => backtest.routesInfo),
      progressbar: computed(() => backtest.progressbar),
      metrics: computed(() => backtest.metrics),
      progressPercent: computed(() => backtest.progressPercent),
      startBacktest
    }
  }
})
</script>
