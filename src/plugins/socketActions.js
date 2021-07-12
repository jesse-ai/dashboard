import { useBacktestStore } from '@/stores/backtest'
import { useCandlesStore } from '@/stores/candles'
import { useLiveStore } from '@/stores/live'

export default function () {
  const backtest = useBacktestStore()
  const candles = useCandlesStore()
  const live = useLiveStore()

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
    ['backtest.equity_curve', [
      backtest.equityCurveEvent
    ]],
    ['backtest.exception', [
      backtest.exceptionEvent
    ]],

    // candles
    ['candles.progressbar', [
      candles.progressbarEvent
    ]],
    ['candles.exception', [
      candles.exceptionEvent
    ]],

    // live and paper
    ['papertrade.progressbar', [
      live.progressbarEvent
    ]],
    ['livetrade.progressbar', [
      live.progressbarEvent
    ]],
    ['papertrade.positions', [
      live.positionsEvent
    ]],
    ['livetrade.positions', [
      live.positionsEvent
    ]],
    ['papertrade.orders', [
      live.ordersEvent
    ]],
    ['livetrade.orders', [
      live.ordersEvent
    ]],
  ])
}


