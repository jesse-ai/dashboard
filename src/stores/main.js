import { defineStore } from 'pinia'
import axios from '@/http'
import _ from 'lodash'

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
    routes: {
      exchanges: [],
      liveExchanges: [],
      timeframes: ['1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '3h', '4h', '6h', '8h', '12h', '1D'],
      strategies: [],
    }
  }),

  actions: {
    initiate () {
      axios.post('/general-info').then(res => {
        const data = res.data
        this.systemInfo = data.system_info
        this.updateInfo = data.update_info
        this.routes.liveExchanges = data.live_exchanges
        this.routes.strategies = data.strategies
        this.hasLivePluginInstalled = data.has_live_plugin_installed

        // create the list of exchanges
        this.routes.exchanges = []
        data.exchanges.forEach(item => {
          const key = item.name
          const value = item
          this.routes.exchanges.push(item)
          this.settings.backtest.exchanges[key] = {
            name: key,
            fee: value.fee,
            balance: value.balance,
            settlement_currency: value.settlement_currency,
            type: value.type,
          }
          if (value.type === 'futures') {
            this.settings.backtest.exchanges[key].futures_leverage_mode = value.futures_leverage_mode
            this.settings.backtest.exchanges[key].futures_leverage = value.futures_leverage
          }
        })

        // sort this.routes.exchanges
        this.routes.exchanges.sort()

        // do the same for live exchanges
        this.routes.liveExchanges.forEach(item => {
          this.settings.live.exchanges[item] = {
            name: item,
            fee: 0.001,
            futures_leverage_mode: 'cross',
            futures_leverage: 2,
            balance: 10_000,
            settlement_currency: 'USDT'
          }
        })

        axios.post('/get-config', {
          current_config: this.settings
        }).then(res => {
          this.settings = res.data.data.data
          this.isInitiated = true
        }).catch(error => {
          this.notyf.error(`[${error.response.status}]: ${error.response.statusText}`)
        })
      }).catch(error => {
        console.error(`[${error.response.status}]: ${error.response.statusText}`)
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
          this.notyf.error(`[${error.response.status}]: ${error.response.statusText}`)
        })
      },
      1000,
      { leading: true, trailing: true }
    )
  }
})
