<template>
  <div class="container my-5 flex justify-between">
    <h1>Dashboard</h1>

    <ThemeSwitch/>
  </div>

  <div class="container">
    <InfoTable/>
  </div>
</template>

<script>
import ThemeSwitch from '@/components/ThemeSwitch'
import InfoTable from '@/components/InfoTable'

export default {
  name: 'Home',
  components: {
    ThemeSwitch,
    InfoTable
  }
}
</script>
