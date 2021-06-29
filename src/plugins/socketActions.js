import { useBacktestStore } from '@/stores/backtest'

export default function () {
  const backtest = useBacktestStore()

  // Prepare needed actions for each socket event
  return new Map([
    ['backtest.candles_info', [
      backtest.candlesInfoEvent
    ]],
    ['backtest.routes_info', [
      backtest.routesInfoEvent
    ]],
    ['backtest.progressbar', [
      backtest.progressbarEvent
    ]],
    ['backtest.metrics', [
      backtest.metricsEvent
    ]],
  ])
}


