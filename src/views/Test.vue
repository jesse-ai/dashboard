<template>
  <div class="max-w-6xl w-full mx-auto px-4 py-5">
    <div class="bg-pink-500"/>
    <div/>
    <div/>
    <div/>

    <h1 class="mb-1 font-bold">Charts</h1>

    <h2 class="mb-4">
      Equity curve
    </h2>

    <EquityCurve
      class="mb-8"
      :equity-curve="equityCurve"/>

    <button
      class="btn btn-primary"
      @click="getRandomData">
      Get random data
    </button>
  </div>
</template>

<script>
import { equityCurve0, equityCurve1, equityCurve2, trades, orders, candles } from '@/components/Charts/ChartsFakeData'
import { random } from 'lodash'

export default {
  name: 'Test',
  data () {
    return {
      equityCurve: equityCurve1,
      trades: trades,
      orders: orders,
      candles: candles
    }
  },
  methods: {
    getRandomData () {
      const arrays = [equityCurve0, equityCurve1, equityCurve2]

      this.equityCurve = arrays[random(0, 2)]
    }
  }
}
</script>
