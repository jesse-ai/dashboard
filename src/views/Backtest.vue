<template>
  <section class="h-full flex flex-col justify-between">
    <!-- Page title & actions -->
    <div class="select-none border-b border-gray-200 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div class="flex-1 min-w-0">
        <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
          Backtest
        </h1>
      </div>

      <div class="mt-4 flex sm:mt-0 sm:ml-4">
        <a href="https://docs.jesse.trade/docs/backtest.html" target="_blank" class="btn-link mr-4">
          Documentation
        </a>

        <a href="https://jesse.trade/help" target="_blank" class="btn-link">
          FAQ
        </a>
      </div>
    </div>

    <!-- Content -->
    <div v-if="!results.executing && !results.showResults"
         class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full max-h-screen overflow-y-auto">
      <Routes
        :exchanges="routes.exchanges"
        :timeframes="routes.timeframes"
        :symbols="routes.symbols"
        :strategies="routes.strategies"/>

      <Divider class="mt-16">Options</Divider>

      <div class="grid grid-cols-2 gap-8">
        <div class="flex items-start select-none">
          <div class="h-5 flex items-center">
            <input id="debug_mode" v-model="form.debug_mode"
                   name="debug_mode"
                   type="checkbox"
                   class="focus:ring-0 h-4 w-4 text-indigo-600 border-gray-300 rounded">
          </div>
          <div class="ml-3 text-sm">
            <label for="debug_mode" class="font-medium text-gray-700 cursor-pointer">debug_mode</label>
            <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
          </div>
        </div>

        <div class="flex items-start select-none">
          <div class="h-5 flex items-center">
            <input id="export_chart" v-model="form.export_chart"
                   name="export_chart"
                   type="checkbox"
                   class="focus:ring-0 h-4 w-4 text-indigo-600 border-gray-300 rounded">
          </div>
          <div class="ml-3 text-sm">
            <label for="export_chart" class="font-medium text-gray-700 cursor-pointer">export_chart</label>
            <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
          </div>
        </div>

        <div class="flex items-start select-none">
          <div class="h-5 flex items-center">
            <input id="export_tradingview" v-model="form.export_tradingview"
                   name="export_tradingview"
                   type="checkbox"
                   class="focus:ring-0 h-4 w-4 text-indigo-600 border-gray-300 rounded">
          </div>
          <div class="ml-3 text-sm">
            <label for="export_tradingview" class="font-medium text-gray-700 cursor-pointer">export_tradingview</label>
            <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
          </div>
        </div>

        <div class="flex items-start select-none">
          <div class="h-5 flex items-center">
            <input id="export_full_reports" v-model="form.export_full_reports"
                   name="export_full_reports"
                   type="checkbox"
                   class="focus:ring-0 h-4 w-4 text-indigo-600 border-gray-300 rounded">
          </div>
          <div class="ml-3 text-sm">
            <label for="export_full_reports" class="font-medium text-gray-700 cursor-pointer">export_full_reports</label>
            <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
          </div>
        </div>

        <div class="flex items-start select-none">
          <div class="h-5 flex items-center">
            <input id="export_csv" v-model="form.export_csv"
                   name="export_csv"
                   type="checkbox"
                   class="focus:ring-0 h-4 w-4 text-indigo-600 border-gray-300 rounded">
          </div>
          <div class="ml-3 text-sm">
            <label for="export_csv" class="font-medium text-gray-700 cursor-pointer">export_csv</label>
            <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
          </div>
        </div>

        <div class="flex items-start select-none">
          <div class="h-5 flex items-center">
            <input id="export_json" v-model="form.export_json"
                   name="export_json"
                   type="checkbox"
                   class="focus:ring-0 h-4 w-4 text-indigo-600 border-gray-300 rounded">
          </div>
          <div class="ml-3 text-sm">
            <label for="export_json" class="font-medium text-gray-700 cursor-pointer">export_json</label>
            <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
          </div>
        </div>
      </div>

      <Divider class="mt-16">Duration</Divider>

      <div class="flex items-center select-none flex-1">
        <input id="start_date"
               v-model="form.start_date"
               type="date"
               name="start_date"
               class="flex-1 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 flex justify-center items-center w-48 py-4 text-center sm:text-sm border-gray-300 rounded-l-md border-r-0"
        >

        <input id="finish_date"
               v-model="form.finish_date"
               type="date"
               name="finish_date"
               class="flex-1 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 flex justify-center items-center w-48 py-4 text-center sm:text-sm border-gray-300 rounded-r-md">
      </div>

      {{ form }}
    </div>

    <!-- Results -->
    <div v-if="results.showResults"
         class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full max-h-screen overflow-y-auto">
      <div>
        <Divider>
          Info
        </Divider>
        <KeyValueTable :data="results.info"/>

        <Divider class="mt-16">
          Equity Curve
        </Divider>

        <!-- TODO: replace with actual chart -->
        <img src="@/assets/imgs/equity-curve.png" alt="equity-curve">

        <Divider class="mt-16">
          Performance
        </Divider>

        <KeyValueTable :data="results.metrics"/>
      </div>
    </div>

    <!-- Action Buttons -->
    <div v-if="!results.executing" class="py-4 px-4 sm:px-6 md:px-8 w-full">
      <div v-if="results.showResults" class="max-w-7xl mx-auto flex">
        <button class="btn-primary text-center mr-2 flex-1" @click="rerun">
          Rerun
        </button>

        <button class="btn-secondary text-center ml-2 flex-1" @click="newBacktest">
          New backtest
        </button>
      </div>

      <div v-else class="max-w-7xl mx-auto flex">
        <button class="btn-primary text-center mr-2 flex-1" @click="start">
          Start
        </button>

        <button class="btn-secondary text-center ml-2 flex-1">
          Start in a new tab
        </button>
      </div>
    </div>

    <!-- Execution -->
    <div v-if="results.executing && !results.showResults"
         class="h-full flex flex-col items-center justify-center select-none">
      <div class="">
        <CircleProgressbar :progress="results.progressbar.current"/>
      </div>

      <h3 class="mt-8">{{ results.progressbar.estimated_remaining_seconds }} seconds remaining...</h3>

      <div class="mt-8">
        <button class="btn-secondary w-64" @click="cancel">
          Cancel
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { mapState, mapWritableState } from 'pinia'
import { useBacktestStore } from '@/stores/backtest'

export default {
  name: 'Backtest',
  data () {
    return {
      routes: {
        exchanges: ['Binance', 'Binance Futures'],
        symbols: ['BTC-USDT', 'ETH-USDT'],
        timeframes: ['1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '3h', '4h', '6h', '8h', '12h', '1D', '3D', '1W'],
        strategies: ['TrendFollowing01']
      },
    }
  },
  computed: {
    // ...mapState(useBacktestStore, ['results']),
    ...mapWritableState(useBacktestStore, [
      'form', 'results'
    ])
  },
  methods: {
    cancel () {
      this.results.executing = false
    },
    start () {
      this.results.progressbar.current = 0
      this.results.executing = true

      axios.post('http://127.0.0.1:8000/backtest', {
        start_date: this.form.start_date,
        finish_date: this.form.finish_date,
        debug_mode: this.form.debug_mode,
        export_csv: this.form.export_csv,
        export_chart: this.form.export_chart,
        export_tradingview: this.form.export_tradingview,
        export_full_reports: this.form.export_full_reports,
        export_json: this.form.export_json,
      }).then(r => {
        console.log(r.data)
      })
    },
    rerun () {
      this.results.showResults = false
      this.start()
    },
    newBacktest () {
      this.results.showResults = false
    },
  }
}
</script>

