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
    <div v-if="!executing && !showResults"
         class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full max-h-screen overflow-y-auto">
      <Routes
        :exchanges="routes.exchanges"
        :timeframes="routes.timeframes"
        :symbols="routes.symbols"
        :strategies="routes.strategies"
      />

      <Divider class="mt-16">Options</Divider>

      <div class="grid grid-cols-2 gap-8">
        <Toggle
          title="Debug Mode"
          description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>
        <Toggle
          title="Export CSV"
          description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>
        <Toggle
          title="Export JSON"
          description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>
        <Toggle
          title="Charts"
          description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>
        <Toggle
          title="Full Metrics Report"
          description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>
        <Toggle
          title="Export TradingView"
          description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>
      </div>

      <Divider class="mt-16">Duration</Divider>

      <div class="flex items-center select-none flex-1">
        <input id="start_date"
               type="date"
               name="start_date"
               class="flex-1 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 flex justify-center items-center w-48 py-4 text-center sm:text-sm border-gray-300 rounded-l-md border-r-0"
        >
        <input id="finish_date"
               type="date"
               name="finish_date"
               class="flex-1 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 flex justify-center items-center w-48 py-4 text-center sm:text-sm border-gray-300 rounded-r-md"
        >
      </div>
    </div>

    <!-- Results -->
    <div v-if="showResults"
         class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full max-h-screen overflow-y-auto">
      <div>
        <Divider class="mt-16">
          Equity Curve
        </Divider>

        <img src="@/assets/imgs/equity-curve.png" alt="equity-curve">

        <Divider class="mt-16">
          Performance
        </Divider>

        <KeyValueTable :data="results.metrics" />
      </div>
    </div>

    <!-- Action Buttons -->
    <div v-if="!executing"
         class="py-4 px-4 sm:px-6 md:px-8 w-full">
      <div class="max-w-7xl mx-auto flex">
        <button class="btn-primary text-center mr-2 flex-1" @click="start">
          Start
        </button>

        <button class="btn-secondary text-center ml-2 flex-1">
          Start in a new tab
        </button>
      </div>
    </div>

    <!-- Execution -->
    <div v-if="executing && !showResults"
         class="h-full flex flex-col items-center justify-center select-none"
    >
      <div class="">
        <CircleProgressbar :progress="progress.current" />
      </div>

      <h3 class="mt-8">{{ progress.estimated_remaining_seconds }} seconds remaining...</h3>

      <div class="mt-8">
        <button class="btn-secondary w-64" @click="cancel">
          Cancel
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import CircleProgressbar from '@/components/Functional/CircleProgressbar'
import Toggle from '@/components/Functional/Toggle'
import DatePicker from '@/components/Functional/DatePicker'
import Select from '@/components/Functional/Select'
import Routes from '@/components/Routes'
import Divider from '@/components/Divider'
import KeyValueTable from '@/components/KeyValueTable'
import axios from 'axios'

export default {
  name: 'Backtest',
  components: {
    CircleProgressbar,
    Toggle,
    DatePicker,
    Select,
    Routes,
    Divider,
    KeyValueTable
  },
  data () {
    return {
      showResults: true,
      executing: false,
      progress: {
        current: 0,
        estimated_remaining_seconds: 0
      },
      routes: {
        exchanges: ['Binance', 'Binance Futures'],
        symbols: ['BTC-USDT', 'ETH-USDT'],
        timeframes: ['1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '3h', '4h', '6h', '8h', '12h', '1D', '3D', '1W'],
        strategies: ['TrendFollowing01']
      },
      results: {
        metrics: [
          ['Total Closed Trades', 'value: 221'],
          ['Total Net Profit', '1,699,245.56 (1699.25%)'],
          ['Starting => Finishing Balance', '100,000 => 1,799,245.56'],
          ['Total Open Trades', '0'],
          ['Open PL', '0'],
        ]
      }
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
    cancel () {
      this.executing = false
    },
    start () {
      this.progress.current = 0
      this.executing = true

      axios.post('http://127.0.0.1:8000/backtest', {
        start_date: '2021-06-01',
        finish_date: '2021-06-18',
        debug_mode: false,
        export_csv: false,
        export_chart: false,
        export_tradingview: false,
        export_full_reports: false,
        export_json: false,
      }).then(r => {
        console.log(r.data)
      })

      function sleep (ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }

      async function demo (that) {
        // Sleep in loop
        for (let i = 0; i < 100; i++) {
          await sleep(10)
          console.log(i)
          that.progress.current = i + 1
        }

        that.showResults = true
      }

      demo(this)
    }
  }
}
</script>

