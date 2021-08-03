import { defineStore } from 'pinia'
import axios from 'axios'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    isConnected: false,
    isInitiated: false,
    theme: localStorage.theme,
    modals: {
      settings: false,
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
        exchanges: [],
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
        exchanges: [],
      },
      optimization: {
        // sharpe, calmar, sortino, omega
        ratio: 'sharpe',
        warm_up_candles: 210,
        exchanges: [],
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
      axios.post('http://127.0.0.1:8000/routes-info').then(res => {
        const data = res.data.data
        this.routes.exchanges = data.exchanges
        this.routes.liveExchanges = data.live_exchanges
        this.routes.strategies = data.strategies
        this.isInitiated = true
        this.routes.exchanges.forEach(item => {
          const template = {
            name: item,
            fee: 0.001,
            futures_leverage_mode: 'isolated',
            futures_leverage: 2,
            balance: 10_000
          }
          this.settings.backtest.exchanges.push(template)
          this.settings.live.exchanges.push(template)
        })
      }).catch(error => {
        this.notyf.error(`[${error.response.status}]: ${error.response.statusText}`)
      })
    }
  }
})
