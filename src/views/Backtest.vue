<template>
  <!-- Tabs -->
  <div class="mb-4">
    <!--      <div class="sm:hidden">-->
    <!--        <label for="tabs" class="sr-only">Select a tab</label>-->
    <!--        <select-->
    <!--          id="tabs" v-model="$route.params." name="tabs" class="block w-full border-0 border-t border-b border-gray-300">-->
    <!--          <option v-for="tab in tabs" :key="tab.id" :value="tab.id">{{ tab.name }}</option>-->
    <!--        </select>-->
    <!--      </div>-->
    <div class="hidden sm:block">
      <nav class="relative z-0 rounded-lg shadow flex divide-x divide-gray-200 " aria-label="Tabs">
        <div v-for="tab in tabs" :key="tab.id"
             class="relative group min-w-0 flex-1 overflow-hidden text-center flex items-center"
        >
          <router-link
            :class="[tab.id === pageId ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-700 bg-white', 'py-4 px-4 inline-block select-none cursor-pointer focus:outline-none bg-white w-full text-sm font-medium hover:bg-gray-50 focus:z-10']"
            :to="`${tab.id}`">
            <span>{{ tab.id }}</span>
            <span aria-hidden="true"
                  :class="[tab.id === pageId ? 'bg-indigo-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5']"/>
          </router-link>

          <!-- Tab close button -->
          <button v-show="Object.keys(tabs).length > 1" class="absolute right-[1em] focus:outline-none z-40" @click="closeTab(tab.id)">
            <XIcon class="h-5 w-5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full" aria-hidden="true" />
          </button>
        </div>

        <!-- New Tab Button-->
        <div class="select-none cursor-pointer text-gray-400 hover:text-gray-600 focus:outline-none group relative w-14 overflow-hidden bg-white py-4 px-4 font-medium hover:bg-gray-50 focus:z-10 flex items-center justify-center"
             @click="addTab">
          <button class="absolute right-[1em] focus:outline-none">
            <PlusSmIcon class="h-6 w-6 rounded-full" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </div>
  </div>

  <!-- Backtest Tabs -->
  <BacktestTab v-if="tabs[pageId]" :form="tabs[pageId].form" :results="tabs[pageId].results" />
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useBacktestStore } from '@/stores/backtest'
import { XIcon, PlusSmIcon } from '@heroicons/vue/outline'
import BacktestTab from '@/views/tabs/BacktestTab'

export default {
  name: 'Backtest',
  components: {
    BacktestTab,
    XIcon,
    PlusSmIcon
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapWritableState(useBacktestStore, [
      'tabs'
    ]),
    pageId () {
      return parseInt(this.$route.params.id)
    },
  },
  created () {
    // redirect to first time on page refresh
    if (this.pageId !== 1 && !(this.pageId in this.tabs)) {
      this.$router.push(`/backtest/${this.tabs[Object.keys(this.tabs)[0]].id}`)
    }
  },
  methods: {
    ...mapActions(useBacktestStore, ['newTab']),

    closeTab (tabId) {
      delete this.tabs[tabId]

      if (this.pageId === tabId) {
        this.$router.push(`/backtest/${this.tabs[Object.keys(this.tabs)[0]].id}`)
      }
    },
    addTab () {
      const newTab = this.newTab()
      this.tabs[newTab.id] = newTab
      this.$router.push(`/backtest/${newTab.id}`)
    },
  }
}
</script>

