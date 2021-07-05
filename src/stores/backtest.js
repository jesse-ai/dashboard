import { defineStore } from 'pinia'
import _ from 'lodash'
import helpers from '@/helpers'


let idCounter = 0

function newTab () {
  return _.cloneDeep({
    id: ++idCounter,
    name: 'Tab 0',
    form: {
      start_date: '2021-06-01',
      finish_date: '2021-06-02',
      debug_mode: false,
      export_chart: false,
      export_tradingview: false,
      export_full_reports: false,
      export_csv: false,
      export_json: false,
      routes: [],
      extra_routes: []
    },
    results: {
      showResults: false,
      executing: false,
      progressbar: {
        current: 0,
        estimated_remaining_seconds: 0
      },
      info: [],
      metrics: [],
      infoLogs: ''
    }
  })
}


export const useBacktestStore = defineStore({
  id: 'backtest',
  state: () => ({
    tabs: {
      1: newTab()
    }
  }),
  actions: {
    addTab () {
      const tab = newTab()
      this.tabs[tab.id] = tab
      return this.$router.push(`/backtest/${tab.id}`)
    },
    duplicateTab () {},
    candlesInfoEvent (id, data) {
      this.tabs[id].results.info = [
        ['Period', data.duration],
        ['Starting-Ending Date', `${helpers.timestampToDate(data.starting_time)} => ${helpers.timestampToDate(data.finishing_time)}`],
      ]
    },
    routesInfoEvent (data) {
      console.log('routesInfoEvent is empty')
    },
    progressbarEvent (id, data) {
      this.tabs[id].results.progressbar = data
    },
    infoLogEvent (id, data) {
      this.tabs[id].results.infoLogs += `[${helpers.timestampToTime(data.time)}] ${data.message}\n`
    },
    metricsEvent (id, data) {
      this.tabs[id].results.metrics = [
        ['Total Closed Trades', data.total],
        ['Total Net Profit', `${_.round(data.net_profit, 2)} (${_.round(data.net_profit_percentage, 2)})`],
        ['Starting => Finishing Balance', `${_.round(data.starting_balance, 2)} => ${_.round(data.finishing_balance, 2)}`],
        ['Open Trades', data.total_open_trades],
        ['Total Paid Fees', _.round(data.fee, 2)],
        ['Max Drawdown', _.round(data.max_drawdown, 2)],
        ['Annual Return', `${_.round(data.annual_return, 2)}%`],
        ['Expectancy', `${_.round(data.expectancy, 2)} (${_.round(data.expectancy_percentage, 2)}%)`],
        ['Avg Win | Avg Loss', `${_.round(data.average_win, 2)} | ${_.round(data.average_loss, 2)}`],
        ['Ratio Avg Win / Avg Loss', _.round(data.open_pl, 2)],
        ['Win-rate', `${_.round(data.win_rate * 100, 2)}%`],
        ['Longs | Shorts', `${_.round(data.longs_percentage, 2)}% | ${_.round(data.shorts_percentage, 2)}%`],
        ['Avg Holding Time', data.average_holding_period],
        ['Winning Trades Avg Holding Time', data.average_winning_holding_period],
        ['Losing Trades Avg Holding Time', data.average_losing_holding_period],
        ['Sharpe Ratio', _.round(data.sharpe_ratio, 2)],
        ['Calmar Ratio', _.round(data.calmar_ratio, 2)],
        ['Sortino Ratio', _.round(data.sortino_ratio, 2)],
        ['Omega Ratio', _.round(data.omega_ratio, 2)],
        ['Winning Streak', data.winning_streak],
        ['Losing Streak', data.losing_streak],
        ['Largest Winning Trade', _.round(data.largest_winning_trade, 2)],
        ['Largest Losing Trade', _.round(data.largest_losing_trade, 2)],
        ['Total Winning Trades', data.total_winning_trades],
        ['Total Losing Trades', data.total_losing_trades],
      ]

      // backtest is finished:
      this.tabs[id].results.executing = false
      this.tabs[id].results.showResults = true
    }
  },
})
