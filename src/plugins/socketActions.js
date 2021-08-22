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
    ['backtest.general_info', [
      backtest.generalInfoEvent
    ]],

    // candles
    ['candles.progressbar', [
      candles.progressbarEvent
    ]],
    ['candles.alert', [
      candles.alertEvent
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
    ['papertrade.order', [
      live.orderEvent
    ]],
    ['livetrade.order', [
      live.orderEvent
    ]],
    ['papertrade.general_info', [
      live.generalInfoEvent
    ]],
    ['livetrade.general_info', [
      live.generalInfoEvent
    ]],
    ['papertrade.current_candles', [
      live.currentCandlesEvent
    ]],
    ['livetrade.current_candles', [
      live.currentCandlesEvent
    ]],
    ['papertrade.info_log', [
      live.infoLogEvent
    ]],
    ['livetrade.info_log', [
      live.infoLogEvent
    ]],
    ['papertrade.error_log', [
      live.errorLogEvent
    ]],
    ['livetrade.error_log', [
      live.errorLogEvent
    ]],
    ['papertrade.error_log', [
      live.errorLogEvent
    ]],
    ['livetrade.error_log', [
      live.errorLogEvent
    ]],
    ['papertrade.exception', [
      live.exceptionEvent
    ]],
    ['livetrade.exception', [
      live.exceptionEvent
    ]],
    ['papertrade.termination', [
      live.terminationEvent
    ]],
    ['livetrade.termination', [
      live.terminationEvent
    ]],
  ])
}


