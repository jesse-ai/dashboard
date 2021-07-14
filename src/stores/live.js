import { defineStore } from 'pinia'
import _ from 'lodash'
import helpers from '@/helpers'
import axios from 'axios'

let idCounter = 0

function newTab () {
  return _.cloneDeep({
    id: ++idCounter,
    name: 'Tab 0',
    form: {
      debug_mode: false,
      paper_mode: true,
      routes: [],
      extra_routes: []
    },
    results: {
      showResults: false,
      booting: false,
      monitoring: false,
      progressbar: {
        current: 0,
        estimated_remaining_seconds: 0
      },
      routes_info: [],
      metrics: [],
      generalInfo: {},
      positions: [],
      orders: [],
      infoLogs: '',
      errorLogs: '',
      exception: {
        error: '',
        traceback: ''
      },
      charts: {
        equity_curve: []
      }
    }
  })
}

export const useLiveStore = defineStore({
  id: 'live',
  state: () => ({
    tabs: {
      1: newTab()
    }
  }),
  actions: {
    addTab () {
      const tab = newTab()
      this.tabs[tab.id] = tab
      return this.$router.push(`/live/${tab.id}`)
    },
    startInNewTab (id) {
      const tab = newTab()
      tab.form = _.cloneDeep(this.tabs[id].form)
      this.tabs[tab.id] = tab
      this.start(tab.id)
    },
    start (id) {
      this.tabs[id].results.progressbar.current = 0
      this.tabs[id].results.booting = true
      this.tabs[id].results.infoLogs = ''
      this.tabs[id].results.errorLogs = ''
      this.tabs[id].results.exception.traceback = ''
      this.tabs[id].results.exception.error = ''

      axios.post('http://127.0.0.1:8000/live', {
        id,
        routes: this.tabs[id].form.routes,
        extra_routes: this.tabs[id].form.extra_routes,
        debug_mode: this.tabs[id].form.debug_mode,
        paper_mode: this.tabs[id].form.paper_mode,
      }).catch(error => {
        this.notyf.error(`[${error.response.status}]: ${error.response.statusText}`)
        this.tabs[id].results.booting = false
      })
    },
    cancel (id) {
      this.tabs[id].results.booting = false
      axios.delete('http://127.0.0.1:8000/live', {
        headers: {},
        data: {
          id,
          paper_mode: this.tabs[id].form.paper_mode
        }
      }).catch(error => this.notyf.error(`[${error.response.status}]: ${error.response.statusText}`))
    },
    rerun (id) {
      this.tabs[id].results.showResults = false
      this.start(id)
    },
    newLive (id) {
      this.tabs[id].results.showResults = false
    },

    candlesInfoEvent (id, data) {
      this.tabs[id].results.info = [
        ['Period', data.duration],
        [
          'Starting-Ending Date',
          `${helpers.timestampToDate(
            data.starting_time
          )} => ${helpers.timestampToDate(data.finishing_time)}`
        ]
      ]
    },
    routesInfoEvent (id, data) {
      const arr = []
      data.forEach(item => {
        arr.push([
          item.exchange,
          item.symbol,
          item.timeframe,
          item.strategy_name
        ])
      })
      this.tabs[id].results.routes_info = arr
    },
    progressbarEvent (id, data) {
      this.tabs[id].results.progressbar = data
    },
    infoLogEvent (id, data) {
      this.tabs[id].results.infoLogs += `[${helpers.timestampToTime(
        data.time
      )}] ${data.message}\n`
    },
    exceptionEvent (id, data) {
      this.tabs[id].results.exception.error = data.error
      this.tabs[id].results.exception.traceback = data.traceback
    },
    generalInfoEvent (id, data) {
      // sample
      // {
      //   "started_at": 1626161855000,
      //   "current_time": 1626161884000,
      //   "started_balance": 10000,
      //   "current_balance": 9991.2,
      //   "debug_mode": false,
      //   "count_error_logs": 0,
      //   "count_info_logs": 4,
      //   "count_active_orders": 0,
      //   "open_positions": 1,
      //   "pnl": 0,
      //   "pnl_perc": 0,
      //   "count_trades": 0,
      //   "count_winning_trades": 0,
      //   "count_losing_trades": 0
      // }
      this.tabs[id].results.generalInfo = data

      // turn on monitoring dashboard if haven't yet
      if (!this.tabs[id].results.monitoring) {
        this.tabs[id].results.booting = false
        this.tabs[id].results.monitoring = true
      }
    },
    positionsEvent (id, data) {
      // sample
      // {
      //   "type": "close",
      //   "strategy_name": "TestLiveMode01",
      //   "symbol": "BTC-USDT",
      //   "leverage": 3,
      //   "opened_at": 1626109441000,
      //   "qty": 0,
      //   "entry": null,
      //   "current_price": 33228.3,
      //   "liq_price": null,
      //   "pnl": 0,
      //   "pnl_perc": null
      // }

      this.tabs[id].results.positions = [
        [
          'Type', 'Strategy', 'Symbol', 'Entry', 'Current Price', 'PNL'
        ]
      ]

      for (const item of data) {
        this.tabs[id].results.positions.push([
          item.type, item.strategy_name, item.symbol, item.entry, item.current_price, `${_.round(item.pnl, 2)} (${_.round(item.pnl_perc, 2)}%)`
        ])
      }
    },
    ordersEvent (id, data) {
      // sample:
      // {
      //   "symbol": "BTC-USDT",
      //   "side": "buy",
      //   "type": "MARKET",
      //   "qty": 0.884,
      //   "price": 33217.1,
      //   "flag": null,
      //   "status": "EXECUTED",
      //   "created_at": 1626109440000,
      //   "canceled_at": null,
      //   "executed_at": 1626109441000
      // }
      this.tabs[id].results.orders = [
        [
          'Created', 'Symbol', 'Type', 'Side', 'Price', 'QTY', 'Status'
        ]
      ]

      for (const item of data) {
        this.tabs[id].results.orders.push([
          helpers.timestampToTime(item.created_at), item.symbol, item.type, item.side, item.price, item.qty, item.status
        ])
      }
    },
    metricsEvent (id, data) {
      this.tabs[id].results.metrics = [
        ['Total Closed Trades', data.total],
        ['Total Net Profit', `${_.round(data.net_profit, 2)} (${_.round(data.net_profit_percentage, 2)}%)`],
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
        ['Total Losing Trades', data.total_losing_trades]
      ]
    },
    equityCurveEvent (id, data) {
      this.tabs[id].results.charts.equity_curve = []
      data.forEach(item => {
        this.tabs[id].results.charts.equity_curve.push({
          value: item.balance,
          time: item.timestamp
        })
      })

      // live is finished, time to show charts:
      this.tabs[id].results.booting = false
      this.tabs[id].results.showResults = true
    }
  }
})
