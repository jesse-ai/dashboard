<template>
  <div class="container my-5 flex justify-between">
    <h1>Dashboard</h1>

    <ThemeSwitch/>
  </div>

  <div class="container mb-8">
    <InfoTable class="mb-8"/>

    <InfoLogsTable/>
  </div>
</template>

<script>
import ThemeSwitch from '@/components/ThemeSwitch'
import InfoTable from '@/components/InfoTable'
import InfoLogsTable from '@/components/InfoLogsTable'

export default {
  name: 'Home',
  components: {
    ThemeSwitch,
    InfoTable,
    InfoLogsTable
  }
}
</script>
