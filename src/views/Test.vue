<template>
  <div class="max-w-2xl mx-auto my-5">
    <h1 class="mb-3">Backtest</h1>

    <p class="mb-5">Pure backtest example</p>

    <button
      v-show="currentRoundedProgress === 0"
      class="btn-primary text-center px-10 mb-5"
      @click="start">
      Start backtest {{ currentRoundedProgress ? currentRoundedProgress : '' }}
    </button>

    <Spinner
      v-show="currentRoundedProgress > 0 && currentRoundedProgress !== 100"
      class="h-6 w-6 bg-gray-300"/>

    <template v-if="currentRoundedProgress === 100">
      <h3>Candles</h3>
      <pre>{{ candlesInfo }}</pre>

      <h3>Routes</h3>
      <pre>{{ routesInfo }}</pre>

      <h3>Progressbar</h3>
      <pre>{{ progressbar }}</pre>

      <h3>Metrics</h3>
      <pre>{{ metrics }}</pre>
    </template>
  </div>
</template>

<script>

import axios from 'axios'
import { mapGetters } from 'vuex'
import Spinner from '@/components/Functional/Spinner'

export default {
  name: 'Test',
  components: {
    Spinner
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      candlesInfo: 'backtest/candlesInfo',
      routesInfo: 'backtest/routesInfo',
      progressbar: 'backtest/progressbar',
      currentRoundedProgress: 'backtest/currentRoundedProgress',
      metrics: 'backtest/metrics'
    }),
  },
  mounted () {
  },
  methods: {
    async start () {
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
  }
}
</script>

