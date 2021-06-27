// Handle ws events and pass data to actions
export default new Map([
  ['backtest.candles_info', [
    'backtest/candlesInfo'
  ]],
  ['backtest.routes_info', [
    'backtest/routesInfo'
  ]],
  ['backtest.progressbar', [
    'backtest/progressbar'
  ]],
  ['backtest.metrics', [
    'backtest/metrics'
  ]],
])
