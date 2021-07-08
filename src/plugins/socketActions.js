import { useBacktestStore } from '@/stores/backtest'
import { useCandlesStore } from '@/stores/candles'

export default function () {
  const backtest = useBacktestStore()
  const candles = useCandlesStore()

  // Prepare needed actions for each socket event
  return new Map([
    // backtest
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
    ['backtest.info_log', [
      backtest.infoLogEvent
    ]],

    // candles
    ['candles.progressbar', [
      candles.progressbarEvent
    ]],
  ])
}


