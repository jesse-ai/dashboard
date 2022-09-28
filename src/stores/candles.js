import { defineStore } from 'pinia'
import _ from 'lodash'
import helpers from '@/helpers'
import axios from '@/http'
import notifier from '../notifier'

let idCounter = 0

function newTab () {
  return _.cloneDeep({
    id: ++idCounter,
    name: 'Tab 0',
    form: helpers.getDefaultFromLocalStorage('candlesForm', {
      start_date: '2021-01-01',
      exchange: '',
      symbol: '',
    }),
    results: {
      showResults: false,
      executing: false,
      progressbar: {
        current: 0,
        estimated_remaining_seconds: 0
      },
      metrics: [],
      infoLogs: '',
      exception: {
        error: '',
        traceback: ''
      },
      alert: {
        message: '',
        type: ''
      }
    }
  })
}

export const useCandlesStore = defineStore({
  id: 'candles',
  state: () => ({
    tabs: {
      1: newTab()
    }
  }),
  actions: {
    addTab () {
      const tab = newTab()
      this.tabs[tab.id] = tab
      return this.$router.push(`/candles/${tab.id}`)
    },
    startInNewTab (id) {
      const tab = newTab()
      tab.form = _.cloneDeep(this.tabs[id].form)
      this.tabs[tab.id] = tab
      this.start(tab.id)
    },
    start (id) {
      this.tabs[id].results.progressbar.current = 0
      this.tabs[id].results.executing = true
      this.tabs[id].results.infoLogs = ''
      this.tabs[id].results.exception.traceback = ''
      this.tabs[id].results.exception.error = ''
      this.tabs[id].results.alert.message = ''

      axios.post('/import-candles', {
        id,
        exchange: this.tabs[id].form.exchange,
        symbol: this.tabs[id].form.symbol,
        start_date: this.tabs[id].form.start_date,
      }).catch(error => {
        notifier.error(`[${error.response.status}]: ${error.response.statusText}`)
        this.tabs[id].results.executing = false
      })
    },
    cancel (id) {
      if (this.tabs[id].results.exception.error) {
        this.tabs[id].results.executing = false
        return
      }

      axios.delete('/import-candles', {
        headers: {},
        data: {
          id
        }
      }).then(() => {
        // if was in test cancel execution directly
        if (window.Cypress) {
          this.tabs[id].results.executing = false
        }
      }).catch(error => notifier.error(`[${error.response.status}]: ${error.response.statusText}`))
    },

    progressbarEvent (id, data) {
      this.tabs[id].results.progressbar = data

      if (this.tabs[id].results.progressbar.current < 100 && this.tabs[id].results.executing === false) {
        this.tabs[id].results.executing = true
      }
    },
    alertEvent (id, data) {
      this.tabs[id].results.alert = data

      // session is finished:
      this.tabs[id].results.progressbar.current = 100
      this.tabs[id].results.executing = false
      this.tabs[id].results.exception.traceback = ''
      this.tabs[id].results.exception.error = ''
    },
    infoLogEvent (id, data) {
      this.tabs[id].results.infoLogs += `[${helpers.timestampToTime(
        data.timestamp
      )}] ${data.message}\n`
    },
    exceptionEvent (id, data) {
      this.tabs[id].results.exception.error = data.error
      this.tabs[id].results.exception.traceback = data.traceback
    },
    terminationEvent (id) {
      if (this.tabs[id].results.executing) {
        this.tabs[id].results.executing = false
        notifier.success('Session terminated successfully')
      }
    },
  }
})
