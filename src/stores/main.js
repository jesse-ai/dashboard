import { defineStore } from 'pinia'
import axios from '@/http'
import _ from 'lodash'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    isConnected: false,
    isInitiated: false,
    isAuthenticated: false,
    isLoggedInToJesseTrade: false,
    hasLivePluginInstalled: false,
    theme: localStorage.theme,
    modals: {
      settings: false,
      exceptionReport: false,
      feedback: false,
      jesseTradeLogin: false,
      jesseTradeLogout: false,
      makeStrategy: false,
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
        // sharpe, calmar, sortino, omega
        ratio: 'sharpe',
        warm_up_candles: 210,
        exchanges: {},
      }
    },
    routes: {
      exchanges: [],
      liveExchanges: [],
      timeframes: ['1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '3h', '4h', '6h', '8h', '12h', '1D', '3D', '1W'],
      strategies: [],
    }
  }),

  actions: {
    initiate () {
      axios.post('/general-info').then(res => {
        const data = res.data
        this.routes.exchanges = data.exchanges
        this.routes.liveExchanges = data.live_exchanges
        this.routes.strategies = data.strategies
        this.isLoggedInToJesseTrade = data.is_logged_in_to_jesse_trade
        this.hasLivePluginInstalled = data.has_live_plugin_installed
        this.routes.exchanges.forEach(item => {
          this.settings.backtest.exchanges[item] = {
            name: item,
            fee: 0.001,
            futures_leverage_mode: 'isolated',
            futures_leverage: 2,
            balance: 10_000
          }
        })
        this.routes.liveExchanges.forEach(item => {
          this.settings.live.exchanges[item] = {
            name: item,
            fee: 0.001,
            futures_leverage_mode: 'cross',
            futures_leverage: 2,
            balance: 10_000
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
        this.notyf.error(`[${error.response.status}]: ${error.response.statusText}`)
      })
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
