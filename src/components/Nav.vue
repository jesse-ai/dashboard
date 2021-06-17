<template>
  <nav class="px-2 space-y-1">
    <router-link
      v-for="item in navigation"
      :key="item.name"
      :to="item.to"
      class="nav-item group flex items-center px-2 py-2 text-sm font-medium rounded-md"
      :exact-active-class="'nav-item-current'">
      {{ item.name }}
    </router-link>
  </nav>
</template>

<script>

const navigation = [
  { name: 'Backtest', to: '/' },
  { name: 'Optimization', to: '/optimization' },
  { name: 'Paper Trade', to: '/paper-trade' },
  { name: 'Live Trade', to: '/live-trade' }
]

export default {
  name: 'NavItems',
  components: {},
  data () {
    return {
      navigation: navigation
    }
  }
}
</script>

<style scoped>
  .nav-item {
    @apply text-indigo-100 hover:bg-indigo-600;
  }
  .nav-item.nav-item-current {
    @apply bg-indigo-800 text-white
  }
</style>
