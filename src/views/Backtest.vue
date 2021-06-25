<template>
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

  <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    <!--    <CircleProgressbar :progress="20"/>-->

    <!--    <div class="my-6 grid grid-cols-4 gap-4">-->
    <!--      <Select :options="routes.exchanges" />-->
    <!--      <Select :options="routes.symbols" />-->
    <!--      <Select :options="routes.timeframes" />-->
    <!--      <Select :options="routes.strategies" />-->
    <!--    </div>-->

    <Routes
      :exchanges="routes.exchanges"
      :timeframes="routes.timeframes"
      :symbols="routes.symbols"
      :strategies="routes.strategies"
    />

    <br>

    <Divider>Config</Divider>

    <Toggle class="mb-4"
            title="Debug Mode"
            description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>
    <Toggle class="mb-4"
            title="Export CSV"
            description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>
    <Toggle class="mb-4"
            title="Export JSON"
            description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>
    <Toggle class="mb-4"
            title="Charts"
            description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>
    <Toggle class="mb-4"
            title="Full Metrics Report"
            description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>
    <Toggle class="mb-4"
            title="Export TradingView"
            description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>

    <br>
    <br>

    <Divider>Duration</Divider>

    <div class="flex justify-between items-center">
      <div class="flex items-center select-none">
        <DatePicker class="flex-1" name="start_date"/>
        <span class="mx-2">to</span>
        <DatePicker class="flex-1" name="finish_date"/>
      </div>

      <div>
        <button class="btn-primary text-center mr-4">
          Start
        </button>

        <button class="btn-secondary text-center">
          Start in a new tab
        </button>
      </div>
    </div>
  </div>
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

