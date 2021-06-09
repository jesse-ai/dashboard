<template>
  <div class="container my-5 flex justify-between">
    <h1>Dashboard</h1>

    <ThemeSwitch/>
  </div>

  <div class="container">
    <h2 class="mb-3 dark:text-primary-dark">Common info table</h2>

    <InfoTable class="mb-8"/>

    <h2 class="mb-3 dark:text-primary-dark">Logs table</h2>

    <InfoLogsTable class="mb-8"/>

    <h2 class="mb-3 dark:text-primary-dark">Recent candles table</h2>

    <RecentCandlesTable class="mb-8"/>

    <h2 class="mb-3 dark:text-primary-dark">Positions table</h2>

    <PositionsTable class="mb-8"/>
  </div>
</template>

<script>
import ThemeSwitch from '@/components/ThemeSwitch'
import InfoTable from '@/components/Tables/InfoTable'
import InfoLogsTable from '@/components/Tables/InfoLogsTable'
import RecentCandlesTable from '@/components/Tables/RecentCandlesTable'
import PositionsTable from '@/components/Tables/PositionsTable'

export default {
  name: 'Home',
  components: {
    ThemeSwitch,
    InfoTable,
    InfoLogsTable,
    RecentCandlesTable,
    PositionsTable
  }
}
</script>
