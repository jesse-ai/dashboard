<template>
  <div class="mb-4">
    <!--      <div class="sm:hidden">-->
    <!--        <label for="tabs" class="sr-only">Select a tab</label>-->
    <!--        <select-->
    <!--          id="tabs" v-model="$route.params." name="tabs" class="block w-full border-0 border-t border-b border-gray-300">-->
    <!--          <option v-for="tab in tabs" :key="tab.id" :value="tab.id">{{ tab.name }}</option>-->
    <!--        </select>-->
    <!--      </div>-->
    <div class="hidden sm:block">
      <nav class="relative rounded-lg shadow flex divide-x divide-gray-200 dark:divide-gray-700" aria-label="Tabs">
        <div v-for="(tab, name, index) in tabs" :key="tab.id" :data-cy="'tab' + index"
             class="relative group min-w-0 flex-1 overflow-hidden text-center flex items-center "
        >
          <router-link
            :class="[tab.id === pageId ? 'text-gray-900 dark:text-gray-100 font-bold ' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 font-medium ', 'py-4 px-4 inline-block select-none cursor-pointer focus:outline-none  w-full text-sm bg-white dark:bg-backdrop-dark hover:bg-gray-50 dark:hover:bg-gray-800']"
            :to="`${tab.id}`">
            <span>
              {{ tab.results.executing ? '' : `Tab ${index + 1}` }} {{ tab.results.executing ? `${tab.form.symbol ?tab.form.symbol : tab.form.routes[0].symbol}`: `` }} {{ tab.results.executing && !tab.results.showResults ? ' | ' + tab.results.progressbar.current + '%' : '' }} {{ tab.results.showResults ? ' - Results' : '' }}
            </span>

            <span aria-hidden="true"
                  :class="[tab.id === pageId && (Object.keys(tabs).length > 1) ? 'bg-indigo-400' : 'bg-transparent dark:bg-gray-600', 'absolute inset-x-0 bottom-0 h-0.5']"/>
          </router-link>

          <!-- Tab close button -->
          <button v-show="Object.keys(tabs).length > 1" :data-cy="'tab-close-button' + index" class="absolute right-[1em] focus:outline-none" @click="closeTab(tab.id)">
            <XIcon class="h-5 w-5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full" aria-hidden="true" />
          </button>
        </div>

        <!-- New Tab Button-->
        <div class="select-none cursor-pointer text-gray-400 dark:text-gray-100 hover:text-gray-600 focus:outline-none group relative w-14 overflow-hidden bg-white dark:bg-backdrop-dark py-4 px-4 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center "
             @click="addTab">
          <button class="absolute right-[1em] focus:outline-none ">
            <PlusSmIcon class="h-6 w-6 rounded-full" aria-hidden="true" />
          </button>
          <span aria-hidden="true"
                class="absolute inset-x-0 bottom-0 h-0.5 bg-transparent dark:bg-gray-600"/>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { useBacktestStore } from '@/stores/backtest'
import { XIcon, PlusSmIcon } from '@heroicons/vue/outline'
import { useCandlesStore } from '@/stores/candles'
import { useLiveStore } from '@/stores/live'

export default {
  name: 'Tabs',
  components: {
    XIcon,
    PlusSmIcon
  },
  props: {
    pageId: {
      type: Number,
      required: true
    },
    tabs: {
      type: Object,
      required: true
    },
  },
  created () {
    // redirect to first time on page refresh
    if (this.pageId !== 1 && !(this.pageId in this.tabs)) {
      // this.$router.push(`/backtest/${this.tabs[Object.keys(this.tabs)[0]].id}`)
      this.$router.push({ name: this.$route.name, params: { id: this.tabs[Object.keys(this.tabs)[0]].id } })
    }
  },
  methods: {
    addTab () {
      if (this.$route.name === 'Candles') {
        const store = useCandlesStore()
        return store.addTab()
      } else if (this.$route.name === 'Backtest') {
        const store = useBacktestStore()
        return store.addTab()
      } else if (this.$route.name === 'Live') {
        const store = useLiveStore()
        return store.addTab()
      }
    },

    closeTab (tabId) {
      delete this.tabs[tabId]

      if (this.pageId === tabId) {
        this.$router.push({ name: this.$route.name, params: { id: this.tabs[Object.keys(this.tabs)[0]].id } })
      }
    },
  }
}
</script>
