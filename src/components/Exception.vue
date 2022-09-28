<template>
  <SlideOver name="exceptionReport"
             :object="modals"
             title="Report">
    <div v-if="alert.message" class="mb-4">
      <Alert :data="alert"/>
    </div>

    <p>
      If the exception you're seeing is not clear and you think it might be a bug, please send us a report to help
      us debugging and fixing it in a future release.
    </p>

    <br>

    <label class="font-semibold">Exception:</label>
    <pre
      class="break-all lg:break-normal mt-2 text-sm whitespace-pre-line px-6 py-6 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 dark:border-gray-800 border border-gray-200"
      v-html="content" />

    <br>

    <FormTextarea title="Description (optional):"
                  placeholder="Describe how the exception occurred..."
                  name="description"
                  :object="form"
                  :rows="10"
    />

    <br>

    <div v-if="!hasLivePluginInstalled">
      <FormInput title="Email (must be registered with on Jesse.Trade)"
                 description="Enter your email address for us to know who sent the feedback and possibly reply back to you. It must be the email address of your account on Jesse.Trade"
                 input-type="email"
                 placeholder="Email address..."
                 name="email"
                 :object="form"
      />
      <br>
    </div>

    <!-- export chart -->
    <ToggleButton v-if="showLogToggle"
                  :object="form"
                  name="attachLogs"
                  title="Attach Debugging Logs"
                  description="Attach the log file of this session along with this report which helps Jesse's team"/>

    <br>

    <div class="flex justify-end item-center">
      <button class="btn-link text-indigo-600 dark:text-indigo-400 mr-4" @click="modals.exceptionReport = false">Cancel</button>
      <button
        :disabled="!form.email.length && !hasLivePluginInstalled"
        class="btn-primary" @click="report">
        Submit
      </button>
    </div>
  </SlideOver>

  <DividerWithButtons title="Exception">
    <button type="button"
            class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 dark:border-gray-600 text-sm leading-5 font-medium rounded-l-full text-gray-700 dark:text-gray-100 bg-white dark:bg-backdrop-dark hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none"
            @click="openReport">
      <FlagIcon class="-ml-1.5 mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
      <span>Report</span>
    </button><button type="button" class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 dark:border-gray-600 text-sm leading-5 font-medium rounded-r-full text-gray-700 dark:text-gray-100 bg-white dark:bg-backdrop-dark hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none"
                     @click="copy">
      <CheckIcon v-if="copied" class="-ml-1.5 mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
      <ClipboardIcon v-else class="-ml-1.5 mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
      <span>{{ copied ? 'Copied' : 'Copy' }}</span>
    </button>
  </DividerWithButtons>

  <div class="rounded-md bg-red-50 p-4 my-4 select-text">
    <div class="flex">
      <div class="flex-shrink-0">
        <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>

      <div class="ml-3 overflow-hidden">
        <h3 class="text-base font-medium text-red-800 mb-6" v-text="title"/>

        <pre v-if="content"
             class="mt-2 text-sm text-red-700 whitespace-pre-line px-6 py-6 rounded-md border-2 border-dashed border-red-200"
             v-html="content"/>
      </div>
    </div>
    <textarea v-show="showException" id="exception-info" :value="content" class="fixed left-0 bottom-0 opacity-0"/>
  </div>
</template>

<script>
import { FlagIcon, ClipboardIcon, CheckIcon } from '@heroicons/vue/outline'
import { XCircleIcon } from '@heroicons/vue/solid'
import DividerWithButtons from '@/components/DividerWithButtons'
import SlideOver from '@/components/Functional/SlideOver'
import { mapState } from 'pinia'
import { useMainStore } from '@/stores/main'
import axios from 'axios'
import notifier from '../notifier'

export default {
  name: 'Exception',
  components: {
    DividerWithButtons, FlagIcon, ClipboardIcon, XCircleIcon, SlideOver, CheckIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      required: true
    },
    debugMode: {
      type: Boolean,
      default: false
    },
    sessionId: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      showException: '',
      copied: false,
      form: {
        description: '',
        attachLogs: true,
        email: ''
      },
    }
  },
  computed: {
    ...mapState(useMainStore, ['modals', 'hasLivePluginInstalled']),
    alert () {
      if (this.mode === 'backtest' && !this.debugMode) {
        return {
          message: 'It is highly recommended to attach log files with reports. To do that, press cancel, enable "Debug Mode", and  ' +
            'run again. ',
          type: 'warning'
        }
      }

      return {
        message: '',
        type: ''
      }
    },
    showLogToggle () {
      return (this.mode === 'backtest' && this.debugMode) || this.mode === 'live'
    }
  },
  methods: {
    report () {
      axios.post('/report-exception', {
        description: this.form.description,
        email: this.form.email,
        traceback: this.content,
        mode: this.mode,
        attach_logs: this.form.attachLogs,
        session_id: this.sessionId
      }).then((res) => {
        if (res.data.status === 'success') {
          this.form.description = ''
          this.form.email = ''
          notifier.success(res.data.message)
          this.modals.exceptionReport = false
        } else if (res.data.status === 'error') {
          notifier.error(res.data.message)
        }
      }).catch(error => {
        notifier.error(`[${error.response.status}]: ${error.response.statusText}`)
      })
    },
    copy () {
      this.showException = true
      setTimeout(() => {
        const infoErrorToCopy = document.querySelector('#exception-info')
        infoErrorToCopy.setAttribute('type', 'text')
        infoErrorToCopy.select()
        document.execCommand('copy')
        this.copied = true

        // unselect the range
        infoErrorToCopy.setAttribute('type', 'hidden')
        window.getSelection().removeAllRanges()
        this.showException = false
      }, 10)

      setTimeout(() => {
        this.copied = false
      }, 3000)
    },
    openReport () {
      this.modals.exceptionReport = true
    }
  },
}
</script>
