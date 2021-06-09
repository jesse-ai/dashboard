<template>
  <div class="container my-5 flex justify-between">
    <h1>Dashboard</h1>

    <ThemeSwitch/>
  </div>

  <div class="container">
    <InfoTable class="mb-8"/>

    <InfoLogsTable class="mb-8"/>

    <RecentCandlesTable class="mb-8"/>
  </div>
</template>

<script>
import ThemeSwitch from '@/components/ThemeSwitch'
import InfoTable from '@/components/InfoTable'
import InfoLogsTable from '@/components/InfoLogsTable'
import RecentCandlesTable from '@/components/RecentCandlesTable'

export default {
  name: 'Home',
  components: {
    ThemeSwitch,
    InfoTable,
    InfoLogsTable,
    RecentCandlesTable
  }
}
</script>
