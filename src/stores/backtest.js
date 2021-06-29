import { defineStore } from 'pinia'

export const useBacktestStore = defineStore({
  id: 'backtest',
  state: () => ({
    candlesInfo: {},
    routesInfo: [],
    progressbar: {
      current: 0,
      estimated_remaining_seconds: 0
    },
    metrics: {}
  }),
  getters: {
    progressPercent: (state) => Math.round(state.progressbar.current),
  },
  actions: {
    candlesInfoEvent (data) {
      console.log(1, data)
      this.candlesInfo = data
      console.log(this.candlesInfo)
    },
    routesInfoEvent  (data) {
      this.routesInfo = data
    },
    progressbarEvent  (data) {
      this.progressbar = data
    },
    metricsEvent  (data) {
      this.metrics = data
    }
  },
})
