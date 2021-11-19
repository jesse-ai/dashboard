<template>
  <div ref="chart" class="rounded overflow-hidden border-2 border-gray-100 dark:border-gray-600"/>
</template>

<script>
import { createChart, CrosshairMode } from 'lightweight-charts'
import { useMainStore } from '@/stores/main'
import { mapWritableState } from 'pinia'

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
      lines: {},
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
      return this.results.positions[1][3].value
    },
    positionType () {
      if (this.results.positions[1][2].value > 0) return 'long'
      if (this.results.positions[1][2].value < 0) return 'short'
      return 'close'
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
    }
  },
  mounted () {
    this.settings.width = this.$refs.chart.clientWidth

    this.chart = createChart(this.$refs.chart, this.settings)

    this.candleSeries = this.chart.addCandlestickSeries()
    this.candleSeries.setData(this.candles)

    this.chart.timeScale().fitContent()

    if (localStorage.theme === 'light') {
      this.chart.applyOptions(this.lightTheme.chart)
    } else {
      this.chart.applyOptions(this.darkTheme.chart)
    }

    this.updatePositionEntry()
  },
  beforeUnmount () {
    this.chart = null
    this.candleSeries = null
  },
  methods: {
    updatePositionEntry () {
      const color = this.positionType === 'long' ? '#00AB5C' : '#FF497D'

      if (this.positionEntry > 0) {
        console.log('open:', this.positionEntry)
        const entryPrice = {
          price: this.positionEntry,
          color: color,
          lineWidth: 1.5,
          lineStyle: 0,
          axisLabelVisible: true,
          title: 'Entry Price',
        }
        this.lines.positionEntry = this.candleSeries.createPriceLine(entryPrice)
      } else {
        console.log('close:', this.positionEntry)
        if (this.lines.positionEntry) {
          console.log('remove!', this.lines.positionEntry)
          this.candleSeries.removePriceLine(this.lines.positionEntry)
          this.lines.positionEntry = null
        }
      }
    },
    updateCurrentCandle (candle) {
      if (candle === undefined) {
        throw new TypeError('candle is undefined!')
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
