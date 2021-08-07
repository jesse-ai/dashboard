<template>
  <Tabs v-if="false" :page-id="pageId" :tabs="tabs" />

  <LiveTab v-if="tabs[pageId]" :form="tabs[pageId].form" :results="tabs[pageId].results" :modals="tabs[pageId].modals" />
</template>

<script>
import { mapWritableState } from 'pinia'
import { useLiveStore } from '@/stores/live'
import LiveTab from '@/views/tabs/LiveTab'
import Tabs from '@/components/Tabs'

export default {
  name: 'Live',
  components: {
    Tabs,
    LiveTab,
  },
  computed: {
    ...mapWritableState(useLiveStore, [
      'tabs'
    ]),
    pageId () {
      return parseInt(this.$route.params.id)
    },
  },
}
</script>

