<template>
  <div>
    <InfoTable class="mb-5"/>

    <InfoLogsTable/>
  </div>
</template>

<script>

import InfoTable from '@/components/Tables/InfoTable'
import InfoLogsTable from '@/components/Tables/InfoLogsTable'

export default {
  name: 'Test',
  components: {
    InfoTable,
    InfoLogsTable
  },
  data () {
    return {}
  },
  computed: {},
  mounted () {
  },
  methods: {}
}
</script>

