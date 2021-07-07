<template>
  <Tabs :page-id="pageId" :tabs="tabs" />

  <CandlesTab v-if="tabs[pageId]" :form="tabs[pageId].form" :results="tabs[pageId].results" />
</template>

<script>
import { mapWritableState } from 'pinia'
import { useCandlesStore } from '@/stores/candles'
import CandlesTab from '@/views/tabs/CandlesTab'
import Tabs from '@/components/Tabs'

export default {
  name: 'Candles',
  components: {
    Tabs,
    CandlesTab,
  },
  computed: {
    ...mapWritableState(useCandlesStore, [
      'tabs'
    ]),
    pageId () {
      return parseInt(this.$route.params.id)
    },
  },
}
</script>
