<template>
  <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
    <aside class="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
      <nav class="space-y-1">
        <button
          v-for="item in navigation" :key="item.name"
          class="block w-full"
          :class="[currentTab === item.name ? 'bg-gray-100 text-indigo-700 hover:text-indigo-700 hover:bg-white' : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50', 'group rounded-md px-3 py-2 flex items-center text-sm font-medium']"
          @click="currentTab = item.name">
          <component :is="item.icon" :class="[currentTab === item.name ? 'text-indigo-500 group-hover:text-indigo-500' : 'text-gray-400 group-hover:text-gray-500', 'flex-shrink-0 -ml-1 mr-3 h-6 w-6']" aria-hidden="true" />
          <span class="truncate">
            {{ item.name }}
          </span>
        </button>
      </nav>
    </aside>

    <!-- backtest -->
    <div v-if="currentTab === 'Backtest'" class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 w-full">
      <Divider>Logs</Divider>
      <p>
        Below configurations are used to filter out the extra logging info that are displayed when the "--debug" flag is enabled.
      </p>

      <div class="grid grid-cols-3 gap-4">
        <CheckBox name="order_submission" title="Order Submission" :object="settings.backtest.logging"/>
        <CheckBox name="order_cancellation" title="Order Cancellation" :object="settings.backtest.logging"/>
        <CheckBox name="order_execution" title="Order Execution" :object="settings.backtest.logging"/>
        <CheckBox name="position_opened" title="Position Opened" :object="settings.backtest.logging"/>
        <CheckBox name="position_increased" title="Position Increased" :object="settings.backtest.logging"/>
        <CheckBox name="position_reduced" title="Position Reduced" :object="settings.backtest.logging"/>
        <CheckBox name="position_closed" title="Position Closed" :object="settings.backtest.logging"/>
        <CheckBox name="shorter_period_candles" title="1m candles" :object="settings.backtest.logging"/>
        <CheckBox name="trading_candles" title="Trading Candles" :object="settings.backtest.logging"/>
      </div>
    </div>

    <!-- live -->
    <div v-if="currentTab === 'Live'" class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 w-full">
      live
    </div>

    <!-- optimization -->
    <div v-if="currentTab === 'Optimization'" class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 w-full">
      optimization
    </div>
  </div>
</template>

<script>
import { CreditCardIcon, KeyIcon, UserCircleIcon, UserGroupIcon, ViewGridAddIcon } from '@heroicons/vue/outline'
import CheckBox from '@/components/CheckBox'
import { mapState } from 'pinia'
import { useMainStore } from '@/stores/main'


export default {
  components: {
    CheckBox
  },
  data () {
    return {
      navigation: [
        { name: 'Backtest', icon: UserCircleIcon },
        { name: 'Live', icon: KeyIcon },
        { name: 'Optimization', icon: CreditCardIcon },
      ],
      currentTab: 'Backtest',
    }
  },
  computed: {
    ...mapState(useMainStore, ['settings'])
  }
}
</script>
