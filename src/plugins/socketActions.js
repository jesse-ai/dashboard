import { useBacktestStore } from '@/stores/backtest'
import { useCandlesStore } from '@/stores/candles'
import { useLiveStore } from '@/stores/live'
import { useOptimizationStore } from '@/stores/optimization'

export default function () {
  const backtest = useBacktestStore()
  const candles = useCandlesStore()
  const live = useLiveStore()
  const optimize = useOptimizationStore()

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
    ['backtest.hyperparameters', [
      backtest.hyperparametersEvent
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
    ['backtest.termination', [
      backtest.terminationEvent
    ]],
    ['backtest.alert', [
      backtest.alertEvent
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
    ['candles.termination', [
      candles.terminationEvent
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
    ['papertrade.general_info', [
      live.generalInfoEvent
    ]],
    ['livetrade.general_info', [
      live.generalInfoEvent
    ]],
    ['papertrade.watch_list', [
      live.watchlistEvent
    ]],
    ['livetrade.watch_list', [
      live.watchlistEvent
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
    ['papertrade.unexpectedTermination', [
      live.unexpectedTerminationEvent
    ]],
    ['livetrade.unexpectedTermination', [
      live.unexpectedTerminationEvent
    ]],
    ['papertrade.termination', [
      live.terminationEvent
    ]],
    ['livetrade.termination', [
      live.terminationEvent
    ]],

    ['optimize.progressbar', [
      optimize.progressbarEvent
    ]],
    ['optimize.general_info', [
      optimize.generalInfoEvent
    ]],
    ['optimize.metrics', [
      optimize.metricsEvent
    ]],
    ['optimize.exception', [
      optimize.exceptionEvent
    ]],
    ['optimize.termination', [
      optimize.terminationEvent
    ]],
    ['optimize.alert', [
      optimize.alertEvent
    ]],
    ['optimize.best_candidates', [
      optimize.bestCandidatesEvent
    ]],
  ])
}


