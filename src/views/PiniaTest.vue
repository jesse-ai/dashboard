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

    <br>
    <br>
    <input v-model="testCheckbox" type="checkbox" name="test-checkbox">
    testCheckbox: {{ testCheckbox }}
    <br>

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
import { defineComponent } from 'vue'
import { useBacktestStore } from '@/stores/backtest'
import { mapWritableState, mapState } from 'pinia'
import axios from 'axios'

export default defineComponent({
  name: 'App',
  components: {
    Spinner
  },
  computed: {
    ...mapState(useBacktestStore, [
      'candlesInfo',
      'routesInfo',
      'progressbar',
      'metrics',
    ]),
    ...mapWritableState(useBacktestStore, ['testCheckbox'])
  },
  methods: {
    async startBacktest () {
      await axios.post('http://127.0.0.1:8000/backtest', {
        start_date: '2021-06-01',
        finish_date: '2021-06-07',
        debug_mode: false,
        export_csv: false,
        export_chart: false,
        export_tradingview: false,
        export_full_reports: false,
        export_json: false,
      })
    }
  }
})
</script>
