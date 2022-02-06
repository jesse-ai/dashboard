<template>
  <MultipleValuesTable
    v-if="ordersTable.length"
    :data="ordersTable"
    header />

  <EmptyBox v-else />
</template>

<script>

import MultipleValuesTable from '@/components/MultipleValuesTable'
import EmptyBox from '@/components/EmptyBox'
import helpers from '@/helpers'

export default {
  name: 'LiveOrders',
  components: {
    EmptyBox,
    MultipleValuesTable
  },
  props: {
    orders: {
      type: Array,
      required: true
    },
  },
  computed: {
    ordersTable () {
      if (!this.orders.length) return []

      const arr = [
        ['ID', 'Created', 'Symbol', 'Type', 'Side', 'Price', 'QTY', 'Status']
      ]
      // inverse loop
      for (let i = this.orders.length - 1; i >= 0; i--) {
        const item = this.orders[i]
        arr.push([
          { value: item.id.slice(-12), style: 'text-xs', tooltip: item.id, tag: 'code' },
          { value: helpers.timestampToTimeOnly(item.created_at), style: 'text-xs', tooltip: helpers.timestampToTime(item.created_at) },
          { value: item.symbol, style: 'text-xs' },
          { value: item.type, style: 'text-xs' },
          { value: item.side, style: helpers.colorBasedOnSide(item.side) },
          { value: item.price, style: 'text-xs' },
          { value: item.qty, style: helpers.colorBasedOnSide(item.side) },
          { value: item.status, style: 'text-xs' },
        ])
      }
      return arr
    }
  },
}
</script>
