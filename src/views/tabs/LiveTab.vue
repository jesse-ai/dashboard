<template>
  <!-- general logs modal -->
  <SlideOver name="infoLogs"
             :object="modals"
             title="Info Logs">
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

      <!-- for making copy with breaks -->
      <textarea v-if="displayInfo" id="copy-info-logs" class="fixed left-0 opacity-0" :value="results.infoLogs" />
    </template>
  </SlideOver>

  <!-- error logs modal -->
  <SlideOver name="errorLogs"
             :object="modals"
             title="Error Logs">
    <template #default>
      <Logs :logs="results.errorLogs"/>
    </template>

    <template #buttons>
      <button
        class="btn-nav"
        @click="copyErrorLogs">
        <CheckIcon v-if="copiedErrorLogs" class="h-6 w-6" aria-hidden="true" />
        <ClipboardIcon v-if="!copiedErrorLogs && results.errorLogs.length != 0" class="h-6 w-6" aria-hidden="true" />
      </button>

      <!-- for making copy with breaks -->
      <textarea v-if="displayErrors" id="copy-error-logs" type="hidden" :value="results.errorLogs"
                class="fixed left-0 opacity-0" />
    </template>
  </SlideOver>

  <!-- session termination modal -->
  <ConfirmModal
    title="Termination Confirm"
    description="Are you sure you want to terminate this session?"
    type="info" :object="modals" name="terminationConfirm"
  >
    <button class="btn-danger ml-2" @click="stop($route.params.id)">Terminate</button>
  </ConfirmModal>

  <!-- Execution -->
  <div v-if="results.booting"
       class="flex flex-col items-center justify-center select-none mt-[10%]"
  >
    <div>
      <CircleProgressbar :progress="results.progressbar.current"/>
    </div>

    <h3 class="mt-8 animate-pulse" v-text="remainingTimeText"/>

    <div class="mt-8">
      <button v-if="form.debug_mode" class="flex justify-center items-center btn-primary mb-4 w-64" @click="modals.infoLogs = true">
        <ClipboardListIcon class="w-5 h-5 mr-2"/>
        View Logs
      </button>

      <button data-cy="live-cancel-button" class="btn-secondary w-64" @click="cancel($route.params.id)">
        Cancel
      </button>
    </div>

    <!-- exception  -->
    <div v-if="results.exception.error" class="mx-auto container mt-8">
      <Exception :title="results.exception.error"
                 :content="results.exception.traceback"
                 mode="live"
                 :debug-mode="form.debug_mode"
                 :session-id="results.generalInfo.session_id"
      />
    </div>
  </div>

  <LayoutWithSidebar v-else>
    <template #left>
      <!-- form -->
      <div v-if="!results.booting && !results.monitoring && !results.showResults" data-cy="live-page-content">
        <Routes v-if="isInitiated" :form="form" :results="results"/>

        <Divider class="mt-16">Options</Divider>

        <div class="grid grid-cols-1 gap-6">
          <ToggleButton
            :object="form"
            name="debug_mode"
            title="Debug Mode"
            description="Logs more details, helpful for debugging. Not recommended for beginners."/>

          <ToggleButton
            :object="form"
            name="paper_mode"
            title="Paper Trade"
            description="Trade in real-time using actual exchange data with PAPER money."/>
        </div>
      </div>

      <!-- Monitoring Dashboard -->
      <div v-if="results.monitoring" class="px-4 sm:px-6 md:px-8">
        <!-- exception  -->
        <div v-if="results.exception.error" class="mb-8">
          <Exception :title="results.exception.error"
                     :content="results.exception.traceback"
                     mode="live"
                     :debug-mode="form.debug_mode"
                     :session-id="results.generalInfo.session_id"
          />
        </div>

        <!-- Candlesticks chart-->
        <div>
          <CandlesChart v-if="results.candles.length" :candles="results.candles" :results="results" :form="form"/>
        </div>

        <!--tables-->
        <Divider class="mt-12">Routes</Divider>
        <MultipleValuesTable :data="results.routes" header/>

        <Divider class="mt-12">Positions</Divider>
        <MultipleValuesTable :data="results.positions" header/>

        <Divider class="mt-12">Orders</Divider>
        <MultipleValuesTable :data="results.orders" header/>
      </div>
    </template>

    <template #right>
      <!-- Action Buttons -->
      <div v-if="!results.booting">
        <div v-if="results.monitoring">
          <button v-if="results.finished" class="flex justify-center items-center btn-primary text-center mb-4 w-full"
                  @click="newLive($route.params.id)">
            <PlusSmIcon class="w-5 h-5 mr-2" />
            New session
          </button>

          <button v-else class="flex items-center justify-center btn-cancel text-center mr-2 w-full mb-4" @click="modals.terminationConfirm = true">
            <StopIcon class="w-5 h-5 mr-2" />
            Stop
          </button>
        </div>

        <div v-else data-cy="live-action-button">
          <button v-if="isLoggedInToJesseTrade"
                  data-cy="live-start-button"
                  class="flex justify-center items-center btn-primary text-center mr-2 w-full mb-4"
                  @click="start($route.params.id)">
            <LightningBoltIcon class="w-5 h-5 mr-2" />
            Start
          </button>

          <button v-else
                  data-cy="live-login-button"
                  class="btn-primary text-center mr-2 block w-full mb-4"
                  @click="navModals.jesseTradeLogin = true">
            Login to Jesse.Trade
          </button>

          <!--          <button class="btn-secondary text-center block w-full mb-4" @click="startInNewTab($route.params.id)">-->
          <!--            Start in a new tab-->
          <!--          </button>-->
        </div>
      </div>

      <hr class="my-8 border-2 dark:border-gray-600 rounded-full">

      <!-- general info table-->
      <dl v-if="results.monitoring"
          class="grid grid-cols-1 gap-6 border dark:border-gray-600 rounded py-4 px-6 select-none">
        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Current Time:</div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {{ timestampToTime(results.generalInfo.current_time) }}
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Started:</div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {{ timestampToTime(results.generalInfo.started_at) }}
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Started/Current Balance:</div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {{ `${results.generalInfo.started_balance}/${results.generalInfo.current_balance}` }}
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Debug Mode:</div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ results.generalInfo.debug_mode }}</div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Paper Trade:</div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ results.generalInfo.paper_mode }}</div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">PNL:</div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {{ `${results.generalInfo.pnl} USDT (${results.generalInfo.pnl_perc}%)` }}
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Trades:</div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {{ results.generalInfo.count_trades }}
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex justify-start items-center">
            <button
              class="text-sm font-medium text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 truncate flex items-center hover:underline cursor-pointer focus:outline-none"
              @click="modals.infoLogs = true">
              <span>Info Logs:</span>
              <div class="focus:outline-none flex justify-start items-center" >
                <ClipboardListIcon class="w-6 h-6 ml-2"/>
              </div>
            </button>
          </div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {{ results.generalInfo.count_info_logs }}
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex justify-start items-center">
            <button
              class="text-sm font-medium text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 truncate flex items-center hover:underline cursor-pointer focus:outline-none"
              @click="modals.errorLogs = true">
              <span>Error Logs:</span>
              <div class="focus:outline-none flex justify-start items-center">
                <ClipboardListIcon class="w-6 h-6 ml-2 cursor-pointer"/>
              </div>
            </button>
          </div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {{ results.generalInfo.count_error_logs }}
          </div>
        </div>
      </dl>
    </template>
  </LayoutWithSidebar>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import Logs from '@/components/Logs'
import { useLiveStore } from '@/stores/live'
import helpers from '@/helpers'
import LayoutWithSidebar from '@/layouts/LayoutWithSidebar'
import { ClipboardIcon, ClipboardListIcon, CheckIcon, LightningBoltIcon, PlusSmIcon, StopIcon } from '@heroicons/vue/outline'
import ToggleButton from '@/components/ToggleButton'
import { useMainStore } from '@/stores/main'
import ConfirmModal from '@/components/Modals/ConfirmModal'
import SlideOver from '@/components/Functional/SlideOver'
import CircleProgressbar from '@/components/Functional/CircleProgressbar'
import Exception from '@/components/Exception'
import MultipleValuesTable from '@/components/MultipleValuesTable'

export default {
  name: 'LiveTab',
  components: {
    ToggleButton,
    LayoutWithSidebar,
    Logs,
    ClipboardListIcon,
    ConfirmModal,
    SlideOver,
    CircleProgressbar,
    Exception,
    MultipleValuesTable,
    ClipboardIcon,
    CheckIcon,
    LightningBoltIcon,
    PlusSmIcon,
    StopIcon
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    results: {
      type: Object,
      required: true
    },
    modals: {
      type: Object,
      required: true
    },
  },
  setup () {
    return {
      timestampToTime: helpers.timestampToTime
    }
  },
  data () {
    return {
      displayInfo: false,
      displayErrors: false,
      copiedLogsInfo: false,
      copiedErrorLogs: false
    }
  },
  computed: {
    ...mapState(useMainStore, ['isInitiated', 'isLoggedInToJesseTrade']),
    ...mapState(useMainStore, {
      navModals: 'modals'
    }),
    remainingTimeText () {
      if (Math.round(this.results.progressbar.estimated_remaining_seconds) === 0) {
        return 'Please wait...'
      }

      return `${Math.round(this.results.progressbar.estimated_remaining_seconds)} seconds remaining...`
    }
  },
  watch: {
    form: {
      handler () {
        helpers.localStorageSet('liveForm', this.form)
      },
      deep: true
    },
  },
  methods: {
    ...mapActions(useLiveStore, ['addTab', 'startInNewTab', 'start', 'cancel', 'stop', 'newLive']),
    copyInfoLogs () {
      this.displayInfo = true
      setTimeout(() => {
        const infoLogsToCopy = document.querySelector('#copy-info-logs')
        infoLogsToCopy.setAttribute('type', 'text')
        infoLogsToCopy.select()
        document.execCommand('copy')
        this.copiedLogsInfo = true

        /* unselect the range */
        infoLogsToCopy.setAttribute('type', 'hidden')
        window.getSelection().removeAllRanges()
        this.displayInfo = false
      }, 10)
      setTimeout(() => {
        this.copiedLogsInfo = false
      }, 3000)
    },
    copyErrorLogs () {
      this.displayErrors = true
      setTimeout(() => {
        const infoErrorToCopy = document.querySelector('#copy-error-logs')
        infoErrorToCopy.setAttribute('type', 'text')
        infoErrorToCopy.select()
        document.execCommand('copy')
        this.copiedErrorLogs = true

        /* unselect the range */
        infoErrorToCopy.setAttribute('type', 'hidden')
        window.getSelection().removeAllRanges()
        this.displayErrors = false
      }, 10)

      setTimeout(() => {
        this.copiedErrorLogs = false
      }, 3000)
    }
  }
}
</script>

