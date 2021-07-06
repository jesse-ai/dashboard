<template>
  <div class="relative">
    <div ref="chart"/>

    <EquityCurveTooltip :settings="tooltipSettings"/>
  </div>
</template>

<script>
import { createChart } from 'lightweight-charts'
import { find } from 'lodash'

const getDefaultTooltipState = () => {
  return {
    data: {
      closed_at: null,
      PNL_percentage: null,
      holding_period: null,
      type: null,
      symbol: null,
      strategy_name: null,
      exchange: null,
      orders: null
    },
    height: 110,
    width: 135,
    margin: 15,
    left: null,
    top: null
  }
}

let chart = null
let lineSeries = null

export default {
  name: 'TheEquityCurve',
  props: {
    // Line series data
    equityCurve: {
      type: Array,
      required: true,
      default: () => []
    },
    // Tooltip's data
    trades: {
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
          color: '#4f46e5'
        }
      },
      tooltipSettings: getDefaultTooltipState()
    }
  },
  computed: {
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

    chart.subscribeCrosshairMove(this.handleCrosshairMove)
  },
  beforeUnmount () {
    chart.unsubscribeCrosshairMove(this.handleCrosshairMove)
    chart = null
    lineSeries = null
  },
  methods: {
    handleCrosshairMove (param) {
      const el = this.$refs.chart

      if (param.point === undefined || !param.time || param.point.x < 0 || param.point.x > el.clientWidth || param.point.y < 0 || param.point.y > el.clientHeight) {
        // Reset tooltip
        this.tooltipSettings = getDefaultTooltipState()
      } else {
        const tradeItem = find(this.trades, (item) => {
          return item.closed_at / 1000 === param.time
        })

        if (tradeItem !== undefined) {
          this.tooltipSettings.data = {
            closed_at: tradeItem.closed_at,
            PNL_percentage: tradeItem.PNL_percentage,
            holding_period: tradeItem.holding_period,
            type: tradeItem.type,
            symbol: tradeItem.symbol,
            strategy_name: tradeItem.strategy_name,
            exchange: tradeItem.exchange,
            orders: tradeItem.ordersLength
          }

          const price = param.seriesPrices.get(lineSeries)
          const coordinate = lineSeries.priceToCoordinate(price)
          let shiftedCoordinate = param.point.x - this.tooltipSettings.width / 2

          if (!coordinate) {
            return
          }

          const width = this.tooltipSettings.width
          const height = this.tooltipSettings.height
          const margin = this.tooltipSettings.margin

          shiftedCoordinate = Math.max(0, Math.min(el.clientWidth - width, shiftedCoordinate))

          const coordinateY = coordinate - height - margin > 0 ? coordinate - height - margin : Math.max(0, Math.min(el.clientHeight - height - margin, coordinate + margin))

          this.tooltipSettings.left = shiftedCoordinate
          this.tooltipSettings.top = coordinateY
        }
      }
    }
  }
}
</script>

