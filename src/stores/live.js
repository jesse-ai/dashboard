import { defineStore } from 'pinia'
import _ from 'lodash'
import helpers from '@/helpers'
import axios from '@/http'
import { useMainStore } from '@/stores/main'
import notifier from '../notifier'

let idCounter = 0

function newTab () {
  return _.cloneDeep({
    id: ++idCounter,
    session_id: '',
    name: 'Tab 0',
    form: helpers.getDefaultFromLocalStorage('liveForm', {
      debug_mode: true,
      paper_mode: true,
      routes: [],
      extra_routes: []
    }),
    modals: {
      reportWithoutException: false,
      infoLogs: false,
      errorLogs: false,
      terminationConfirm: false,
      orders: false,
    },
    results: {
      showResults: false,
      booting: false,
      monitoring: false,
      finished: false,
      terminating: false,
      progressbar: {
        current: 0,
        estimated_remaining_seconds: 0
      },
      routes_info: [],
      routes: [],
      metrics: [],
      generalInfo: {},
      positions: [],
      orders: [],
      watchlist: [],
      candles: [],
      currentCandles: {},
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
    reset (id) {
      this.tabs[id].results.progressbar.current = 0
      this.tabs[id].results.booting = true
      this.tabs[id].results.finished = false
      this.tabs[id].results.infoLogs = ''
      this.tabs[id].results.errorLogs = ''
      this.tabs[id].results.exception.traceback = ''
      this.tabs[id].results.exception.error = ''
      this.tabs[id].results.routes_info = []
      this.tabs[id].results.metrics = []
      this.tabs[id].results.generalInfo = {}
      this.tabs[id].results.positions = []
      this.tabs[id].results.orders = []
      this.tabs[id].results.candles = []
      this.tabs[id].results.currentCandles = {}
      this.tabs[id].results.watchlist = []
    },
    start (id) {
      this.reset(id)

      const mainStore = useMainStore()

      // make sure symbols are uppercase
      this.tabs[id].form.routes = this.tabs[id].form.routes.map(route => {
        route.symbol = route.symbol.toUpperCase()
        return route
      })
      // also for extra_routes
      this.tabs[id].form.extra_routes = this.tabs[id].form.extra_routes.map(route => {
        route.symbol = route.symbol.toUpperCase()
        return route
      })

      axios.post('/live', {
        id,
        routes: this.tabs[id].form.routes,
        extra_routes: this.tabs[id].form.extra_routes,
        config: mainStore.settings.live,
        debug_mode: this.tabs[id].form.debug_mode,
        paper_mode: this.tabs[id].form.paper_mode,
      }).catch(error => {
        notifier.error(`[${error.response.status}]: ${error.response.statusText}`)
        this.tabs[id].results.booting = false
      })
    },
    cancel (id) {
      this.tabs[id].results.booting = false
      axios.delete('/live', {
        headers: {},
        data: {
          id,
          paper_mode: this.tabs[id].form.paper_mode
        }
      }).catch(error => notifier.error(`[${error.response.status}]: ${error.response.statusText}`))
    },
    stop (id) {
      axios.delete('/live', {
        headers: {},
        data: {
          id,
          paper_mode: this.tabs[id].form.paper_mode
        }
      }).then(res => {
        this.tabs[id].modals.terminationConfirm = false
        this.tabs[id].results.terminating = true
      }).catch(error => notifier.error(`[${error.response.status}]: ${error.response.statusText}`))
    },
    newLive (id) {
      this.tabs[id].results.monitoring = false
      this.tabs[id].results.finished = false
    },
    candlesInfoEvent (id, data) {
      this.tabs[id].results.info = [
        ['Period', data.duration],
        ['Starting-Ending Date', `${helpers.timestampToDate(data.starting_time)} => ${helpers.timestampToDate(data.finishing_time)}`]
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
        data.timestamp
      )}] ${data.message}\n`
    },
    errorLogEvent (id, data) {
      notifier.error(data.message)

      this.tabs[id].results.errorLogs += `[${helpers.timestampToTime(
        data.timestamp
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
      //   "count_losing_trades": 0,
      //   "routes": [...Array]
      // }
      this.tabs[id].results.generalInfo = data

      // set routes in both form.routes (maybe page was refreshed)
      this.tabs[id].form.routes = this.tabs[id].results.generalInfo.routes
      // and results.routes which is where the table is read from
      this.tabs[id].results.routes = [
        ['Exchange', 'Symbol', 'Timeframe', 'Strategy']
      ]
      for (const item of this.tabs[id].form.routes) {
        this.tabs[id].results.routes.push([
          { value: item.exchange, style: '' },
          { value: item.symbol, style: '' },
          { value: item.timeframe, style: '' },
          { value: item.strategy, style: '' },
        ])
      }

      // turn on monitoring dashboard if haven't yet
      if (!this.tabs[id].results.monitoring) {
        this.tabs[id].results.booting = false
        this.tabs[id].results.monitoring = true
        this.fetchCandles(id)
        this.fetchLogs(id)
      }
    },
    fetchCandles (id) {
      axios.post('/get-candles', {
        id,
        exchange: this.tabs[id].form.routes[0].exchange,
        symbol: this.tabs[id].form.routes[0].symbol,
        timeframe: this.tabs[id].form.routes[0].timeframe,
      }).then(res => {
        this.tabs[id].results.candles = res.data.data

        if (!res.data.data.length) {
          notifier.error('Could not load candles')
        }
      }).catch(error => {
        notifier.error(`[${error.response.status}]: ${error.response.statusText}`)
      })
    },
    fetchLogs (id) {
      // info logs
      axios.post('/get-logs', {
        id,
        session_id: this.tabs[id].results.generalInfo.session_id,
        type: 'info',
      }).then(res => {
        const arr = res.data.data
        this.tabs[id].results.infoLogs = ''

        arr.forEach(data => {
          this.tabs[id].results.infoLogs += `[${helpers.timestampToTime(
            data.timestamp
          )}] ${data.message}\n`
        })
      }).catch(error => {
        notifier.error(`[${error.response.status}]: ${error.response.statusText}`)
      })

      // error logs
      axios.post('/get-logs', {
        id,
        session_id: this.tabs[id].results.generalInfo.session_id,
        type: 'error',
      }).then(res => {
        const arr = res.data.data
        this.tabs[id].results.errorLogs = ''

        arr.forEach(data => {
          this.tabs[id].results.errorLogs += `[${helpers.timestampToTime(
            data.timestamp
          )}] ${data.message}\n`
        })
      }).catch(error => {
        notifier.error(`[${error.response.status}]: ${error.response.statusText}`)
      })
    },
    currentCandlesEvent (id, data) {
      this.tabs[id].results.currentCandles = data
    },
    watchlistEvent (id, data) {
      this.tabs[id].results.watchlist = data
    },
    positionsEvent (id, data) {
      // sample
      // {
      // currency: "USDT"
      // current_price: 42151
      // entry: 42116
      // leverage: 2
      // liquidation_price: null
      // opened_at: 1644830823000
      // pnl: 5.460000000000036
      // pnl_perc: 0.1662076170576514
      // qty: 0.156
      // strategy_name: "TestLiveMode01"
      // symbol: "BTC-USDT"
      // type: "long"
      // value: 6575.556
      // }

      this.tabs[id].results.positions = [
        [
          'Symbol', 'QTY', 'Entry', 'Price', 'Liq Price', 'PNL'
        ]
      ]

      for (const item of data) {
        const qty = item.type === 'close' ? '' : item.qty
        this.tabs[id].results.positions.push([
          { value: item.symbol, style: '' },
          { value: qty, style: helpers.colorBasedOnType(item.type), tooltip: `${item.value} ${item.currency}` },
          { value: helpers.roundPrice(item.entry), style: '' },
          { value: helpers.roundPrice(item.current_price), style: '' },
          { value: helpers.roundPrice(item.liquidation_price), style: '' },
          { value: `${_.round(item.pnl, 2)} (${_.round(item.pnl_perc, 2)}%)`, style: helpers.colorBasedOnNumber(item.pnl) },
        ])
      }
    },
    ordersEvent (id, data) {
      // sample
      // [
      //   {
      //     canceled_at: null
      //     created_at: 1646753299000
      //     exchange_id: "9803ddb2-21f6-42bb-92c4-702dd04d0f97"
      //     executed_at: null
      //     filled_qty: 0
      //     id: "61b21def-b22a-4ec4-aa03-ae17786c0d43"
      //     price: 38838
      //     qty: 0.311
      //     session_id: null
      //     side: "sell"
      //     status: "CANCELED"
      //     symbol: "BTC-USDT"
      //     type: "LIMIT"
      //   },
      // ]

      this.tabs[id].results.orders = data
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
        ['Ratio Avg Win / Avg Loss', _.round(data.ratio_avg_win_loss, 2)],
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
    },
    unexpectedTerminationEvent (id, data) {
      this.tabs[id].results.finished = true
    },
    terminationEvent (id) {
      if (!this.tabs[id].results.finished) {
        this.tabs[id].results.finished = true
        this.tabs[id].results.terminating = false
        notifier.success('Session terminated successfully')
      }
    }
  }
})
