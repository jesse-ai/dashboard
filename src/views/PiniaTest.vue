<template>
  <div class="max-w-2xl mx-auto my-5">
    <Spinner
      v-if="0"
      class="h-6 w-6 bg-gray-300"/>

    <button
      class="btn-primary text-center px-10 mb-5"
      @click="startBacktest">
      Start backtest
    </button>

    <pre>isConnected: {{ isConnected }}</pre>

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

// import axios from 'axios'
import Spinner from '@/components/Functional/Spinner'

import { ref, defineComponent } from 'vue'
import { useBacktestStore } from '@/stores/backtest'
import { useMainStore } from '@/stores/main'
import axios from 'axios'

export default defineComponent({
  name: 'App',
  components: {
    Spinner
  },
  setup () {
    const itemName = ref('itemName')

    const backtest = useBacktestStore()
    const main = useMainStore()

    function modifyProgressbar () {
      backtest.progressbar.current = Math.random()
    }

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
      itemName,
      progressbar: backtest.progressbar,
      test: backtest.test,
      someObject: backtest.someObject,

      modifyProgressbar,
      isConnected: main.isConnected,

      startBacktest
    }
  },
})
</script>
