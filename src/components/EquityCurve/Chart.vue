<template>
  <div class="max-w-xl mx-auto my-5">
    <div ref="chart"/>
  </div>
</template>

<script>
// Simplest possible example of lightweight-charts

import { createChart } from 'lightweight-charts'

export default {
  name: 'Chart',
  components: {},
  data () {
    return {
      chart: null
    }
  },
  computed: {},
  mounted () {
    this.chart = createChart(this.$refs.chart, { width: 400, height: 300 })
    const lineSeries = this.chart.addLineSeries()

    lineSeries.setData([
      { time: '2019-04-11', value: 80.01 },
      { time: '2019-04-12', value: 96.63 },
      { time: '2019-04-13', value: 76.64 },
      { time: '2019-04-14', value: 81.89 },
      { time: '2019-04-15', value: 74.43 },
      { time: '2019-04-16', value: 80.01 },
      { time: '2019-04-17', value: 96.63 },
      { time: '2019-04-18', value: 76.64 },
      { time: '2019-04-19', value: 81.89 },
      { time: '2019-04-20', value: 74.43 },
    ])
  },
  methods: {}
}
</script>

