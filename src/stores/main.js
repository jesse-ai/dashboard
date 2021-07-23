import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    isConnected: false,
    theme: localStorage.theme,
    routes: {
      exchanges: [],
      liveExchanges: [],
      timeframes: ['1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '3h', '4h', '6h', '8h', '12h', '1D', '3D', '1W'],
      strategies: [],
    }
  }),
})
