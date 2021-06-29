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
  actions: {
    candlesInfoEvent (data) {
      this.patch({
        candlesInfo: data
      })
    },
    routesInfoEvent  (data) {
      this.patch({
        routesInfo: data
      })
    },
    progressbarEvent  (data) {
      this.patch({
        progressbar: data
      })
    },
    metricsEvent  (data) {
      this.patch({
        metrics: data
      })
    }
  },
})
