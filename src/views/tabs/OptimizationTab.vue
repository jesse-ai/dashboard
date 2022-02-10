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
      <!-- alert -->
      <div v-if="results.alert.message">
        <Alert :data="results.alert"/>
      </div>

      <!-- exception  -->
      <div v-if="results.exception.error && results.executing" class="mb-8">
        <Exception :title="results.exception.error"
                   :content="results.exception.traceback"
                   mode="optimize"
        />
      </div>

      <!-- Execution -->
      <div v-if="(results.executing || results.showResults) && !results.exception.error">
        <Divider title="Info"/>
        <KeyValueTable v-if="results.generalInfo.length" :data="results.generalInfo" />
        <TablePlaceholder v-else/>

        <div v-if="results.best_candidates.length" class="mt-16">
          <Divider title="Best DNA Candidates"/>
          <MultipleValuesTable :data="results.best_candidates" header/>
        </div>
      </div>

      <!-- Content -->
      <div v-if="!results.executing && !results.showResults">
        <Routes v-if="isInitiated" :form="form" :results="results"/>

        <Divider class="mt-16" title="Options"/>

        <div class="grid grid-cols-1 gap-6">
          <!-- debug mode -->
          <ToggleButton
            :object="form"
            name="debug_mode"
            title="Debug Mode"
            description="Displays detailed logs about the genetics algorithm. Use it if you are interested in the genetics algorithm and are familiar with its basics."/>

          <!--          &lt;!&ndash; export csv &ndash;&gt;-->
          <!--          <ToggleButton-->
          <!--            :object="form"-->
          <!--            name="export_csv"-->
          <!--            title="Export CSV"-->
          <!--            description="Exports a CSV file of all DNAs on completion"/>-->

          <!--          &lt;!&ndash; export json &ndash;&gt;-->
          <!--          <ToggleButton-->
          <!--            :object="form"-->
          <!--            name="export_json"-->
          <!--            title="Export JSON"-->
          <!--            description="Exports a JSON file of all DNAs on completion"/>-->
        </div>

        <!-- optimal_total -->
        <div class="select-none">
          <Divider class="mt-16" title="Optimal Trades"/>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            The number that tells Jesse how many trades you would find optimal for your strategy in the targeted time
            period so that it can filter out those DNAs that cause too few trades.
            <a href="https://docs.jesse.trade/docs/optimize/executing-the-optimize-mode.html" target="_blank" class="font-semibold hover:underline italic">More Details...</a>
          </p>
          <br>
          <NumberInput title="Optimal number of trades:" name="optimal_total" :object="form"/>
        </div>

        <Divider class="mt-16" title="Duration"/>

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
    </template>

    <template #right>
      <!-- Action Buttons -->
      <div v-if="!results.executing && !results.showResults">
        <div>
          <button class="flex justify-center items-center btn-primary text-center mb-4 w-full" @click="start($route.params.id)">
            <LightningBoltIcon class="w-5 h-5 mr-2" />
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

          <a v-if="form.debug_mode"
             :href="logsUrl"
             class="flex justify-center items-center btn-secondary text-center mb-4 w-full">
            <DocumentDownloadIcon class="w-5 h-5 mr-2" />
            Debugging Logs
          </a>
        </div>

        <div>
          <CircleProgressbar :progress="results.progressbar.current"/>
        </div>

        <h3 v-if="!results.exception.error && !results.best_candidates.length" class="mt-8 animate-pulse" v-text="remainingTimeText"/>
      </div>
      <!-- Show Results -->
      <div v-if="results.showResults">
        <div class="mb-8 w-full">
          <button class="flex justify-center items-center btn-success text-center mb-4 w-full" @click="newSession">
            <ReplyIcon class="w-5 h-5 mr-2" />
            New session
          </button>

          <a v-if="form.debug_mode"
             :href="logsUrl"
             class="flex justify-center items-center btn-secondary text-center mb-4 w-full">
            <DocumentDownloadIcon class="w-5 h-5 mr-2" />
            Debugging Logs
          </a>
        </div>
      </div>
    </template>
  </LayoutWithSidebar>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useOptimizationStore } from '@/stores/optimization'
import { DocumentDownloadIcon, LightningBoltIcon, ReplyIcon } from '@heroicons/vue/outline'
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
import helpers from '@/helpers'

export default {
  name: 'OptimizationTab',
  components: {
    LayoutWithSidebar,
    Logs,
    ToggleButton,
    MultipleValuesTable,
    ClipboardIcon,
    DocumentDownloadIcon,
    CheckIcon,
    SlideOver,
    Routes,
    Divider,
    CircleProgressbar,
    Exception,
    LightningBoltIcon,
    ReplyIcon,
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
    ...mapState(useMainStore, ['isInitiated', 'baseURL']),
    auth_key () {
      return sessionStorage.auth_key
    },
    remainingTimeText () {
      return helpers.remainingTimeText(this.results.progressbar.estimated_remaining_seconds)
    },
    logsUrl () {
      let url = `/download/optimize/log?token=${this.auth_key}`
      if (this.baseURL !== '/') {
        url = this.baseURL + url
      }
      return url
    },
  },
  watch: {
    form: {
      handler () {
        helpers.localStorageSet('optimizationForm', this.form)
      },
      deep: true
    },
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
    newSession () {
      this.results.showResults = false
      this.results.executing = false
      this.results.progressbar.current = 0
      this.results.progressbar.estimated_remaining_seconds = 0
      this.results.alert.message = ''
      this.results.alert.type = ''
    }
  }
}
</script>

