<template>
  <!-- Content -->
  <div v-if="!results.booting && !results.monitoring && !results.showResults"
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
          <input id="paper_mode" v-model="form.paper_mode"
                 name="paper_mode"
                 type="checkbox"
                 class="focus:ring-0 h-4 w-4 text-indigo-600 border-gray-300 rounded">
        </div>
        <div class="ml-3 text-sm">
          <label for="paper_mode" class="font-medium text-gray-700 cursor-pointer">paper_mode</label>
          <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Monitoring Dashboard -->
  <div v-if="results.monitoring" class="px-4 sm:px-6 md:px-8 h-full max-h-screen overflow-y-auto">
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
      <div class="px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Started
        </dt>
        <dd class="mt-1 text-base font-semibold text-gray-900">
          3 hours ago
        </dd>
      </div>

      <div class="px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Current Time
        </dt>
        <dd class="mt-1 text-base font-semibold text-gray-900">
          13:58:39
        </dd>
      </div>

      <div class="px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Started/Current Balance
        </dt>
        <dd class="mt-1 text-base font-semibold text-gray-900">
          968.91/968.67 USDT
        </dd>
      </div>

      <div class="px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
        <dt class="text-sm font-medium text-gray-500 truncate">
          Debug Mode
        </dt>
        <dd class="mt-1 text-base font-semibold text-gray-900">
          True
        </dd>
      </div>
    </dl>

    <Divider class="mt-12">
      Chart
    </Divider>
    <div class="my-4">
      <img src="@/assets/imgs/realtime-candle-chart.png" alt="sample" class="h-64">
    </div>

    <!--tables-->
    <Divider class="mt-12">Positions</Divider>
    <MultipleValuesTable :data="results.positions"/>

    <Divider class="mt-12">Orders</Divider>
    <MultipleValuesTable :data="results.positions"/>
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
    </div>
  </div>

  <!-- Action Buttons -->
  <div v-if="!results.booting" class="py-4 px-4 sm:px-6 md:px-8 w-full border-t">
    <div v-if="results.showResults" class="max-w-7xl mx-auto flex">
      <button class="btn-primary text-center mr-2 flex-1" @click="rerun($route.params.id)">
        Rerun
      </button>

      <button class="btn-secondary text-center ml-2 flex-1" @click="newLive($route.params.id)">
        New Session
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

<script>
import { mapActions } from 'pinia'
import Logs from '@/components/Logs'
import { useLiveStore } from '@/stores/live'

export default {
  name: 'LiveTab',
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
  data () {
    return {
      positions: [
        ['.', 'TrendFollowing', 'BTC-USDT', '3', '1 hour, 56 minutes, 9 seconds ago', 0.1, 60458, '-0.09 (-0.0424%)'],
        ['.', 'TrendFollowing', 'ETH-USDT', '3', '1 hour, 56 minutes, 9 seconds ago', 0.1, 60458, '-0.09 (-0.0424%)'],
      ]
    }
  },
  methods: {
    ...mapActions(useLiveStore, ['addTab', 'startInNewTab', 'start', 'cancel', 'rerun', 'newLive']),
  }
}
</script>

