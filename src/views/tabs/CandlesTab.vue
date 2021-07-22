<template>
  <!-- Execution -->
  <div v-if="!form.debug_mode && results.executing && !results.showResults"
       class="flex flex-col items-center justify-center select-none mt-[10%]"
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

    <!-- exception  -->
    <div v-if="results.exception.error && results.executing" class="mx-auto container mt-8">
      <Exception :title="results.exception.error" :content="results.exception.traceback" />
    </div>
  </div>

  <LayoutWithSidebar v-else>
    <template #left>
      <div v-if="results.alert.message" class="px-6 mb-10">
        <Alert :data="results.alert"/>
      </div>

      <!-- Content -->
      <div v-if="!results.executing && !results.showResults"
           class="px-6">
        <Divider>Exchange</Divider>
        <select
          v-model="form.exchange"
          class="dark:bg-backdrop-dark hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer w-full pl-3 pr-10 py-6 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
          <option v-for="item in exchanges" :key="item">{{ item }}</option>
        </select>

        <Divider class="mt-16">Symbol</Divider>
        <input v-model="form.symbol"
               placeholder="ex: BTC-USDT"
               class="dark:bg-backdrop-dark hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer w-full pl-3 pr-10 py-6 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md" >

        <Divider class="mt-16">Start Date</Divider>
        <div class="flex items-center select-none flex-1">
          <input id="start_date"
                 v-model="form.start_date"
                 type="date"
                 name="start_date"
                 class="dark:bg-backdrop-dark flex-1 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 flex justify-center items-center w-48 py-4 text-center sm:text-sm border-gray-200 dark:border-gray-600 rounded-md"
          >
        </div>
      </div>
    </template>

    <template #right>
      <!-- Action Buttons -->
      <div v-if="!results.executing">
        <div v-if="results.showResults">
          <button class="btn-primary text-center block w-full mb-4" @click="rerun($route.params.id)">
            Rerun
          </button>

          <button class="btn-secondary text-center block w-full mb-4" @click="newBacktest($route.params.id)">
            New backtest
          </button>
        </div>

        <div v-else>
          <button class="btn-primary text-center block w-full mb-4" @click="start($route.params.id)">
            Start
          </button>

          <button class="btn-secondary text-center block w-full mb-4" @click="startInNewTab($route.params.id)">
            Start in a new tab
          </button>
        </div>
      </div>
    </template>
  </LayoutWithSidebar>
</template>

<script>
import { mapActions } from 'pinia'
import { useCandlesStore } from '@/stores/candles'
import LayoutWithSidebar from '@/layouts/LayoutWithSidebar'

export default {
  name: 'CandlesTab',
  components: { LayoutWithSidebar },
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
      exchanges: ['Binance', 'Bitfinex', 'Binance Futures']
    }
  },
  methods: {
    ...mapActions(useCandlesStore, ['addTab', 'startInNewTab', 'start', 'cancel', 'rerun', 'newBacktest']),
  }
}
</script>

