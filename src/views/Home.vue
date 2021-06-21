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
import store from '../store'

export default {
  name: 'Home',
  components: {
    ThemeSwitch,
    InfoTable,
    InfoLogsTable,
    RecentCandlesTable,
    PositionsTable
  },
  data () {
    return {
    }
  },
  created () {
    console.log('Starting connection to websocket server...')

    this.connection = new WebSocket('ws://127.0.0.1:8000/ws')

    this.connection.onmessage = function (event) {
      // console.log(event)
      // console.log(typeof event.data)
      const msg = JSON.parse(event.data)
      const eventName = msg.event
      const data = msg.data
      // console.log(eventName)
      // console.log(JSON.stringify(msg))

      if (eventName === 'papertrade.positions') {
        store.commit('updatePaperModeData', {
          positions: data
        })
      }
    }

    this.connection.onopen = function (event) {
      console.log('Successfully connected to the echo websocket server...')
    }
  }
}
</script>
