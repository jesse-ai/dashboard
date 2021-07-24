import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    isConnected: false,
    theme: localStorage.theme,
    modals: {
      settings: false,
    },
    settings: {
      backtest: {
        exchanges: {},
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
        metrics: {
          sharpe_ratio: true,
          calmar_ratio: false,
          sortino_ratio: false,
          omega_ratio: false,
          winning_streak: false,
          losing_streak: false,
          largest_losing_trade: false,
          largest_winning_trade: false,
          total_winning_trades: false,
          total_losing_trades: false,
        }
      }
    },
    routes: {
      exchanges: [],
      liveExchanges: [],
      timeframes: ['1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '3h', '4h', '6h', '8h', '12h', '1D', '3D', '1W'],
      strategies: [],
    }
  }),
})
