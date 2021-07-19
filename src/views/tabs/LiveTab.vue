<template>
  <LayoutWithSidebar>
    <template #left>
      <!-- form -->
      <div v-if="!results.booting && !results.monitoring && !results.showResults"
           class="px-4 sm:px-6 md:px-8">
        <Routes :form="form" :results="results"/>

        <Divider class="mt-16">Options</Divider>

        <div class="grid grid-cols-2 gap-8">
          <!-- debug mode -->
          <CheckBox :title="'debug_mode'" :description="'Get notified when someones posts a comment on a posting.'" :form="form" :value="'debug_mode'" />
      
          <!-- paper mode -->
          <CheckBox :title="'paper_mode'" :description="'Get notified when someones posts a comment on a posting.'" :form="form" :value="'paper_mode'" />
        </div>
      </div>

      <!-- Monitoring Dashboard -->
      <div v-if="results.monitoring" class="px-4 sm:px-6 md:px-8">
        <!-- Candlesticks chart-->
        <div>
          <CandlesChart v-if="results.candles.length" :candles="results.candles" :results="results" :form="form" />
        </div>

        <!--tables-->
        <Divider class="mt-12">Positions</Divider>
        <MultipleValuesTable :data="results.positions" header />

        <Divider class="mt-12">Orders</Divider>
        <MultipleValuesTable :data="results.orders" header />

        <!-- Logs while execution -->
        <div v-if="form.debug_mode && results.monitoring" class="mt-12 h-full overflow-auto mx-auto">
          <Logs :logs="results.infoLogs"/>
        </div>
      </div>

      <!-- Results -->
      <div v-if="results.showResults"
           class="w-full mx-auto px-4 sm:px-6 md:px-8 h-full max-h-screen overflow-y-auto">
        <div>
          <Divider>Routes</Divider>
          <MultipleValuesTable :data="results.routes_info"/>

          <Divider class="mt-16">Info</Divider>
          <KeyValueTable :data="results.info"/>

          <Divider class="mt-16">Equity Curve</Divider>
          <EquityCurve :equity-curve="results.charts.equity_curve"/>

          <Divider class="mt-16">Performance</Divider>
          <KeyValueTable :data="results.metrics"/>
        </div>
      </div>

      <!-- Execution -->
      <div v-if="!form.debug_mode && results.booting && !results.showResults"
           class="flex flex-col items-center justify-center select-none"
           :class="form.debug_mode ? 'h-[60%]' : 'h-full'"
      >
        <div>
          <CircleProgressbar :progress="results.progressbar.current"/>
        </div>

        <h3 class="mt-8">{{ Math.round(results.progressbar.estimated_remaining_seconds) }} seconds remaining...</h3>

        <div class="mt-8">
          <button class="btn-secondary w-64" @click="cancel($route.params.id)">
            Cancel
          </button>
        </div>
      </div>

      <!-- Logs while execution -->
      <div v-if="form.debug_mode && results.booting" class="h-full overflow-auto mx-auto container">
        <Logs :logs="results.infoLogs"/>
      </div>

      <!-- exception  -->
      <div v-if="results.exception.error && results.booting"
           class="h-full overflow-auto mx-auto container">
        <Exception :title="results.exception.error" :content="results.exception.traceback" />
      </div>
    </template>

    <template #right>
      <!-- Action Buttons -->
      <div v-if="!results.booting">
        <div v-if="results.monitoring">
          <button class="btn-secondary text-center mr-2 block w-full mb-4" @click="stop($route.params.id)">
            Stop
          </button>
        </div>

        <div v-else>
          <button class="btn-primary text-center mr-2 block w-full mb-4" @click="start($route.params.id)">
            Start
          </button>

          <button class="btn-secondary text-center block w-full mb-4" @click="startInNewTab($route.params.id)">
            Start in a new tab
          </button>
        </div>
      </div>

      <hr class="my-8 border-2 dark:border-gray-600 rounded-full">

      <!-- general info table-->
      <dl v-if="results.monitoring" class="grid grid-cols-1 gap-6 border dark:border-gray-600 rounded py-4 px-6 select-none">
        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Current Time:</div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ timestampToTime(results.generalInfo.current_time) }}</div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Started:</div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ timestampToTime(results.generalInfo.started_at) }}</div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Started/Current Balance:</div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ `${results.generalInfo.started_balance}/${results.generalInfo.current_balance}` }}</div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Debug Mode:</div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ results.generalInfo.debug_mode }}</div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">PNL:</div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ `${results.generalInfo.pnl} USDT (${results.generalInfo.pnl_perc}%)` }}</div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Trades:</div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ results.generalInfo.count_trades }}</div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Info Logs:</div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100 underline cursor-pointer">{{ results.generalInfo.count_info_logs }}</div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Errors Logs:</div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100 underline cursor-pointer">{{ results.generalInfo.count_error_logs }}</div>
        </div>
      </dl>
    </template>
  </LayoutWithSidebar>
</template>

<script>
import { mapActions } from 'pinia'
import Logs from '@/components/Logs'
import { useLiveStore } from '@/stores/live'
import helpers from '@/helpers'
import LayoutWithSidebar from '@/layouts/LayoutWithSidebar'
import CheckBox from '@/components/CheckBox'

export default {
  name: 'LiveTab',
  components: { LayoutWithSidebar, Logs, CheckBox },
  props: {
    form: {
      type: Object,
      required: true
    },
    results: {
      type: Object,
      required: true
    }
  },
  setup () {
    return {
      timestampToTime: helpers.timestampToTime
    }
  },
  data () {
    return {
      positions: [
        ['.', 'TrendFollowing', 'BTC-USDT', '3', '1 hour, 56 minutes, 9 seconds ago', 0.1, 60458, '-0.09 (-0.0424%)'],
        ['.', 'TrendFollowing', 'ETH-USDT', '3', '1 hour, 56 minutes, 9 seconds ago', 0.1, 60458, '-0.09 (-0.0424%)'],
      ]
    }
  },
  methods: {
    ...mapActions(useLiveStore, ['addTab', 'startInNewTab', 'start', 'cancel', 'stop', 'newLive']),
  }
}
</script>

