<template>
  <div class="container">
    <h1 class="mb-5">Backtest</h1>

<!--    <CircleProgressbar :progress="20"/>-->

    <br>

    <Toggle class="mb-4"
            title="Debug Mode"
            description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>
    <Toggle class="mb-4"
            title="Export CSV"
            description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>
    <Toggle class="mb-4"
            title="Export JSON"
            description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>
    <Toggle class="mb-4"
            title="Charts"
            description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>
    <Toggle class="mb-4"
            title="Full Metrics Report"
            description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>
    <Toggle class="mb-4"
            title="Export TradingView"
            description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."/>

    <br>
    <br>

    <div class="flex justify-center items-center">
      <button class="btn-primary w-64 h-12 text-center">
        Start
      </button>
    </div>
  </div>
</template>

<script>
import CircleProgressbar from '@/components/Functional/CircleProgressbar'
import Toggle from '@/components/Functional/Toggle'

export default {
  name: 'Backtest',
  components: {
    CircleProgressbar,
    Toggle
  },
  data () {
    return {}
  },
  computed: {},
  mounted () {
  },
  methods: {}
}
</script>

