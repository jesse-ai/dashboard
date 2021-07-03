<template>
  <section class="h-full flex flex-col justify-between">
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
          <router-link v-for="tab in tabs" :key="tab.id"
                       :class="[tab.id === pageId ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-700 bg-white', 'select-none cursor-pointer focus:outline-none group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10']"
                       :to="`${tab.id}`">
            <span>{{ tab.id }}</span>
            <span aria-hidden="true"
                  :class="[tab.id === pageId ? 'bg-indigo-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5']"/>
            <button v-show="tabs.length > 1" class="absolute right-[1em] focus:outline-none z-40" @click="closeTab(tab.id)">
              <XIcon class="h-5 w-5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full" aria-hidden="true" />
            </button>
          </router-link>

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
    <BacktestTab :form="tabs[activeTabIndex].form" :results="tabs[activeTabIndex].results" />
  </section>
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
      // activeTabIndex: 0
    }
  },
  computed: {
    ...mapWritableState(useBacktestStore, [
      'tabs'
    ]),
    pageId () {
      return parseInt(this.$route.params.id)
    },
    activeTabIndex () {
      let tabIndex = 0
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].id === this.pageId) {
          tabIndex = i
          break
        }
      }
      return tabIndex
    }
  },
  methods: {
    ...mapActions(useBacktestStore, ['newTab']),

    closeTab (tabId) {
      // if (this.this.this.pageId === tabId) {
      //   this.pageId = this.this.this.pageId === 0 ? 1 : this.tabs[0].id
      // }

      this.tabs = this.tabs.filter(item => item.id !== tabId)
    },
    addTab () {
      const newTab = this.newTab()
      this.tabs.push(newTab)
      this.$router.push(`/backtest/${newTab.id}`)
    },
  }
}
</script>

