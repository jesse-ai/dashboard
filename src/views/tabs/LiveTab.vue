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
        <ClipboardIcon class="h-6 w-6" aria-hidden="true" />
      </button>
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
        <ClipboardIcon class="h-6 w-6" aria-hidden="true" />
      </button>
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

    <h3 class="mt-8">{{ Math.round(results.progressbar.estimated_remaining_seconds) }} seconds remaining...</h3>

    <div class="mt-8">
      <button v-if="form.debug_mode" class="btn-primary block mb-4 w-64" @click="modals.infoLogs = true">
        View Logs
      </button>

      <button class="btn-secondary w-64" @click="cancel($route.params.id)">
        Cancel
      </button>
    </div>

    <!-- exception  -->
    <div v-if="results.exception.error" class="mx-auto container mt-8">
      <Exception :title="results.exception.error" :content="results.exception.traceback"/>
    </div>
  </div>

  <LayoutWithSidebar v-else>
    <template #left>
      <!-- form -->
      <div v-if="!results.booting && !results.monitoring && !results.showResults"
           class="px-4 sm:px-6 md:px-8">
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
          <Exception :title="results.exception.error" :content="results.exception.traceback"/>
        </div>

        <!-- Candlesticks chart-->
        <div>
          <CandlesChart v-if="results.candles.length" :candles="results.candles" :results="results" :form="form"/>
        </div>

        <!--tables-->
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
          <button v-if="results.finished" class="btn-primary text-center block mb-4 w-full"
                  @click="newLive($route.params.id)">
            New session
          </button>

          <button v-else class="btn-secondary text-center mr-2 block w-full mb-4" @click="modals.terminationConfirm = true">
            Stop
          </button>
        </div>

        <div v-else>
          <button class="btn-primary text-center mr-2 block w-full mb-4" @click="start($route.params.id)">
            Start
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
              class="text-sm font-medium text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 truncate flex items-center hover:underline cursor-pointer"
              @click="modals.infoLogs = true">
              <span>Info Logs:</span>
            </button>
            <button class="focus:outline-none flex justify-start items-center" @click="copyInfoLogs">
              <ClipboardListIcon class="w-6 h-6 ml-2 cursor-pointer"/>
              <span v-if="copy_info_logs" class="ml-1 text-xs">copied</span>
            </button>
          </div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {{ results.generalInfo.count_info_logs }}
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex justify-start items-center">
            <button
              class="text-sm font-medium text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 truncate flex items-center hover:underline cursor-pointer"
              @click="modals.errorLogs = true">
              <span>Error Logs:</span>
            </button>
            <button class="focus:outline-none flex justify-start items-center" @click="copyErrorLogs">
              <ClipboardListIcon class="w-6 h-6 ml-2 cursor-pointer"/>
              <span v-if="copy_error_logs" class="ml-1 text-xs">copied</span>
            </button>
          </div>
          <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {{ results.generalInfo.count_error_logs }}
          </div>
        </div>
      </dl>
      <input id="copy-info-logs" type="hidden" :value="results.infoLogs" >
      <input id="copy-error-logs" type="hidden" :value="results.errorLogs" >
    </template>
  </LayoutWithSidebar>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import Logs from '@/components/Logs'
import { useLiveStore } from '@/stores/live'
import helpers from '@/helpers'
import LayoutWithSidebar from '@/layouts/LayoutWithSidebar'
import { ClipboardIcon, ClipboardListIcon } from '@heroicons/vue/outline'
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
    ClipboardIcon
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
      positions: [
        ['.', 'TrendFollowing', 'BTC-USDT', '3', '1 hour, 56 minutes, 9 seconds ago', 0.1, 60458, '-0.09 (-0.0424%)'],
        ['.', 'TrendFollowing', 'ETH-USDT', '3', '1 hour, 56 minutes, 9 seconds ago', 0.1, 60458, '-0.09 (-0.0424%)'],
      ],
      copy_info_logs: false,
      copy_error_logs: false
    }
  },
  computed: {
    ...mapState(useMainStore, ['isInitiated']),
  },
  methods: {
    ...mapActions(useLiveStore, ['addTab', 'startInNewTab', 'start', 'cancel', 'stop', 'newLive']),
    copyInfoLogs () {
      const infoLogsToCopy = document.querySelector('#copy-info-logs')
      infoLogsToCopy.setAttribute('type', 'text')
      infoLogsToCopy.select()
      document.execCommand('copy')
      this.copy_info_logs = true

      /* unselect the range */
      infoLogsToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()

      setTimeout(() => {
        this.copy_info_logs = false
      }, 3000)
    },
    copyErrorLogs () {
      const infoErrorToCopy = document.querySelector('#copy-error-logs')
      infoErrorToCopy.setAttribute('type', 'text')
      infoErrorToCopy.select()
      document.execCommand('copy')
      this.copy_error_logs = true

      /* unselect the range */
      infoErrorToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()

      setTimeout(() => {
        this.copy_error_logs = false
      }, 3000)
    }
  }
}
</script>

