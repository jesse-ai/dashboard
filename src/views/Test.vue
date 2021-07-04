<template>
  <div class="container py-5">
    <h2 class="mb-5">Basic equity curve <small class="text-gray-500">without tooltip</small></h2>

    <TheEquityCurve :equity-curve="equityCurve"/>
  </div>
</template>

<script>
import TheEquityCurve from '@/components/EquityCurve/TheEquityCurve'

export default {
  name: 'Test',
  components: {
    TheEquityCurve
  },
  data () {
    return {
      equityCurve: [{ value: 10000, time: 1612410540 }, { value: 11240.231560725342, time: 1612420320 }, { value: 254369.4912485959, time: 1612602780 }, { value: -489028.803655967, time: 1612663320 }, { value: -484197.7802230198, time: 1612685580 }, { value: -244547.05983960393, time: 1612788420 }, { value: -206530.29565983053, time: 1612817340 }, { value: 1451947.0971254236, time: 1613433600 }]
    }
  },
  computed: {},
  mounted () {
  },
  methods: {}
}
</script>

