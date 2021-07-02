<template>
  <section class="h-full flex flex-col justify-between">
    {{ activeTabId }}
    <!-- Tabs -->
    <div class="mb-4">
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <select
          id="tabs" v-model="activeTabId" name="tabs" class="block w-full border-0 border-t border-b border-gray-300">
          <option v-for="tab in tabs" :key="tab.id" :value="tab.id">{{ tab.name }}</option>
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="relative z-0 rounded-lg shadow flex divide-x divide-gray-200 " aria-label="Tabs">
          <div v-for="tab in tabs" :key="tab.id"
               :class="[tab.id === activeTabId ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-700 bg-white', 'select-none cursor-pointer focus:outline-none group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10']"
               @click="selectTab(tab.id)">
            <span>{{ tab.id }}</span>
            <span aria-hidden="true"
                  :class="[tab.id === activeTabId ? 'bg-indigo-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5']"/>
            <button v-show="tabs.length > 1" class="absolute right-[1em] focus:outline-none" @click="closeTab(tab.id)">
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
    <BacktestTab :id="tabs[activeTabId].id" :form="tabs[activeTabId].form" :results="tabs[activeTabId].results"/>
  </section>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useBacktestStore } from '@/stores/backtest'
import { XIcon, PlusSmIcon } from '@heroicons/vue/outline'
import BacktestTab from '@/views/tabs/BacktestTab'
import _ from 'lodash'

export default {
  name: 'Backtest',
  components: {
    BacktestTab,
    XIcon,
    PlusSmIcon
  },
  data () {
    return {
      activeTabId: null,
    }
  },
  computed: {
    ...mapWritableState(useBacktestStore, [
      'tabs'
    ])
  },
  created () {
    this.activeTabId = this.tabs[0].id
  },
  methods: {
    ...mapActions(useBacktestStore, ['newTab']),
    selectTab (tabId) {
      this.activeTabId = tabId
    },
    closeTab (tabId) {
      if (this.activeTabId === tabId) {
        this.activeTabId = this.activeTabId === 0 ? 1 : this.tabs[0].id
      }

      this.tabs = this.tabs.filter(item => item.id !== tabId)
    },
    addTab () {
      console.log('addTab', this.activeTabId)
      console.log(this.tabs)
      const newTab = this.newTab()
      console.log(newTab)
      newTab.id = this.tabs.length
      this.tabs.push(newTab)
    },
  }
}
</script>

