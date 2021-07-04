<template>
  <Tabs :page-id="pageId" :tabs="tabs" />

  <BacktestTab v-if="tabs[pageId]" :form="tabs[pageId].form" :results="tabs[pageId].results" />
</template>

<script>
import { mapWritableState } from 'pinia'
import { useBacktestStore } from '@/stores/backtest'
import BacktestTab from '@/views/tabs/BacktestTab'
import Tabs from '@/components/Tabs'

export default {
  name: 'Backtest',
  components: {
    Tabs,
    BacktestTab,
  },
  computed: {
    ...mapWritableState(useBacktestStore, [
      'tabs'
    ]),
    pageId () {
      return parseInt(this.$route.params.id)
    },
  },
}
</script>

