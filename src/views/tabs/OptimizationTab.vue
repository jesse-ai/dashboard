<template>
  <!-- Debugger Logs -->
  <SlideOver v-if="form.debug_mode"
             name="logsModal"
             :object="results"
             title="Logs">
    <template #default>
      <Logs :logs="results.infoLogs"/>
    </template>

    <template #buttons>
      <button
        class="btn-nav"
        @click="copyInfoLogs">
        <CheckIcon v-if="copiedLogsInfo" class="h-6 w-6" aria-hidden="true" />
        <ClipboardIcon v-if="!copiedLogsInfo && results.infoLogs.length != 0" class="h-6 w-6" aria-hidden="true" />
      </button>
      <input id="copy-info-logs" type="hidden" :value="results.infoLogs" >
    </template>
  </SlideOver>

  <LayoutWithSidebar>
    <template #left>
      <!-- exception  -->
      <div v-if="results.exception.error && results.executing" class="mb-8">
        <Exception :title="results.exception.error" :content="results.exception.traceback" />
      </div>

      <!-- Execution -->
      <div v-if="results.executing">
        <div v-if="results.generalInfo">
          <Divider>Info</Divider>
          <KeyValueTable :data="results.generalInfo"/>
        </div>
      </div>

      <!-- Content -->
      <div v-if="!results.executing && !results.showResults"
           class="px-6">
        <Routes v-if="isInitiated" :form="form" :results="results"/>

        <Divider class="mt-16">Options</Divider>

        <div class="grid grid-cols-1 gap-6">
          <!-- debug mode -->
          <ToggleButton
            :object="form"
            name="debug_mode"
            title="Debug Mode"
            description="Displays detailed logs about the genetics algorithm. Use it if you are interested in the genetics algorithm and are familiar with its basics."/>

          <!-- export csv -->
          <ToggleButton
            :object="form"
            name="export_csv"
            title="Export CSV"
            description="Exports a CSV file of all DNAs on completion"/>

          <!-- export json -->
          <ToggleButton
            :object="form"
            name="export_json"
            title="Export JSON"
            description="Exports a JSON file of all DNAs on completion"/>
        </div>

        <!-- optimal_total -->
        <div class="select-none">
          <Divider class="mt-16">Optimal Trades</Divider>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            The number that tells Jesse how many trades you would find optimal for your strategy in the targeted time
            period so that it can filter out those DNAs that cause too few trades.
            <a href="https://docs.jesse.trade/docs/optimize/executing-the-optimize-mode.html" target="_blank" class="font-semibold hover:underline italic">More Details...</a>
          </p>
          <br>
          <NumberInput title="Optimal number of trades:" name="optimal_total" :object="form"/>
        </div>

        <Divider class="mt-16">Duration</Divider>

        <div class="flex items-center select-none flex-1 mb-4">
          <input id="start_date"
                 v-model="form.start_date"
                 type="date"
                 name="start_date"
                 class="dark:bg-backdrop-dark dark:border-gray-900 dark:hover:bg-gray-700 hover:bg-gray-50 flex-1 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-400 flex justify-center items-center w-48 py-4 text-center sm:text-sm border-gray-300 rounded-l-md border-r-0"
          >

          <input id="finish_date"
                 v-model="form.finish_date"
                 type="date"
                 name="finish_date"
                 class="dark:border-gray-900 dark:hover:bg-gray-700 hover:bg-gray-50 dark:bg-backdrop-dark flex-1 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-400 flex justify-center items-center w-48 py-4 text-center sm:text-sm border-gray-300 rounded-r-md">
        </div>
      </div>

      <!-- Results -->
      <div v-if="results.showResults"
           class="w-full mx-auto px-6">
        <div>
          <Divider>Routes</Divider>
          <MultipleValuesTable :data="results.routes_info" header />

          <Divider class="mt-16">Info</Divider>
          <KeyValueTable :data="results.info"/>

          <Divider v-if="hasExecutedTrades" class="mt-16">Equity Curve</Divider>
          <EquityCurve v-if="hasExecutedTrades" :equity-curve="results.charts.equity_curve"/>

          <Divider v-if="hasExecutedTrades" class="mt-16">Performance</Divider>
          <KeyValueTable v-if="hasExecutedTrades" :data="results.metrics"/>

          <div v-if="!hasExecutedTrades"
               class="text-yellow-500 border-yellow-400 bg-yellow-50 dark:bg-gray-700 dark:text-yellow-400 mt-16 text-center text-2xl rounded border-2 border-dashed dark:border-gray-800 py-16 select-none"
          >
            No trades were executed via this strategy!
          </div>
        </div>
      </div>
    </template>

    <template #right>
      <!-- Action Buttons -->
      <div v-if="!results.executing">
        <div v-if="results.showResults">
          <button class="btn-primary text-center block mb-4 w-full" @click="rerun($route.params.id)">
            Rerun
          </button>

          <button class="btn-success text-center block mb-4 w-full" @click="newOptimization($route.params.id)">
            New session
          </button>

          <a v-if="form.debug_mode"
             :href="`http://127.0.0.1:8000/download/optimization/log/${results.generalInfo.session_id}?token=${auth_key}`"
             class="btn-secondary text-center block mb-4 w-full">
            Debugging Logs
          </a>

          <a v-if="form.export_chart && hasExecutedTrades"
             :href="`http://127.0.0.1:8000/download/optimization/chart/${results.generalInfo.session_id}?token=${auth_key}`"
             class="btn-secondary text-center block mb-4 w-full">
            Legacy Chart
          </a>

          <a v-if="form.export_full_reports && hasExecutedTrades"
             :href="`http://127.0.0.1:8000/download/optimization/full-reports/${results.generalInfo.session_id}?token=${auth_key}`"
             class="btn-secondary text-center block mb-4 w-full">
            QuantStats Report
          </a>

          <a v-if="form.export_csv && hasExecutedTrades"
             :href="`http://127.0.0.1:8000/download/optimization/csv/${results.generalInfo.session_id}?token=${auth_key}`"
             class="btn-secondary text-center block mb-4 w-full">
            CSV
          </a>

          <a v-if="form.export_json && hasExecutedTrades"
             :href="`http://127.0.0.1:8000/download/optimization/json/${results.generalInfo.session_id}?token=${auth_key}`"
             class="btn-secondary text-center block mb-4 w-full">
            JSON
          </a>

          <a v-if="form.export_tradingview && hasExecutedTrades"
             :href="`http://127.0.0.1:8000/download/optimization/tradingview/${results.generalInfo.session_id}?token=${auth_key}`"
             class="btn-secondary text-center block mb-4 w-full">
            TradingView Pine Editor
          </a>
        </div>

        <div v-else>
          <button class="btn-primary text-center block mb-4 w-full" @click="start($route.params.id)">
            Start
          </button>
        </div>
      </div>

      <!-- Execution -->
      <div v-if="results.executing && !results.showResults"
           class="flex flex-col items-center justify-center select-none"
      >
        <div class="mb-8 w-full">
          <button class="btn-cancel block mb-4 w-full" @click="cancel($route.params.id)">
            Cancel
          </button>
        </div>

        <div>
          <CircleProgressbar :progress="results.progressbar.current"/>
        </div>

        <h3 v-if="!results.exception.error" class="mt-8 animate-pulse" v-text="remainingTimeText"/>
      </div>
    </template>
  </LayoutWithSidebar>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useOptimizationStore } from '@/stores/optimization'
import Logs from '@/components/Logs'
import LayoutWithSidebar from '@/layouts/LayoutWithSidebar'
import MultipleValuesTable from '@/components/MultipleValuesTable'
import { useMainStore } from '@/stores/main'
import { ClipboardIcon, CheckIcon } from '@heroicons/vue/solid'
import SlideOver from '@/components/Functional/SlideOver'
import ToggleButton from '@/components/ToggleButton'
import Routes from '@/components/Routes'
import Divider from '@/components/Divider'
import CircleProgressbar from '@/components/Functional/CircleProgressbar'
import Exception from '@/components/Exception'

export default {
  name: 'OptimizationTab',
  components: {
    LayoutWithSidebar,
    Logs,
    ToggleButton,
    MultipleValuesTable,
    ClipboardIcon,
    CheckIcon,
    SlideOver,
    Routes,
    Divider,
    CircleProgressbar,
    Exception
  },
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
  data () {
    return {
      copiedLogsInfo: false,
    }
  },
  computed: {
    hasExecutedTrades () {
      return this.results.metrics.length > 0
    },
    ...mapState(useMainStore, ['isInitiated']),
    auth_key () {
      return sessionStorage.auth_key
    },
    remainingTimeText () {
      if (Math.round(this.results.progressbar.estimated_remaining_seconds) === 0) {
        return 'Please wait...'
      }

      return `${Math.round(this.results.progressbar.estimated_remaining_seconds)} seconds remaining...`
    }
  },
  methods: {
    ...mapActions(useOptimizationStore, ['addTab', 'startInNewTab', 'start', 'cancel', 'rerun', 'newOptimization']),
    copyInfoLogs () {
      const infoLogsToCopy = document.querySelector('#copy-info-logs')
      infoLogsToCopy.setAttribute('type', 'text')
      infoLogsToCopy.select()
      document.execCommand('copy')
      this.copiedLogsInfo = true

      // unselect the range
      infoLogsToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()

      setTimeout(() => {
        this.copiedLogsInfo = false
      }, 3000)
    },
  }
}
</script>

