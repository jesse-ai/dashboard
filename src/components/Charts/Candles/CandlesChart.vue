<template>
  <div ref="chart" class="rounded overflow-hidden border-2 border-gray-100 dark:border-gray-600"/>
</template>

<script>
import { createChart, CrosshairMode } from 'lightweight-charts'
import { useMainStore } from '@/stores/main'
import { mapWritableState } from 'pinia'
import _ from 'lodash'

export default {
  name: 'CandlesChart',
  components: {},
  props: {
    form: {
      type: Object,
      required: true
    },
    results: {
      type: Object,
      required: true
    },
    candles: {
      type: Array,
      required: true
    },
  },
  data () {
    return {
      chart: null,
      candleSeries: null,
      lines: {
        orderEntries: {}
      },
      settings: {
        width: 800,
        height: 380,
        // layout: {
        //   backgroundColor: '#131722',
        //   textColor: '#d1d4dc'
        // },
        crosshair: {
          mode: CrosshairMode.Normal
        },
      },
      lightTheme: {
        chart: {
          layout: {
            backgroundColor: '#ffffff',
            textColor: 'rgba(33, 56, 77, 1)'
          },
          grid: {
            vertLines: {
              color: '#f1f1f1',
              visible: false,
            },
            horzLines: {
              color: '#f1f1f1',
              visible: false,
            }
          },
          priceScale: {
            borderColor: 'rgba(197, 203, 206, 0.6)'
          },
          timeScale: {
            borderColor: 'rgba(197, 203, 206, 0.6)',
            timeVisible: true,
            secondsVisible: false
          }
        },
        series: {
          color: '#4f46e5'
        }
      },
      darkTheme: {
        chart: {
          layout: {
            backgroundColor: '#333333',
            textColor: '#D1D5DB'
          },
          grid: {
            vertLines: {
              color: '#525252',
              visible: false
            },
            horzLines: {
              color: '#525252',
              visible: false
            }
          },
          priceScale: {
            borderColor: '#525252'
          },
          timeScale: {
            borderColor: '#525252',
            timeVisible: true,
            secondsVisible: false
          }
        },
        series: {
          color: '#818CF8'
        }
      }
    }
  },
  computed: {
    currentCandles () {
      return this.results.currentCandles
    },
    ...mapWritableState(useMainStore, [
      'theme'
    ]),
    positionEntry () {
      return this.results.positions[1][2].value
    },
    positionType () {
      if (this.results.positions[1][1].value > 0) return 'long'
      if (this.results.positions[1][1].value < 0) return 'short'
      return 'close'
    },
    firstPosition () {
      return this.results.positions[1]
    },
  },
  watch: {
    currentCandles (newValue, oldValue) {
      const firstRoute = this.form.routes[0]
      const key = `${firstRoute.exchange}-${firstRoute.symbol}-${firstRoute.timeframe}`
      this.updateCurrentCandle(newValue[key])
    },
    theme (newVal) {
      this.checkTheme(newVal)
    },
    positionEntry (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.updatePositionEntry()
      }
    },
    // watch 'results.rawOrders' and its in object values and execute this.updateOrderEntries()
    // when the value changes
    'results.orders': {
      handler (newValue, oldValue) {
        this.updateOrderEntries()
      },
      deep: true
    }
  },
  mounted () {
    this.settings.width = this.$refs.chart.clientWidth

    this.chart = createChart(this.$refs.chart, this.settings)

    this.candleSeries = this.chart.addCandlestickSeries()
    this.candleSeries.setData(this.candles)

    this.chart.timeScale().fitContent()

    if (this.theme === 'light') {
      this.chart.applyOptions(this.lightTheme.chart)
    } else {
      this.chart.applyOptions(this.darkTheme.chart)
    }

    this.updatePositionEntry()
    this.updateOrderEntries()
  },
  beforeUnmount () {
    this.chart = null
    this.candleSeries = null
  },
  methods: {
    updatePositionEntry () {
      const color = this.positionType === 'long' ? '#00AB5C' : '#FF497D'

      // first remove price line
      if (this.lines.positionEntry) {
        this.candleSeries.removePriceLine(this.lines.positionEntry)
      }

      // then add a new price line
      if (this.positionEntry > 0) {
        const entryPrice = {
          price: this.positionEntry,
          color: color,
          lineWidth: 1.5,
          lineStyle: 0,
          axisLabelVisible: true,
          title: 'Entry Price',
        }
        this.lines.positionEntry = this.candleSeries.createPriceLine(entryPrice)
      }
    },
    updateOrderEntries () {
      const PositionSymbol = this.firstPosition[0].value

      // remove all previous lines for orders
      for (const key in this.lines.orderEntries) {
        this.candleSeries.removePriceLine(this.lines.orderEntries[key])
        delete this.lines.orderEntries[key]
      }

      // then add them again if needed
      this.results.orders.forEach(order => {
        const color = order.side === 'buy' ? '#00AB5C' : '#FF497D'
        const title = _.startCase(_.lowerCase(`${order.side} ${order.type}`))

        // if order is active or queued and its symbol is the same as the position symbol
        if ((order.status === 'ACTIVE' || order.status === 'QUEUED') && order.symbol === PositionSymbol) {
          const orderPrice = {
            price: order.price,
            color,
            lineWidth: 1,
            lineStyle: 3,
            axisLabelVisible: true,
            title,
          }
          this.lines.orderEntries[order.id] = this.candleSeries.createPriceLine(orderPrice)
        }
      })
    },
    updateCurrentCandle (candle) {
      if (candle === undefined) {
        throw new TypeError('candle is undefined!')
      }

      // make sure this.results.candles array is not empty
      if (this.candles.length === 0) {
        return
      }

      // return if the last existing candle is fresher than candle
      const lastExistingCandle = this.results.candles[this.results.candles.length - 1]
      if (lastExistingCandle.time > candle.time) {
        return
      }

      this.candleSeries.update(candle)
    },
    checkTheme (val) {
      if (val === 'light') {
        this.chart.applyOptions(this.lightTheme.chart)
      } else {
        this.chart.applyOptions(this.darkTheme.chart)
      }
    }
  }
}
</script>
