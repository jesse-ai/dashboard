<template>
  <div class="container py-5">
    <h2 class="mb-5">Equity curve</h2>

    <TheEquityCurve
      :trades="trades"
      :equity-curve="equityCurve"/>
  </div>
</template>

<script>
import TheEquityCurve from '@/components/EquityCurve/TheEquityCurve'
import { equityCurve, trades } from '@/components/EquityCurve/ChartsFakeData'

export default {
  name: 'Test',
  components: {
    TheEquityCurve
  },
  data () {
    return {
      equityCurve: equityCurve,
      trades: trades
    }
  }
}
</script>
