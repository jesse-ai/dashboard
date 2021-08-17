<template>
  <SlideOver name="exceptionReport"
             :object="modals"
             title="Report">
    <p>
      If the exception you're seeing is not clear and you think it might be a bug, please send us a report to help
      us debugging and fixing it in a future release.
    </p>

    <br>

    <label class="font-semibold">Exception:</label>
    <pre
      class="mt-2 text-sm whitespace-pre-line px-6 py-6 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 dark:border-gray-800 border border-gray-200 "
      v-html="content"/>

    <br>

    <label class="font-semibold">Description (optional):</label>
    <textarea id="content" v-model="description"
              placeholder="Describe how the exception occurred..."
              name="content"
              rows="10"
              class="dark:bg-gray-800 dark:border-gray-900 mt-2 block w-full focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 sm:text-sm border border-gray-300 rounded" />

    <br>

    <div>
      <button class="btn-primary mr-4">Submit</button>
      <button class="btn-link text-indigo-600 dark:text-indigo-400" @click="modals.exceptionReport = false">Cancel</button>
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
      <ClipboardIcon class="-ml-1.5 mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
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

    <input id="copy-exception" type="hidden" :value="content" >
  </div>
</template>

<script>
import { FlagIcon, ClipboardIcon } from '@heroicons/vue/outline'
import { XCircleIcon } from '@heroicons/vue/solid'
import DividerWithButtons from '@/components/DividerWithButtons'
import SlideOver from '@/components/Functional/SlideOver'
import { mapState } from 'pinia'
import { useMainStore } from '@/stores/main'

export default {
  name: 'Exception',
  components: {
    DividerWithButtons, FlagIcon, ClipboardIcon, XCircleIcon, SlideOver
  },
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      description: '',
      copied: false,
    }
  },
  computed: {
    ...mapState(useMainStore, ['modals', 'isLoggedInToJesseTrade']),
  },
  methods: {
    report () {
      alert('not implemented yet')
    },
    copy () {
      const exceptionToCopy = document.querySelector('#copy-exception')
      exceptionToCopy.setAttribute('type', 'text')
      exceptionToCopy.select()
      document.execCommand('copy')
      this.copied = true

      // unselect the range
      exceptionToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()

      setTimeout(() => {
        this.copied = false
      }, 3000)
    },
    openReport () {
      if (!this.isLoggedInToJesseTrade) {
        this.notyf.error('You need to login to your Jesse account to be able to send a report')
        this.modals.jesseTradeLogin = true
        return
      }

      this.modals.exceptionReport = true
    }

  },
}
</script>
