<template>
  <Tabs v-if="false" :page-id="pageId" :tabs="tabs" />

  <OptimizationTab v-if="tabs[pageId]" :form="tabs[pageId].form" :results="tabs[pageId].results" :modals="tabs[pageId].modals" />
</template>

<script>

import Tabs from '@/components/Tabs'
import OptimizationTab from '@/views/tabs/OptimizationTab'
import { mapWritableState } from 'pinia'
import { useOptimizationStore } from '@/stores/optimization'

export default {
  name: 'Optimization',
  components: {
    Tabs, OptimizationTab
  },
  computed: {
    ...mapWritableState(useOptimizationStore, [
      'tabs'
    ]),
    pageId () {
      return parseInt(this.$route.params.id)
    },
  },
}
</script>

