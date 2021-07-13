<template>
  <div ref="chart"/>
</template>

<script>
import { createChart, CrosshairMode } from 'lightweight-charts'

let chart = null
let candleSeries = null

export default {
  name: 'CandlesChart',
  components: {},
  props: {
    candles: {
      type: Array,
      default: () => [],
      required: true
    },
    orders: {
      type: Array,
      default: () => [],
      required: true
    }
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
            color: 'rgba(42, 46, 57, 0.6)',
            visible: false
          },
          horzLines: {
            color: 'rgba(42, 46, 57, 0.6)',
            visible: false
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
  computed: {},
  mounted () {
    this.settings.width = this.$refs.chart.clientWidth

    chart = createChart(this.$refs.chart, this.settings)

    candleSeries = chart.addCandlestickSeries()
    candleSeries.setData(this.candles)

    chart.timeScale().fitContent()

    candleSeries.setMarkers(this.orders)
  },
  beforeUnmount () {
    chart = null
    candleSeries = null
  }
}
</script>
