<template>
  <!-- Content -->
  <div v-if="!results.executing && !results.showResults"
       class="px-4 sm:px-6 md:px-8 h-full max-h-screen overflow-y-auto">
    <Divider>Exchange</Divider>
    <select
      v-model="form.exchange"
      class="hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
      <option v-for="item in exchanges" :key="item">{{ item }}</option>
    </select>

    <Divider class="mt-16">Symbol</Divider>
    <input v-model="form.symbol"
           placeholder="ex: BTC-USDT"
           class="hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md" >

    <Divider class="mt-16">Start Date</Divider>
    <div class="flex items-center select-none flex-1">
      <input id="start_date"
             v-model="form.start_date"
             type="date"
             name="start_date"
             class="flex-1 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 flex justify-center items-center w-48 py-4 text-center sm:text-sm border-gray-200 rounded-md"
      >
    </div>

    <br>
    <!--    <pre>{{ activeTabIndex }}</pre>-->
    <!--    <pre>{{ form }}</pre>-->
  </div>

  <!-- Results -->
  <div v-if="results.showResults"
       class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full max-h-screen overflow-y-auto">
    <div>
      <Divider>
        Routes
      </Divider>
      <MultipleValuesTable :data="results.routes_info"/>


      <Divider class="mt-16">
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

      <div v-if="form.debug_mode" class="mt-16 overflow-auto mx-auto container">
        <Logs :logs="results.infoLogs" :full="false"/>
        <br>
      </div>

      <pre>
      {{ results }}
    </pre>
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
import { useCandlesStore } from '@/stores/candles'
import Logs from '@/components/Logs'

export default {
  name: 'CandlesTab',
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
      exchanges: ['Binance', 'Bitfinex']
    }
  },
  methods: {
    ...mapActions(useCandlesStore, ['addTab', 'startInNewTab', 'start', 'cancel', 'rerun', 'newBacktest']),
  }
}
</script>

