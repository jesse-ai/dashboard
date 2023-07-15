<template>
  <div class="lg:grid lg:grid-cols-12 lg:gap-x-5 select-none">
    <aside class="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
      <nav class="space-y-1">
        <button
          v-for="item in navigation" :key="item.name"
          :data-cy="item.name + '-setting'"
          class="block w-full"
          :class="[currentTab === item.name ? 'bg-gray-100 dark:bg-gray-800 text-indigo-700 dark:text-indigo-400 hover:text-indigo-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-300', 'group rounded-md px-3 py-2 flex items-center text-sm font-medium']"
          @click="currentTab = item.name">
          <component :is="item.icon" :class="[currentTab === item.name ? 'text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-500' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-400', 'flex-shrink-0 -ml-1 mr-3 h-6 w-6']" aria-hidden="true" />
          <span class="truncate">
            {{ item.name }}
          </span>
        </button>
      </nav>
    </aside>

    <!-- backtest settings -->
    <div v-if="currentTab === 'Backtest'" data-cy="backtest-setting-tab" class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 w-full">
      <Card>
        <Heading>Logs</Heading>
        <p>
          Below configurations are used to filter out the extra logging info that are displayed when the <code>"--debug"</code> flag is enabled.
        </p>
        <br>
        <div data-cy="backtest-setting-logs-checkboxes" class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </Card>

      <Card>
        <Heading>Data</Heading>
        <div>
          <FormInput data-cy="backtest-setting-data-input"
                     placeholder="ex: 210"
                     title="Warmup Candles"
                     :object="settings.backtest"
                     description="Number of warmup candles that is loaded before starting each session"
                     name="warm_up_candles" input-type="number" />
        </div>
      </Card>

      <Card>
        <Heading>Exchanges</Heading>
        <p>
          Below you can modify configuration per each exchange. You can even choose to use a spot exchange's data for backtestig
          in futures mode (just because spot exchanges usually have more historical data), and vice versa.
        </p>
        <br>
        <br>

        <div v-for="(e, index) in settings.backtest.exchanges" :key="index" :data-cy="'backtest-setting-exchange-' + convertToSlug(e.name)">
          <Divider bg-light="bg-gray-50" bg-dark="dark:bg-gray-700" :title="e.name"/>

          <div class="grid grid-cols-6 gap-6">
            <FormInput :title="`Starting Capital`" :object="e" name="balance" input-type="number"
                       :step="1000" />

            <FormInput :title="`Trading Fee (${round(e.fee * 100, 2)}%)`" :object="e" name="fee" input-type="number"
                       :step="0.0001" />
          </div>

          <br>

          <RadioGroups title="Type:" :object="e" name="type" :options="['spot', 'futures']" />

          <br>

          <div v-if="e.type === 'futures'">
            <RadioGroups title="Leverage Mode:" :object="e" name="futures_leverage_mode"
                         :options="['cross', 'isolated']" default="isolated" />
            <br>
            <NumberInput v-if="e.type === 'futures'" title="Leverage (x):" name="futures_leverage"
                         :object="e" :default="1" />
            <br>
          </div>
        </div>
      </Card>
    </div>

    <!-- live settings -->
    <div v-if="currentTab === 'Live'" data-cy="setting-live-tab" class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 w-full">
      <Card>
        <Heading>Persistency</Heading>
        <p>
          If persistency is <b>enabled</b>, on new live session, Jesse will try to <b>continue</b> the previous
          running session based on the existing positions and orders on the exchange.
          <br>
          <br>
          If it's <b>disabled</b>, Jesse will first <b>close</b> all existing positions and orders before <b>starting</b> or <b>terminating</b> live sessions.
        </p>

        <br>

        <ToggleButton :object="settings.live"
                      name="persistency"
                      title="Enable Persistency"
        />
      </Card>

      <Card>
        <Heading>Candle Generation</Heading>
        <p>
          If the bellow option is <b>disabled</b>, Jesse will fetch candles for all timeframes (based on your routes) from the exchange. This ensures faster session start times and similar result in Jesse's chart and the one you see on the exchange (or TradingView).
          <br>
          <br>
          If the bellow option is <b>enabled</b>, Jesse will fetch 1m candles from the exchange, and generate bigger timeframes by its own. Doing so, Jesse is able to offer timeframes that are not supported by the exchange. It also captures the real price action that a shady exchange might be covering up later. In such case, you'll see differnet candle chart in Jesse and the one you see on the exchange.
        </p>

        <br>

        <ToggleButton :object="settings.live"
                      name="generate_candles_from_1m"
                      title="Generate Candles Locally"
        />
      </Card>

      <Card>
        <Heading>Logs</Heading>
        <p>
          You can filter the types of events that you want to be logged. Logging is often useful for debugging
          and recommended. Hence, it doesn't hurt to enable them all:
        </p>
        <br>
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
      </Card>

      <br>

      <Card>
        <Heading>Data</Heading>
        <div>
          <FormInput data-cy="live-setting-warmup-candles-input"
                     placeholder="ex: 210"
                     title="Warmup Candles"
                     :object="settings.live"
                     description="Number of warmup candles that is loaded before starting each session"
                     name="warm_up_candles"
                     :min="1"
                     input-type="number" />
        </div>
      </Card>

      <br>

      <Card>
        <Heading>
          Notifications
        </Heading>
        <p>
          Jesse can notify every time something interesting happens so you don't have to monitor your bots 24/7. Currently, Telegram and Discord drivers are supported. <br><br>
          To enter API keys for Telegram or Discord, check out your project's <code>.env</code> file.
        </p>
        <br>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Checkbox data-cy="live-setting-enabled-notification" name="enabled" title="Enable Notifications" :object="settings.live.notifications" />
        </div>
        <br>

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

          <Heading>
            Recurring Position Reports
          </Heading>

          <p>
            You will also receive recurring reports about your positions as notifications.
            This gives you a little ease of mind so you don't have to constantly check your positions.
          </p>

          <br>

          <p>You can choose the <strong>timeframe</strong> for how frequently you want to receive them:</p>

          <select v-model="settings.live.notifications.position_report_timeframe" data-cy="live-setting-report-notification-timeframe"
                  class="dark:bg-backdrop-dark dark:hover:bg-gray-800 hover:bg-gray-50 cursor-pointer w-full py-2 my-4 rounded border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <option v-for="item in timeframes" :key="item">{{ item }}</option>
          </select>

          <br>
        </div>
      </Card>

      <Card v-if="Object.keys(settings.live.exchanges).length">
        <div v-for="(e, index) in settings.live.exchanges" :key="index">
          <Divider :title="e.name" bg-light="bg-gray-50" bg-dark="dark:bg-gray-700" />

          <RadioGroups title="Leverage Mode:" :object="e" name="futures_leverage_mode" :options="['cross', 'isolated']" />

          <br>

          <NumberInput title="Leverage (x):" name="futures_leverage" :object="e"/>

          <br>

          <p>Balances and fees will be fetched from the exchange in live trading. But for <b>paper trading</b> you can set them here:</p>

          <br>

          <div class="grid grid-cols-6 gap-6">
            <FormInput title="Starting Capital" :object="e" name="balance" input-type="number"
                       :step="1000" />

            <FormInput :title="`Trading Fee (${round(e.fee * 100, 2)}%)`" :object="e" name="fee" input-type="number"
                       :step="0.0001" />
          </div>

          <br>
        </div>
      </Card>
    </div>

    <!-- optimization settings -->
    <div v-if="currentTab === 'Optimization'" class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 w-full" data-cy="optimization-setting-tab">
      <!-- CPU cores -->
      <Card>
        <Heading>CPU</Heading>
        <div>
          <FormInput placeholder="ex: 4"
                     :title="`CPU cores to use for optimization (${settings.optimization.cpu_cores}/${systemInfo.cpu_cores})`"
                     :object="settings.optimization"
                     description="How many CPU cores of your machine would you like to be used for optimization?"
                     name="cpu_cores" input-type="number" />
        </div>
      </Card>

      <!-- Fitness Function-->
      <Card>
        <Heading>Fitness Function</Heading>
        <RadioGroups title="Ratio:" :object="settings.optimization" name="ratio" :options="['sharpe', 'calmar', 'sortino', 'omega']" />
      </Card>

      <!-- Data -->
      <Card>
        <Heading>Data</Heading>
        <div>
          <FormInput data-cy="optimization-warmup-candles-input" placeholder="ex: 210"
                     title="Warmup Candles"
                     :object="settings.optimization"
                     description="Number of warmup candles that is loaded before starting each session"
                     name="warm_up_candles" input-type="number" />
        </div>
      </Card>

      <!-- exchange -->
      <Card>
        <Heading>Exchange</Heading>
        <p>
          Because the optimize mode is limited to one route only, it makes sense to have only one configuration section for the exchange values. Depending on the exchange you define in your route, these configurations will be used.
        </p>
        <div class="grid grid-cols-6 gap-6 my-4">
          <FormInput :title="`Starting Capital`"
                     :object="settings.optimization.exchange" name="balance" input-type="number"
                     :step="1000" />

          <FormInput :title="`Trading Fee (${round(settings.optimization.exchange.fee * 100, 2)}%)`"
                     :object="settings.optimization.exchange" name="fee" input-type="number"
                     :step="0.0001" />
        </div>

        <br>

        <RadioGroups title="Type:"
                     :object="settings.optimization.exchange"
                     name="type"
                     :options="['spot', 'futures']"
                     default="futures"
        />

        <br>

        <div v-if="settings.optimization.exchange.type === 'futures'">
          <RadioGroups title="Leverage Mode:"
                       :object="settings.optimization.exchange"
                       name="futures_leverage_mode"
                       :options="['cross', 'isolated']"
                       default="isolated"
          />

          <br>

          <NumberInput title="Leverage (x):" name="futures_leverage" :object="settings.optimization.exchange" :default="1" />
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { CalculatorIcon, ChipIcon, CurrencyDollarIcon } from '@heroicons/vue/outline'
import Checkbox from '@/components/Checkbox'
import Divider from '@/components/Divider'
import Heading from '@/components/Heading'
import Card from '@/components/Card'
import RadioGroups from '@/components/RadioGroups'
import { mapState } from 'pinia'
import { useMainStore } from '@/stores/main'
import FormInput from '@/components/Functional/FormInput'
import NumberInput from '@/components/Functional/NumberInput'
import _ from 'lodash'
import ToggleButton from '@/components/ToggleButton'


export default {
  components: {
    ToggleButton,
    Checkbox,
    Divider,
    Heading,
    Card,
    RadioGroups,
    FormInput,
    NumberInput
  },
  data () {
    return {
      timeframes: ['1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '3h', '4h', '6h', '8h', '12h', '1D'],
      currentTab: 'Backtest',
      persistencyOptions: [
        {
          name: 'Continue Session',
          description: 'Continue from the previous session using existing data on the exchange'
        },
        {
          name: 'New Session',
          description: 'Start a fresh sessions. Close existing positions and orders on the exchange'
        }
      ],
    }
  },
  computed: {
    ...mapState(useMainStore, ['settings', 'systemInfo', 'hasLivePluginInstalled', 'planInfo', 'exchangeInfo']),
    isLive () {
      return this.$route.name === 'Live'
    },
    navigation () {
      const arr = [
        { name: 'Backtest', icon: CalculatorIcon },
        { name: 'Optimization', icon: ChipIcon },
      ]
      if (this.hasLivePluginInstalled) {
        arr.push({ name: 'Live', icon: CurrencyDollarIcon })
      }
      return arr
    }
  },
  created () {
    // if this.$route.name is either "Backtest", "Optimization" or "Live", set the currentTab to that value
    if (this.$route.name === 'Backtest') {
      this.currentTab = 'Backtest'
    } else if (this.$route.name === 'Optimization') {
      this.currentTab = 'Optimization'
    } else if (this.$route.name === 'Live') {
      this.currentTab = 'Live'
    }
  },
  mounted () {
    this.sortExchanges()
    this.removeInactiveLiveExchanges()
  },
  methods: {
    round: _.round,
    sortExchanges () {
      const sortBacktestKeys = Object.keys(this.settings.backtest.exchanges).sort()
      const sortLiveKeys = Object.keys(this.settings.live.exchanges).sort()
      const backtestExchange = {}
      const liveExchange = {}
      for (const item of sortBacktestKeys) {
        backtestExchange[item] = this.settings.backtest.exchanges[item]
      }
      this.settings.backtest.exchanges = backtestExchange

      for (const item of sortLiveKeys) {
        liveExchange[item] = this.settings.live.exchanges[item]
      }
      this.settings.live.exchanges = liveExchange
    },
    removeInactiveLiveExchanges () {
      // loop through this.settings.live.exchanges, if the
      // allowedToTradeIn(exchange.name) is false, remove
      // that item from this.settings.live.exchanges
      for (const exchange of Object.keys(this.settings.live.exchanges)) {
        if (!this.allowedToTradeIn(exchange)) {
          delete this.settings.live.exchanges[exchange]
        }
      }
    },
    allowedToTradeIn (exchangeName) {
      // can trade everywhere if it's not for live mode
      if (!this.isLive) return true

      // premium plans can trade everywhere
      if (this.planInfo.plan === 'premium') {
        return true
      }

      // otherwise, can trade if "required_live_plan" property of the exchange is "free"
      return this.exchangeInfo[exchangeName].required_live_plan === 'free'
    },
    convertToSlug (Text) {
      return Text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
    },
  }
}
</script>
