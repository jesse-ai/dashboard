<template>
  <div ref="chart" class="rounded overflow-hidden border-2 border-gray-100 dark:border-gray-600"/>
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
            borderColor: '#6B7280'
          },
          timeScale: {
            borderColor: '#6B7280',
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

    if (localStorage.theme === 'light') {
      chart.applyOptions(this.lightTheme.chart)
      lineSeries.applyOptions(this.lightTheme.series)
    } else {
      chart.applyOptions(this.darkTheme.chart)
      lineSeries.applyOptions(this.darkTheme.series)
    }
  },
  beforeUnmount () {
    chart = null
    lineSeries = null
  },
  methods: {
    checkTheme () {
      if (localStorage.theme === 'light') {
        chart.applyOptions(this.lightTheme.chart)
        lineSeries.applyOptions(this.lightTheme.series)
      } else {
        chart.applyOptions(this.darkTheme.chart)
        lineSeries.applyOptions(this.darkTheme.series)
      }
    }
  }
}
</script>

