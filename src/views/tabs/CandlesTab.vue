<template>
  <!-- Execution -->
  <div v-if="!form.debug_mode && results.executing && !results.showResults"
       class="flex flex-col items-center justify-center select-none mt-[10%]"
  >
    <div>
      <CircleProgressbar :progress="results.progressbar.current"/>
    </div>

    <h3 class="mt-8 animate-pulse" v-text="remainingTimeText"/>

    <div class="mt-8">
      <button data-cy="import-candles-cancel-button" class="btn-secondary w-64" @click="cancel($route.params.id)">
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
      <div v-if="!results.executing && !results.showResults" data-cy="candles-page-content"
           class="px-6 pb-4">
        <Divider>Exchange</Divider>
        <select
          v-model="form.exchange"
          data-cy="candles-exchange"
          class="dark:bg-backdrop-dark hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer w-full px-6 py-6 border border-gray-200 dark:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-indigo-400 focus:border-indigo-500 rounded-md">
          <option v-for="item in routes.exchanges" :key="item">{{ item }}</option>
        </select>

        <Divider class="mt-16">Symbol</Divider>
        <input v-model="form.symbol"
               data-cy="candles-symbol"
               placeholder="ex: BTC-USDT"
               class="dark:bg-backdrop-dark hover:bg-gray-50 dark:hover:bg-gray-800 w-full px-6 py-6 border border-gray-200 focus:outline-none focus:ring-0 dark:focus:border-indigo-400 focus:border-indigo-500 dark:border-gray-900 rounded-md"
               @input="form.symbol = $event.target.value.toUpperCase()">

        <Divider class="mt-16">Start Date</Divider>
        <div class="flex items-center select-none flex-1">
          <input v-model="form.start_date"
                 data-cy="candles-start-date"
                 type="date"
                 name="start_date"
                 class="dark:hover:bg-gray-800 hover:bg-gray-50 cursor-pointer dark:bg-backdrop-dark flex-1 focus:outline-none focus:ring-0 dark:focus:border-indigo-400 focus:border-indigo-500 flex justify-center items-center py-6 text-center sm:text-sm border border-gray-200 dark:border-gray-900 rounded-md"
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
          <button data-cy="start-button" class="btn-primary text-center block w-full mb-4" @click="start($route.params.id)">
            Start
          </button>

          <button data-cy="start-new-tab-button" class="btn-secondary text-center block w-full mb-4" @click="startInNewTab($route.params.id)">
            Start in a new tab
          </button>
        </div>
      </div>
    </template>
  </LayoutWithSidebar>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useCandlesStore } from '@/stores/candles'
import LayoutWithSidebar from '@/layouts/LayoutWithSidebar'
import { useMainStore } from '@/stores/main'

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
  computed: {
    ...mapState(useMainStore, ['routes', 'isInitiated']),
    remainingTimeText () {
      if (Math.round(this.results.progressbar.estimated_remaining_seconds) === 0) {
        return 'Please wait...'
      }

      return `${Math.round(this.results.progressbar.estimated_remaining_seconds)} seconds remaining...`
    }
  },
  watch: {
    form () {
      this.initiate()
    },
    isInitiated (newValue, oldValue) {
      this.initiate()
    }
  },
  created () {
    this.initiate()
  },
  methods: {
    ...mapActions(useCandlesStore, ['addTab', 'startInNewTab', 'start', 'cancel', 'rerun', 'newBacktest']),
    initiate () {
      if (this.isInitiated === true && this.form.exchange === '') {
        this.form.exchange = this.routes.exchanges[0]
      }
    }
  }
}
</script>

