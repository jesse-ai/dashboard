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
import axios from 'axios'

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
      await axios
        .post('http://127.0.0.1:8000/backtest', {
          id: 0,
          start_date: '2021-01-01',
          finish_date: '2021-01-20',
          debug_mode: false,
          export_csv: false,
          export_chart: false,
          export_tradingview: false,
          export_full_reports: false,
          export_json: false,
        })
        .catch(() => this.notyf.error('Request failed'))
    }
  }
})
</script>
