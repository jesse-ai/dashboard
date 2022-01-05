<template>
  <div id="make-strategy-modal" class="w-full select-none">
    <KeyValueTable :data="tableData"/>

    <div class="flex justify-end mt-8">
      <button data-cy="cancel-make-strategy-button" class="btn-link mr-8" @click="modals.about = false">
        Close
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useMainStore } from '@/stores/main'
import KeyValueTable from '@/components/KeyValueTable'

export default {
  name: 'About',
  components: {
    KeyValueTable
  },
  computed: {
    ...mapState(useMainStore, ['modals', 'systemInfo']),
    tableData () {
      return Object.entries(this.systemInfo).map(([key, value]) => [key, value])
    }
  },
}
</script>
