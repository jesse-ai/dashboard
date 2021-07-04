<template>
  <div class="relative">
    <div ref="chart"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createChart } from 'lightweight-charts'

export default {
  name: 'TheEquityCurve',
  components: {
  },
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
      chart: null,
      lineSeries: null,
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
              color: '#d6dcde'
            },
            horzLines: {
              color: '#d6dcde'
            }
          },
          priceScale: {
            borderColor: '#868b8c'
          },
          timeScale: {
            borderColor: '#868b8c',
            timeVisible: true,
            secondsVisible: false
          }
        },
        series: {
          color: '#5a67d8'
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      theme: 'settings/theme'
    })
  },
  mounted () {
    this.settings.width = this.$refs.chart.clientWidth
    this.chart = createChart(this.$refs.chart, this.settings)

    this.lineSeries = this.chart.addLineSeries({
      lineWidth: 1.5
    })

    this.chart.timeScale().fitContent()
    this.lineSeries.setData(this.equityCurve)

    this.chart.applyOptions(this.lightTheme.chart)
    this.lineSeries.applyOptions(this.lightTheme.series)
  },
  methods: {}
}
</script>

