<template>
  <div class="max-w-6xl w-full mx-auto px-4 py-5">
    <h1 class="mb-1 font-bold">Charts</h1>

    <h2 class="mb-4">
      Equity curve
    </h2>

    <TheEquityCurve
      class="mb-8"
      :trades="trades"
      :equity-curve="equityCurve"/>

    <h2 class="mb-4">
      Candles
    </h2>

    <TheCandles
      :candles="candles"
      :orders="orders"/>
  </div>
</template>

<script>
import { equityCurve, trades, orders, candles } from '@/components/Charts/ChartsFakeData'

export default {
  name: 'Test',
  data () {
    return {
      equityCurve: equityCurve,
      trades: trades,
      orders: orders,
      candles: candles
    }
  }
}
</script>
