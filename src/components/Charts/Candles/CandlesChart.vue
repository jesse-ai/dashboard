<template>
  <div ref="chart" class="rounded overflow-hidden border-2 border-gray-100 dark:border-gray-600"/>
</template>

<script>
import { createChart, CrosshairMode } from 'lightweight-charts'

let chart = null
let candleSeries = null

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
        priceScale: {
          borderColor: 'rgba(197, 203, 206, 0.6)',
          // borderVisible: false
        },
        timeScale: {
          borderColor: 'rgba(197, 203, 206, 0.6)',
          timeVisible: true,
          secondsVisible: false
        }
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
            },
            horzLines: {
              color: '#f1f1f1',
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
              color: '#4B5563',
            },
            horzLines: {
              color: '#4B5563',
            }
          },
          priceScale: {
            borderColor: '#4B5563'
          },
          timeScale: {
            borderColor: '#4B5563',
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
    }
  },
  watch: {
    currentCandles (newValue, oldValue) {
      const firstRoute = this.form.routes[0]
      const key = `${firstRoute.exchange}-${firstRoute.symbol}-${firstRoute.timeframe}`
      this.updateCurrentCandle(newValue[key])
    }
  },
  mounted () {
    this.settings.width = this.$refs.chart.clientWidth

    chart = createChart(this.$refs.chart, this.settings)

    candleSeries = chart.addCandlestickSeries()
    candleSeries.setData(this.candles)

    chart.timeScale().fitContent()

    if (localStorage.theme === 'light') {
      chart.applyOptions(this.lightTheme.chart)
      // lineSeries.applyOptions(this.lightTheme.series)
    } else {
      chart.applyOptions(this.darkTheme.chart)
      // lineSeries.applyOptions(this.darkTheme.series)
    }
  },
  beforeUnmount () {
    chart = null
    candleSeries = null
  },
  methods: {
    updateCurrentCandle (candle) {
      candleSeries.update(candle)
    }
  }
}
</script>
