<template>
  <div ref="chart"/>
</template>

<script>
import { createChart } from 'lightweight-charts'

let chart = null
let lineSeries = null

export default {
  name: 'EquityCurve',
  props: {
    // Line series data
    equityCurve: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    return {
      settings: {
        width: 800,
        height: 300,
        priceScale: {
          borderColor: 'rgba(197, 203, 206, 1)'
        },
        timeScale: {
          borderColor: 'rgba(197, 203, 206, 1)',
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
      }
    }
  },
  watch: {
    equityCurve (data) {
      // chart.removeSeries(lineSeries)
      lineSeries.setData(data)
    }
  },
  mounted () {
    this.settings.width = this.$refs.chart.clientWidth
    chart = createChart(this.$refs.chart, this.settings)

    lineSeries = chart.addLineSeries({
      lineWidth: 1.5
    })

    chart.timeScale().fitContent()
    lineSeries.setData(this.equityCurve)

    chart.applyOptions(this.lightTheme.chart)
    lineSeries.applyOptions(this.lightTheme.series)
  },
  beforeUnmount () {
    chart = null
    lineSeries = null
  },
  methods: {}
}
</script>

