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

    <div class="flex justify-between items-center">
      <div class="flex items-center select-none">
        <DatePicker/>
        <span class="mx-2">to</span>
        <DatePicker/>
      </div>

      <div>
        <button class="btn-primary text-center mr-4">
          Start
        </button>

        <button class="btn-secondary text-center">
          Start in a new tab
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CircleProgressbar from '@/components/Functional/CircleProgressbar'
import Toggle from '@/components/Functional/Toggle'
import DatePicker from '@/components/Functional/DatePicker'

export default {
  name: 'Backtest',
  components: {
    CircleProgressbar,
    Toggle,
    DatePicker
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

