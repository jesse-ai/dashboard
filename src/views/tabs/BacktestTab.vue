<template>
  <!-- Content -->
  <div v-if="!results.executing && !results.showResults"
       class="px-4 sm:px-6 md:px-8 h-full max-h-screen overflow-y-auto">
    <Routes :form="form" :results="results"/>

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
          <label for="export_full_reports"
                 class="font-medium text-gray-700 cursor-pointer">export_full_reports</label>
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

      <div v-if="form.debug_mode" class="mt-16 overflow-auto mx-auto container">
        <Logs :logs="results.infoLogs" :full="false"/>
        <br>
      </div>

      <!--            <pre>-->
      <!--      {{ results }}-->
      <!--            </pre>-->
    </div>
  </div>

  <!-- Action Buttons -->
  <div v-if="!results.executing" class="py-4 px-4 sm:px-6 md:px-8 w-full border-t">
    <div v-if="results.showResults" class="max-w-7xl mx-auto flex">
      <button class="btn-primary text-center mr-2 flex-1" @click="rerun($route.params.id)">
        Rerun
      </button>

      <button class="btn-secondary text-center ml-2 flex-1" @click="newBacktest($route.params.id)">
        New backtest
      </button>
    </div>

    <div v-else class="max-w-7xl mx-auto flex">
      <button class="btn-primary text-center mr-2 flex-1" @click="start($route.params.id)">
        Start
      </button>

      <button class="btn-secondary text-center ml-2 flex-1" @click="startInNewTab($route.params.id)">
        Start in a new tab
      </button>
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

<script>
import { mapActions } from 'pinia'
import { useBacktestStore } from '@/stores/backtest'
import Logs from '@/components/Logs'

export default {
  name: 'BacktestTab',
  components: { Logs },
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

