<template>
  <div class="lg:grid lg:grid-cols-12 lg:gap-x-5 select-none">
    <aside class="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
      <nav class="space-y-1">
        <button
          v-for="item in navigation" :key="item.name"
          class="block w-full"
          :class="[currentTab === item.name ? 'bg-gray-100 dark:bg-gray-800 text-indigo-700 dark:text-indigo-400 hover:text-indigo-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-50', 'group rounded-md px-3 py-2 flex items-center text-sm font-medium']"
          @click="currentTab = item.name">
          <component :is="item.icon" :class="[currentTab === item.name ? 'text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-500' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-400', 'flex-shrink-0 -ml-1 mr-3 h-6 w-6']" aria-hidden="true" />
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
        Below configurations are used to filter out the extra logging info that are displayed when the <code>"--debug"</code> flag is enabled.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Checkbox name="order_submission" title="Order Submission" :object="settings.backtest.logging"/>
        <Checkbox name="order_cancellation" title="Order Cancellation" :object="settings.backtest.logging"/>
        <Checkbox name="order_execution" title="Order Execution" :object="settings.backtest.logging"/>
        <Checkbox name="position_opened" title="Position Opened" :object="settings.backtest.logging"/>
        <Checkbox name="position_increased" title="Position Increased" :object="settings.backtest.logging"/>
        <Checkbox name="position_reduced" title="Position Reduced" :object="settings.backtest.logging"/>
        <Checkbox name="position_closed" title="Position Closed" :object="settings.backtest.logging"/>
        <Checkbox name="shorter_period_candles" title="1m candles" :object="settings.backtest.logging"/>
        <Checkbox name="trading_candles" title="Trading Candles" :object="settings.backtest.logging"/>
      </div>

      <br>

      <Divider>Data</Divider>
      <div>
        <FormInput placeholder="ex: 210"
                   title="Warmup Candles"
                   :object="settings.backtest"
                   description="Number of warmup candles that is loaded before starting each session"
                   name="warm_up_candles" input-type="number" />
      </div>

      <br>

      <div v-for="(e, index) in settings.backtest.exchanges" :key="index">
        <Divider>{{ e.name }}</Divider>

        <div class="grid grid-cols-6 gap-6">
          <FormInput :title="`Starting Capital (${e.settlement_currency})`" :object="e" name="balance" input-type="number"
                     :step="1000" />

          <FormInput :title="`Trading Fee (${round(e.fee * 100, 2)}%)`" :object="e" name="fee" input-type="number"
                     :step="0.0001" />
        </div>

        <br>

        <RadioGroups title="Leverage Mode:" :object="e" name="futures_leverage_mode" :options="['cross', 'isolated']" />

        <br>

        <NumberInput title="Leverage (x):" name="futures_leverage" :object="e"/>

        <br>
      </div>
    </div>

    <!-- live -->
    <div v-if="currentTab === 'Live'" class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 w-full">
      <Divider>Logs</Divider>
      <p>
        You can filter the types of events that you want to be logged. Logging is often useful for debugging
        and recommended. Hence, it doesn't hurt to enable them all:
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Checkbox name="order_submission" title="Order Submission" :object="settings.live.logging"/>
        <Checkbox name="order_cancellation" title="Order Cancellation" :object="settings.live.logging"/>
        <Checkbox name="order_execution" title="Order Execution" :object="settings.live.logging"/>
        <Checkbox name="position_opened" title="Position Opened" :object="settings.live.logging"/>
        <Checkbox name="position_increased" title="Position Increased" :object="settings.live.logging"/>
        <Checkbox name="position_reduced" title="Position Reduced" :object="settings.live.logging"/>
        <Checkbox name="position_closed" title="Position Closed" :object="settings.live.logging"/>
        <Checkbox name="shorter_period_candles" title="1m candles" :object="settings.live.logging"/>
        <Checkbox name="trading_candles" title="Trading Candles" :object="settings.live.logging"/>
      </div>

      <br>

      <Divider>Data</Divider>
      <div>
        <FormInput placeholder="ex: 210"
                   title="Warmup Candles"
                   :object="settings.live"
                   description="Number of warmup candles that is loaded before starting each session"
                   name="warm_up_candles" input-type="number" />
      </div>

      <br>

      <Divider>Notifications</Divider>
      <p>
        Jesse can notify every time something interesting happens so you don't have to monitor your bots 24/7. Currently, Telegram and Discord drivers are supported. <br><br>
        To enter API keys for Telegram or Discord, check out your project's <code>.env</code> file.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Checkbox name="enabled" title="Enable Notifications" :object="settings.live.notifications" />
      </div>

      <div v-if="settings.live.notifications.enabled">
        <p>
          You can choose for which events you want to receive notifications:
        </p>
        <br>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Checkbox name="errors" title="Errors" :object="settings.live.notifications.events"/>
          <Checkbox name="started_session" title="Session Start" :object="settings.live.notifications.events"/>
          <Checkbox name="terminated_session" title="Session Termination" :object="settings.live.notifications.events"/>
          <Checkbox name="submitted_orders" title="Order Submission" :object="settings.live.notifications.events"/>
          <Checkbox name="cancelled_orders" title="Order Cancellation" :object="settings.live.notifications.events"/>
          <Checkbox name="executed_orders" title="Order Execution" :object="settings.live.notifications.events"/>
          <Checkbox name="opened_position" title="Opened Positions" :object="settings.live.notifications.events"/>
          <Checkbox name="updated_position" title="Updated Position" :object="settings.live.notifications.events"/>
        </div>

        <br>

        <p>
          You will also receive recurring reports as notifications which are helpful when
          you have open positions and want to know about latest status of them. You can
          choose the timeframe for how frequently you want to receive them:
        </p>

        <select v-model="settings.live.notifications.position_report_timeframe"
                class="dark:bg-backdrop-dark dark:hover:bg-gray-800 hover:bg-gray-50 cursor-pointer w-full py-2 my-4 rounded border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          <option v-for="item in timeframes" :key="item">{{ item }}</option>
        </select>

        <br>
      </div>

      <div v-for="(e, index) in settings.live.exchanges" :key="index">
        <Divider>{{ e.name }}</Divider>

        <RadioGroups title="Leverage Mode:" :object="e" name="futures_leverage_mode" :options="['cross', 'isolated']" />

        <br>

        <NumberInput title="Leverage (x):" name="futures_leverage" :object="e"/>

        <br>

        <p>Balances and fees will be fetched from the exchange in live trading. But for paper trading you can set them here:</p>

        <br>

        <div class="grid grid-cols-6 gap-6">
          <FormInput :title="`Starting Capital (${e.settlement_currency})`" :object="e" name="balance" input-type="number"
                     :step="1000" />

          <FormInput :title="`Trading Fee (${round(e.fee * 100, 2)}%)`" :object="e" name="fee" input-type="number"
                     :step="0.0001" />
        </div>

        <br>
      </div>
    </div>

    <!-- optimization -->
    <div v-if="currentTab === 'Optimization'" class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 w-full">
      <Divider>Fitness Function</Divider>
      <RadioGroups title="Ratio:" :object="settings.optimization" name="ratio" :options="['sharpe', 'calmar', 'sortino', 'omega']" />

      <br>

      <Divider>Data</Divider>
      <div>
        <FormInput placeholder="ex: 210"
                   title="Warmup Candles"
                   :object="settings.optimization"
                   description="Number of warmup candles that is loaded before starting each session"
                   name="warm_up_candles" input-type="number" />
      </div>

      <br>

      <div v-for="(e, index) in settings.optimization.exchanges" :key="index">
        <Divider>{{ e.name }}</Divider>

        <div class="grid grid-cols-6 gap-6">
          <FormInput :title="`Starting Capital (${e.settlement_currency})`" :object="e" name="balance" input-type="number"
                     :step="1000" />

          <FormInput :title="`Trading Fee (${round(e.fee * 100, 2)}%)`" :object="e" name="fee" input-type="number"
                     :step="0.0001" />
        </div>

        <br>

        <RadioGroups title="Leverage Mode:" :object="e" name="futures_leverage_mode" :options="['cross', 'isolated']" />

        <br>

        <NumberInput title="Leverage (x):" name="futures_leverage" :object="e"/>

        <br>
      </div>
    </div>
  </div>
</template>

<script>
import { CalculatorIcon, ChipIcon, CurrencyDollarIcon } from '@heroicons/vue/outline'
import Checkbox from '@/components/Checkbox'
import Divider from '@/components/Divider'
import RadioGroups from '@/components/RadioGroups'
import { mapState } from 'pinia'
import { useMainStore } from '@/stores/main'
import FormInput from '@/components/Functional/FormInput'
import NumberInput from '@/components/Functional/NumberInput'
import _ from 'lodash'


export default {
  components: {
    Checkbox,
    Divider,
    RadioGroups,
    FormInput,
    NumberInput
  },
  data () {
    return {
      timeframes: ['1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '3h', '4h', '6h', '8h', '12h', '1D', '3D', '1W'],
      navigation: [
        { name: 'Backtest', icon: CalculatorIcon },
        { name: 'Optimization', icon: ChipIcon },
        { name: 'Live', icon: CurrencyDollarIcon },
      ],
      currentTab: 'Backtest',
      plans: [
        { name: 'Cross', priceMonthly: 29, priceYearly: 290, limit: 'Up to 5 active job postings' },
        { name: 'Isolated', priceMonthly: 99, priceYearly: 990, limit: 'Up to 25 active job postings' },
      ]
    }
  },
  computed: {
    ...mapState(useMainStore, ['settings'])
  },
  methods: {
    round: _.round
  }
}
</script>
