import { defineStore } from 'pinia'
import axios from '@/http'
import _ from 'lodash'
import notifier from '../notifier'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    baseURL: '',
    isConnected: false,
    isInitiated: false,
    isAuthenticated: false,
    hasLivePluginInstalled: false,
    systemInfo: {},
    updateInfo: {},
    planInfo: {},
    theme: localStorage.theme,
    modals: {
      settings: false,
      exceptionReport: false,
      feedback: false,
      makeStrategy: false,
      about: false,
    },
    settings: {
      backtest: {
        logging: {
          order_submission: true,
          order_cancellation: true,
          order_execution: true,
          position_opened: true,
          position_increased: true,
          position_reduced: true,
          position_closed: true,
          shorter_period_candles: false,
          trading_candles: true,
          balance_update: true,
        },
        warm_up_candles: 210,
        exchanges: {},
      },
      live: {
        persistency: true,
        generate_candles_from_1m: false,
        logging: {
          order_submission: true,
          order_cancellation: true,
          order_execution: true,
          position_opened: true,
          position_increased: true,
          position_reduced: true,
          position_closed: true,
          shorter_period_candles: false,
          trading_candles: true,
          balance_update: true,
        },
        warm_up_candles: 210,
        exchanges: {},
        notifications: {
          enabled: true,
          position_report_timeframe: '1h',
          events: {
            errors: true,
            started_session: true,
            terminated_session: true,
            submitted_orders: true,
            cancelled_orders: true,
            executed_orders: true,
            opened_position: true,
            updated_position: true,
          },
        },
      },
      optimization: {
        cpu_cores: 2,
        // sharpe, calmar, sortino, omega
        ratio: 'sharpe',
        warm_up_candles: 210,
        exchange: {
          balance: 10_000,
          fee: 0.001,
          type: 'futures',
          futures_leverage: 3,
          futures_leverage_mode: 'cross',
        },
      }
    },
    strategies: [],
    exchangeInfo: {},
    jesse_supported_timeframes: [],
  }),
  getters: {
    backtestingExchangeNames () {
      const arr = []
      for (const key in this.exchangeInfo) {
        if (this.exchangeInfo[key].modes.backtesting) {
          arr.push(key)
        }
      }
      // sort arr's items by name alphabetically
      return arr.sort()
    }
  },
  actions: {
    initiate () {
      axios.post('/general-info').then(res => {
        const data = res.data
        this.systemInfo = data.system_info
        this.updateInfo = data.update_info
        this.strategies = data.strategies
        this.exchangeInfo = data.exchanges
        this.jesseSupportedTimeframes = data.jesse_supported_timeframes
        this.hasLivePluginInstalled = data.has_live_plugin_installed
        this.planInfo = data.plan_info

        // create the list of exchanges by setting the default values (further down we
        // will override the default values with the user's settings fetched from the database)
        // loop through the this.exchangeInfo object
        for (const key in this.exchangeInfo) {
          const value = this.exchangeInfo[key]

          // for backtests
          if (value.modes.backtesting) {
            this.settings.backtest.exchanges[key] = {
              name: key,
              fee: value.fee,
              balance: 10000,
              type: value.type,
            }
            if (value.type === 'futures') {
              this.settings.backtest.exchanges[key].futures_leverage_mode = 'cross'
              this.settings.backtest.exchanges[key].futures_leverage = 2
            }
          }

          // for live trading
          if (value.modes.live_trading) {
            this.settings.live.exchanges[value.name] = {
              name: key,
              fee: value.fee,
              futures_leverage_mode: 'cross',
              futures_leverage: 2,
              balance: 10_000,
            }
          }
        }

        // fetch and merge the user's settings from the database
        axios.post('/get-config', {
          current_config: this.settings
        }).then(res => {
          this.settings = res.data.data.data
          this.isInitiated = true
        }).catch(error => {
          notifier.error(`[${error.response.status}]: ${error.response.statusText}`)
        })
      }).catch(error => {
        const msg = `${error.response.data.error}`
        console.error(msg)
        notifier.error(msg)
      })

      // set baseUrl to axios.defaults.baseURL
      this.baseURL = axios.defaults.baseURL
    },

    updateConfig: _.throttle(
      function () {
        if (!this.isInitiated) return

        axios.post('/update-config', {
          current_config: this.settings
        }).catch(error => {
          notifier.error(`[${error.response.status}]: ${error.response.statusText}`)
        })
      },
      1000,
      { leading: true, trailing: true }
    )
  }
})
