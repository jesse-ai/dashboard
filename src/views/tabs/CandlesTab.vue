<template>
  <!-- Execution -->
  <div v-if="!form.debug_mode && results.executing && !results.showResults"
       class="flex flex-col items-center justify-center select-none mt-[10%]"
  >
    <div>
      <CircleProgressbar :progress="results.progressbar.current"/>
    </div>

    <h3 v-if="!results.exception.error" class="mt-8 animate-pulse" v-text="remainingTimeText"/>

    <div class="mt-8">
      <button data-cy="import-candles-cancel-button" class="flex items-center justify-center btn-secondary w-64" @click="cancel($route.params.id)">
        <BanIcon class="w-5 h-5 mr-2" />
        Cancel
      </button>
    </div>

    <!-- exception  -->
    <div v-if="results.exception.error && results.executing" class="mx-auto container mt-8">
      <Exception :title="results.exception.error"
                 :content="results.exception.traceback"
                 mode="candles"
      />
    </div>
  </div>

  <LayoutWithSidebar v-else>
    <template #left>
      <!-- alert -->
      <div v-if="results.alert.message">
        <Alert :data="results.alert"/>
      </div>

      <!-- Content -->
      <div v-if="!results.executing && !results.showResults" data-cy="candles-page-content"
           class="pb-4">
        <!-- exchange -->
        <Divider title="Exchange"/>
        <select
          v-model="form.exchange"
          data-cy="candles-exchange"
          class="dark:bg-backdrop-dark hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer w-full px-6 py-6 border border-gray-200 dark:border-gray-900 focus:outline-none focus:ring-0 dark:focus:border-indigo-400 focus:border-indigo-500 rounded-md">
          <option v-for="item in backtestingExchangeNames" :key="item">{{ item }}</option>
        </select>

        <!-- symbol -->
        <Divider class="mt-16" title="Symbol"/>
        <input v-model="form.symbol"
               data-cy="candles-symbol"
               placeholder="ex: BTC-USDT"
               class="dark:bg-backdrop-dark hover:bg-gray-50 dark:hover:bg-gray-800 w-full px-6 py-6 border border-gray-200 focus:outline-none focus:ring-0 dark:focus:border-indigo-400 focus:border-indigo-500 dark:border-gray-900 rounded-md"
        >

        <!-- symbol error section -->
        <div v-if="totalSymbolError.length >> 0" data-cy="symbol-error-section" class="text-sm text-red-400 p-2 rounded-lg mb-4 mt-2" >
          <div v-for="(item, i) in totalSymbolError" :key="i" class="flex justify-start items-center mb-2">
            <ExclamationIcon class="-ml-1.5 mr-1 h-5 w-5"/>

            <div :data-cy="'error' + i" v-html="item" />
          </div>
        </div>

        <Divider class="mt-16" title="Start Date"/>
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
          <button data-cy="start-button" class="flex items-center justify-center btn-primary text-center w-full mb-4" @click="start($route.params.id)">
            <LightningBoltIcon class="w-5 h-5 mr-2" />
            Start
          </button>

          <button data-cy="start-new-tab-button" class="flex items-center justify-center btn-secondary text-center w-full mb-4" @click="startInNewTab($route.params.id)">
            <PlusSmIcon class="w-5 h-5 mr-2" />
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
import { LightningBoltIcon, PlusSmIcon, BanIcon } from '@heroicons/vue/outline'
import LayoutWithSidebar from '@/layouts/LayoutWithSidebar'
import { useMainStore } from '@/stores/main'
import { ExclamationIcon } from '@heroicons/vue/solid'
import helpers from '@/helpers'

export default {
  name: 'CandlesTab',
  components: { LayoutWithSidebar, ExclamationIcon, LightningBoltIcon, PlusSmIcon, BanIcon },
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
      totalSymbolError: [],
      copiedForm: { symbol: this.form }
    }
  },
  computed: {
    ...mapState(useMainStore, ['isInitiated', 'backtestingExchangeNames']),
    remainingTimeText () {
      return helpers.remainingTimeText(this.results.progressbar.estimated_remaining_seconds)
    },
  },
  watch: {
    form: {
      handler () {
        this.initiate()

        if (this.isInitiated === true && this.form.exchange !== '') {
          helpers.localStorageSet('candlesForm', this.form)
        }
      },
      deep: true
    },
    isInitiated (newValue, oldValue) {
      this.initiate()
    },
    copiedForm: {
      handler () {
        this.checkSymbol()
      },
      deep: true
    },
  },
  created () {
    this.initiate()
    this.checkSymbol()
  },
  methods: {
    ...mapActions(useCandlesStore, ['addTab', 'startInNewTab', 'start', 'cancel', 'rerun', 'newBacktest']),
    initiate () {
      if (this.isInitiated === true && this.form.exchange === '') {
        this.form.exchange = this.backtestingExchangeNames[0]
      }
    },
    checkSymbol () {
      this.totalSymbolError = []
      const symbolErrors = []

      const ERRORS = {
        maxSymbolLengthErrorMessage: 'Maximum symbol length is exceeded!',
        mustContainDashErrorMessage: 'Symbol parameter must contain "-" character!',
        emptySymbolErrorMessage: 'Symbol parameter cannot be empty',
      }

      if (this.form.symbol.length === 0) {
        symbolErrors.push(ERRORS.emptySymbolErrorMessage)
      }

      if (!symbolErrors.includes(ERRORS.maxSymbolLengthErrorMessage) && this.form.symbol.length > 19) {
        symbolErrors.push(ERRORS.maxSymbolLengthErrorMessage)
      }

      if (this.form.symbol.length >= 5) {
        let checkDash = false
        for (const item1 of this.form.symbol.substring(3, 5)) {
          if (item1 === '-') {
            checkDash = true
          }
        }
        if (!checkDash) {
          symbolErrors.push(ERRORS.mustContainDashErrorMessage)
        }
      }

      for (const item of symbolErrors) {
        this.totalSymbolError.push(item)
      }
    },
  }
}
</script>

