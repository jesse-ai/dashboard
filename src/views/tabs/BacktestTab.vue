<template>
  <SlideOver v-if="form.debug_mode"
             name="logsModal"
             :object="results"
             title="Logs">
    <Logs :logs="results.infoLogs"/>
  </SlideOver>

  <!-- Execution -->
  <div v-if="results.executing && !results.showResults"
       class="flex flex-col items-center justify-center select-none mt-[10%]"
  >
    <div>
      <CircleProgressbar :progress="results.progressbar.current"/>
    </div>

    <h3 class="mt-8">{{ Math.round(results.progressbar.estimated_remaining_seconds) }} seconds remaining...</h3>

    <div class="mt-8">
      <button v-if="form.debug_mode" class="btn-primary block mb-4 w-64" @click="results.logsModal = true">
        View Logs
      </button>

      <button class="btn-secondary block mb-4 w-64" @click="cancel($route.params.id)">
        Cancel
      </button>
    </div>

    <!-- exception  -->
    <div v-if="results.exception.error && results.executing" class="mx-auto container mt-8">
      <Exception :title="results.exception.error" :content="results.exception.traceback" />
    </div>
  </div>

  <LayoutWithSidebar else>
    <template #left>
      <!-- Content -->
      <div v-if="!results.executing && !results.showResults"
           class="px-6">
        <Routes :form="form" :results="results"/>

        <Divider class="mt-16">Options</Divider>

        <div class="grid grid-cols-2 gap-8">
          <!-- debug mode -->
          <CheckBox :title="'debug_mode'" :description="'Get notified when someones posts a comment on a posting.'" :object="form" :name="'debug_mode'" />

          <!-- export chart -->
          <CheckBox :title="'export_chart'" :description="'Get notified when someones posts a comment on a posting.'" :object="form" :name="'export_chart'" />

          <!-- export trading view -->
          <CheckBox :title="'export_tradingview'" :description="'Get notified when someones posts a comment on a posting.'" :object="form" :name="'export_tradingview'" />

          <!-- export full reports -->
          <CheckBox :title="'export_full_reports'" :description="'Get notified when someones posts a comment on a posting.'" :object="form" :name="'export_full_reports'" />

          <!-- export csv -->
          <CheckBox :title="'export_csv'" :description="'Get notified when someones posts a comment on a posting.'" :object="form" :name="'export_csv'" />

          <!-- export json -->
          <CheckBox :title="'export_json'" :description="'Get notified when someones posts a comment on a posting.'" :object="form" :name="'export_json'" />
        </div>

        <Divider class="mt-16">Duration</Divider>

        <div class="flex items-center select-none flex-1 mb-4">
          <input id="start_date"
                 v-model="form.start_date"
                 type="date"
                 name="start_date"
                 class="dark:hover:bg-gray-800 hover:bg-gray-50 cursor-pointer dark:bg-backdrop-dark flex-1 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 flex justify-center items-center w-48 py-4 text-center sm:text-sm border-gray-300 dark:border-gray-600 rounded-l-md border-r-0"
          >

          <input id="finish_date"
                 v-model="form.finish_date"
                 type="date"
                 name="finish_date"
                 class="dark:hover:bg-gray-800 hover:bg-gray-50 cursor-pointer dark:bg-backdrop-dark flex-1 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 flex justify-center items-center w-48 py-4 text-center sm:text-sm border-gray-300 dark:border-gray-600 rounded-r-md">
        </div>
      </div>

      <!-- Results -->
      <div v-if="results.showResults"
           class="w-full mx-auto px-6">
        <div>
          <Divider>Routes</Divider>
          <MultipleValuesTable :data="results.routes_info"/>

          <Divider class="mt-16">Info</Divider>
          <KeyValueTable :data="results.info"/>

          <Divider v-if="hasExecutedTrades" class="mt-16">Equity Curve</Divider>
          <EquityCurve v-if="hasExecutedTrades" :equity-curve="results.charts.equity_curve"/>

          <Divider v-if="hasExecutedTrades" class="mt-16">Performance</Divider>
          <KeyValueTable v-if="hasExecutedTrades" :data="results.metrics"/>

          <div v-if="!hasExecutedTrades"
               class="text-yellow-600 border-yellow-200 bg-gray-700 dark:text-yellow-400 mt-16 text-center text-2xl rounded border-2 border-dashed dark:border-gray-800 py-16 select-none"
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

          <button class="btn-secondary text-center block mb-4 w-full" @click="newBacktest($route.params.id)">
            New session
          </button>
        </div>

        <div v-else>
          <button class="btn-primary text-center block mb-4 w-full" @click="start($route.params.id)">
            Start
          </button>

          <button class="btn-secondary text-center block mb-4 w-full" @click="startInNewTab($route.params.id)">
            Start in a new tab
          </button>
        </div>
      </div>
    </template>
  </LayoutWithSidebar>
</template>

<script>
import { mapActions } from 'pinia'
import { useBacktestStore } from '@/stores/backtest'
import Logs from '@/components/Logs'
import LayoutWithSidebar from '@/layouts/LayoutWithSidebar'
import CheckBox from '@/components/CheckBox'

export default {
  name: 'BacktestTab',
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
  computed: {
    hasExecutedTrades () {
      return this.results.metrics.length > 0
    }
  },
  methods: {
    ...mapActions(useBacktestStore, ['addTab', 'startInNewTab', 'start', 'cancel', 'rerun', 'newBacktest']),
  }
}
</script>

