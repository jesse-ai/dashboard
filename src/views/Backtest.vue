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
        <button type="button" class="btn-link mr-4">
          Documentation
        </button>
        <button type="button" class="btn-link">
          FAQ
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full max-h-screen overflow-y-auto">
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

    <!-- Main actions -->
    <div class="py-4 px-4 sm:px-6 md:px-8 w-full">
      <div class="max-w-7xl mx-auto flex">
        <button class="btn-primary text-center mr-2 flex-1">
          Start
        </button>

        <button class="btn-secondary text-center ml-2 flex-1">
          Start in a new tab
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
// import { PlusCircleIcon } from ''

export default {
  name: 'Backtest',
  components: {
    CircleProgressbar,
    Toggle,
    DatePicker,
    Select,
    Routes,
    Divider
  },
  data () {
    return {
      routes: {
        exchanges: ['Binance', 'Binance Futures'],
        symbols: ['BTC-USDT', 'ETH-USDT'],
        timeframes: ['1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '3h', '4h', '6h', '8h', '12h', '1D', '3D', '1W'],
        strategies: ['TrendFollowing01']
      }
    }
  },
  computed: {},
  mounted () {
  },
  methods: {}
}
</script>

