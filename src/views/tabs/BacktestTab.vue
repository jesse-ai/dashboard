<template>
  <!-- Content -->
  <div v-if="!results.executing && !results.showResults"
       class="px-4 sm:px-6 md:px-8 h-full max-h-screen overflow-y-auto">
    <Routes :form="form" :results="results" />

    <Divider class="mt-16">Options</Divider>

    <div class="grid grid-cols-2 gap-8">
      <div class="flex items-start select-none">
        <div class="h-5 flex items-center">
          <input id="debug_mode" v-model="form.debug_mode"
                 name="debug_mode"
                 type="checkbox"
                 class="focus:ring-0 h-4 w-4 text-indigo-600 border-gray-300 rounded">
        </div>
        <div class="ml-3 text-sm">
          <label for="debug_mode" class="font-medium text-gray-700 cursor-pointer">debug_mode</label>
          <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
        </div>
      </div>

      <div class="flex items-start select-none">
        <div class="h-5 flex items-center">
          <input id="export_chart" v-model="form.export_chart"
                 name="export_chart"
                 type="checkbox"
                 class="focus:ring-0 h-4 w-4 text-indigo-600 border-gray-300 rounded">
        </div>
        <div class="ml-3 text-sm">
          <label for="export_chart" class="font-medium text-gray-700 cursor-pointer">export_chart</label>
          <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
        </div>
      </div>

      <div class="flex items-start select-none">
        <div class="h-5 flex items-center">
          <input id="export_tradingview" v-model="form.export_tradingview"
                 name="export_tradingview"
                 type="checkbox"
                 class="focus:ring-0 h-4 w-4 text-indigo-600 border-gray-300 rounded">
        </div>
        <div class="ml-3 text-sm">
          <label for="export_tradingview" class="font-medium text-gray-700 cursor-pointer">export_tradingview</label>
          <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
        </div>
      </div>

      <div class="flex items-start select-none">
        <div class="h-5 flex items-center">
          <input id="export_full_reports" v-model="form.export_full_reports"
                 name="export_full_reports"
                 type="checkbox"
                 class="focus:ring-0 h-4 w-4 text-indigo-600 border-gray-300 rounded">
        </div>
        <div class="ml-3 text-sm">
          <label for="export_full_reports"
                 class="font-medium text-gray-700 cursor-pointer">export_full_reports</label>
          <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
        </div>
      </div>

      <div class="flex items-start select-none">
        <div class="h-5 flex items-center">
          <input id="export_csv" v-model="form.export_csv"
                 name="export_csv"
                 type="checkbox"
                 class="focus:ring-0 h-4 w-4 text-indigo-600 border-gray-300 rounded">
        </div>
        <div class="ml-3 text-sm">
          <label for="export_csv" class="font-medium text-gray-700 cursor-pointer">export_csv</label>
          <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
        </div>
      </div>

      <div class="flex items-start select-none">
        <div class="h-5 flex items-center">
          <input id="export_json" v-model="form.export_json"
                 name="export_json"
                 type="checkbox"
                 class="focus:ring-0 h-4 w-4 text-indigo-600 border-gray-300 rounded">
        </div>
        <div class="ml-3 text-sm">
          <label for="export_json" class="font-medium text-gray-700 cursor-pointer">export_json</label>
          <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
        </div>
      </div>
    </div>

    <Divider class="mt-16">Duration</Divider>

    <div class="flex items-center select-none flex-1">
      <input id="start_date"
             v-model="form.start_date"
             type="date"
             name="start_date"
             class="flex-1 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 flex justify-center items-center w-48 py-4 text-center sm:text-sm border-gray-300 rounded-l-md border-r-0"
      >

      <input id="finish_date"
             v-model="form.finish_date"
             type="date"
             name="finish_date"
             class="flex-1 cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 flex justify-center items-center w-48 py-4 text-center sm:text-sm border-gray-300 rounded-r-md">
    </div>

    <br>
    <!--    <pre>{{ activeTabIndex }}</pre>-->
    <pre>{{ form }}</pre>
  </div>

  <!-- Results -->
  <div v-if="results.showResults"
       class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-full max-h-screen overflow-y-auto">
    <div>
      <Divider>
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
    </div>
  </div>

  <!-- Action Buttons -->
  <div v-if="!results.executing" class="py-4 px-4 sm:px-6 md:px-8 w-full border-t">
    <div v-if="results.showResults" class="max-w-7xl mx-auto flex">
      <button class="btn-primary text-center mr-2 flex-1" @click="rerun">
        Rerun
      </button>

      <button class="btn-secondary text-center ml-2 flex-1" @click="newBacktest">
        New backtest
      </button>
    </div>

    <div v-else class="max-w-7xl mx-auto flex">
      <button class="btn-primary text-center mr-2 flex-1" @click="start">
        Start
      </button>

      <button class="btn-secondary text-center ml-2 flex-1">
        Start in a new tab
      </button>
    </div>
  </div>

  <!-- Execution -->
  <div v-if="results.executing && !results.showResults"
       class="h-full flex flex-col items-center justify-center select-none">
    <div class="">
      <CircleProgressbar :progress="results.progressbar.current"/>
    </div>

    <h3 class="mt-8">{{ Math.round(results.progressbar.estimated_remaining_seconds) }} seconds remaining...</h3>

    <div class="mt-8">
      <button class="btn-secondary w-64" @click="cancel">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BacktestTab',
  // beforeRouteUpdate (to, from, next) {
  //   this.updateData(to.params.id)
  //   next()
  // },
  props: {
    // id: {
    //   type: Number,
    //   required: true
    // },
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
      // form: null,
      // results: null
    }
  },
  computed: {
    // ...mapState(useBacktestStore, ['tabs']),
    // form: () => this.tabs[this.$route.params.id].form,
    // results: () => this.tabs[this.$route.params.id].results,
    // store () {
    //   return useBacktestStore()
    // },
    // activeTabIndex () {
    //   const id = this.$route.params.id
    //   let tabIndex = 0
    //   for (let i = 0; i++; i < this.tabs.length) {
    //     if (this.tabs[i].id === id) {
    //       tabIndex = id
    //       break
    //     }
    //   }
    //   return tabIndex
    // },
    // form () {
    //   return this.store.tabs[this.activeTabIndex].form
    // },
    // results () {
    //   return this.store.tabs[this.activeTabIndex].results
    // },
    // ...mapState(useBacktestStore, {
    //   form: store => {
    //     console.log(store.$route.params.id)
    //     return store.tabs[store.$route.params.id].form
    //   },
    //   results: (store) => {
    //   // console.log('something', something)
    //     console.log(store.router.currentRoute.value.params)
    //     console.log(store.$route.params.id)
    //     // console.log(store)
    //     // console.log(store.tabs)
    //     // console.log(this.$route)
    //     // console.log(this.tabindex)
    //     // console.log('results', store.tabs[this.tabindex].results)
    //     return store.tabs[store.$route.params.id].results
    //   }
    // }),
  },
  created () {
    // this.updateData(this.$route.params.id)
    // console.log(this.results)
  },
  methods: {
    // updateData (id) {
    //   console.log('created', id)
    //
    //   let activeTabIndex = 0
    //   for (let i = 0; i++; i < this.tabs.length) {
    //     if (this.tabs[i].id === id) {
    //       activeTabIndex = id
    //       break
    //     }
    //   }
    //
    //   this.results = this.tabs[activeTabIndex].results
    //   this.form = this.tabs[activeTabIndex].form
    // },
    cancel () {
      this.results.executing = false
    },
    start () {
      this.results.progressbar.current = 0
      this.results.executing = true

      console.log('id:', this.$route.params.id)

      axios.post('http://127.0.0.1:8000/backtest', {
        id: this.$route.params.id,
        start_date: this.form.start_date,
        finish_date: this.form.finish_date,
        debug_mode: this.form.debug_mode,
        export_csv: this.form.export_csv,
        export_chart: this.form.export_chart,
        export_tradingview: this.form.export_tradingview,
        export_full_reports: this.form.export_full_reports,
        export_json: this.form.export_json,
      }).catch(() => this.notyf.error('Request failed'))
    },
    rerun () {
      this.results.showResults = false
      this.start()
    },
    newBacktest () {
      this.results.showResults = false
    },
  }
}
</script>

