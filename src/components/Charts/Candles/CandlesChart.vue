<template>
  <div ref="chart" class="rounded overflow-hidden border-2 border-gray-100"/>
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
        grid: {
          vertLines: {
            color: '#f1f1f1',
            // visible: false
          },
          horzLines: {
            color: '#f1f1f1',
            // visible: false
          }
        },
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
