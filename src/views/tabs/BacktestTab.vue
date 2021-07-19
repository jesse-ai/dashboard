<template>
  <LayoutWithSidebar>
    <template #left>
      <!-- Content -->
      <div v-if="!results.executing && !results.showResults"
           class="px-6">
        <Routes :form="form" :results="results"/>

        <Divider class="mt-16">Options</Divider>

        <div class="grid grid-cols-2 gap-8">
          <!-- debug mode -->
          <CheckBox :title="'debug_mode'" :description="'Get notified when someones posts a comment on a posting.'" :form="form" :value="'debug_mode'" />

          <!-- export chart -->
          <CheckBox :title="'export_chart'" :description="'Get notified when someones posts a comment on a posting.'" :form="form" :value="'export_chart'" />

          <!-- export trading view -->
          <CheckBox :title="'export_tradingview'" :description="'Get notified when someones posts a comment on a posting.'" :form="form" :value="'export_tradingview'" />

          <!-- export full reports -->
          <CheckBox :title="'export_full_reports'" :description="'Get notified when someones posts a comment on a posting.'" :form="form" :value="'export_full_reports'" />

          <!-- export csv -->
          <CheckBox :title="'export_csv'" :description="'Get notified when someones posts a comment on a posting.'" :form="form" :value="'export_csv'" />

          <!-- export json -->
          <CheckBox :title="'export_json'" :description="'Get notified when someones posts a comment on a posting.'" :form="form" :value="'export_json'" />
        </div>

        <Divider class="mt-16">Duration</Divider>

        <div class="flex items-center select-none flex-1 mb-4">
          <input id="start_date"
                 v-model="form.start_date"
                 type="date"
                 name="start_date"
                 class="dark:bg-backdrop-dark flex-1 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 flex justify-center items-center w-48 py-4 text-center sm:text-sm border-gray-300 dark:border-gray-600 rounded-l-md border-r-0"
          >

          <input id="finish_date"
                 v-model="form.finish_date"
                 type="date"
                 name="finish_date"
                 class="dark:bg-backdrop-dark flex-1 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 flex justify-center items-center w-48 py-4 text-center sm:text-sm border-gray-300 dark:border-gray-600 rounded-r-md">
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

          <Divider class="mt-16">Equity Curve</Divider>
          <EquityCurve :equity-curve="results.charts.equity_curve"/>

          <Divider class="mt-16">Performance</Divider>
          <KeyValueTable :data="results.metrics"/>

          <div v-if="form.debug_mode" class="mt-16 overflow-auto mx-auto container">
            <Logs :logs="results.infoLogs" :full="false"/>
            <br>
          </div>
        </div>
      </div>

      <!-- Execution -->
      <div v-if="!form.debug_mode && results.executing && !results.showResults"
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
      <div v-if="form.debug_mode && results.executing" class="h-full overflow-auto mx-auto container">
        <Logs :logs="results.infoLogs"/>
      </div>

      <!-- exception  -->
      <div v-if="results.exception.error && results.executing"
           class="h-full overflow-auto mx-auto container">
        <Exception :title="results.exception.error" :content="results.exception.traceback" />
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
            New backtest
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
  methods: {
    ...mapActions(useBacktestStore, ['addTab', 'startInNewTab', 'start', 'cancel', 'rerun', 'newBacktest']),
  }
}
</script>

