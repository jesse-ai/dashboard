<template>
  <div class="lg:grid lg:grid-cols-12 lg:gap-x-5 select-none">
    <aside class="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
      <nav class="space-y-1">
        <button
          v-for="item in navigation" :key="item.name"
          class="block w-full"
          :class="[currentTab === item.name ? 'bg-gray-100 dark:bg-gray-800 text-indigo-700 dark:text-indigo-400 hover:text-indigo-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-50', 'group rounded-md px-3 py-2 flex items-center text-sm font-medium']"
          @click="currentTab = item.name">
          <component :is="item.icon" :class="[currentTab === item.name ? 'text-indigo-500 group-hover:text-indigo-500' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-400', 'flex-shrink-0 -ml-1 mr-3 h-6 w-6']" aria-hidden="true" />
          <span class="truncate">
            {{ item.name }}
          </span>
        </button>
      </nav>
    </aside>

    <!-- backtest -->
    <div v-if="currentTab === 'Backtest'" class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 w-full">
      <Divider>Exchanges</Divider>

      <br>

      <Divider>Logs</Divider>
      <p>
        Below configurations are used to filter out the extra logging info that are displayed when the "--debug" flag is enabled.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      <br>

      <Divider>Metrics</Divider>
      <p>
        Below configurations are used to set the metrics that are displayed after a backtest.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CheckBox name="sharpe_ratio" title="Sharpe Ratio" :object="settings.backtest.metrics"/>
        <CheckBox name="calmar_ratio" title="Calmar Ratio" :object="settings.backtest.metrics"/>
        <CheckBox name="sortino_ratio" title="Sortino Ratio" :object="settings.backtest.metrics"/>
        <CheckBox name="omega_ratio" title="Omega Ratio" :object="settings.backtest.metrics"/>
        <CheckBox name="winning_streak" title="Winning Streak" :object="settings.backtest.metrics"/>
        <CheckBox name="losing_streak" title="Losing Streak" :object="settings.backtest.metrics"/>
        <CheckBox name="largest_losing_trade" title="Largest Losing Trade" :object="settings.backtest.metrics"/>
        <CheckBox name="largest_winning_trade" title="Largest Winning Trade" :object="settings.backtest.metrics"/>
        <CheckBox name="total_winning_trades" title="Total Winning Trades" :object="settings.backtest.metrics"/>
        <CheckBox name="total_losing_trades" title="Total Losing Trades" :object="settings.backtest.metrics"/>
      </div>

      <br>

      <Divider>Data</Divider>
      <div>
        <div>
          <label for="warm_up_candles" class="block text-sm font-medium text-gray-700">Warmup candles</label>
          <div class="mt-1">
            <input id="warm_up_candles" min="0" type="number" name="warm_up_candles"
                   class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                   placeholder="ex: 210" aria-describedby="warm_up_candles-description" >
          </div>
          <p id="email-description" class="mt-2 text-sm text-gray-500">
            Number of warmup candles that is loaded before starting each session
          </p>
        </div>
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
import { CalculatorIcon, ChipIcon, CurrencyDollarIcon } from '@heroicons/vue/outline'
import CheckBox from '@/components/CheckBox'
import Divider from '@/components/Divider'
import { mapState } from 'pinia'
import { useMainStore } from '@/stores/main'


export default {
  components: {
    CheckBox,
    Divider
  },
  data () {
    return {
      navigation: [
        { name: 'Backtest', icon: CalculatorIcon },
        { name: 'Live', icon: CurrencyDollarIcon },
        { name: 'Optimization', icon: ChipIcon },
      ],
      currentTab: 'Backtest',
    }
  },
  computed: {
    ...mapState(useMainStore, ['settings'])
  }
}
</script>
