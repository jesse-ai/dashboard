<template>
  <nav class="px-2 space-y-1">
    <router-link
      v-for="item in navigation"
      :key="item.name"
      :to="item.to"
      class="nav-item hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
      :exact-active-class="'nav-item-current'">
      {{ item.name }}
    </router-link>
  </nav>
</template>

<script>

const navigation = [
  { name: 'Import Candles', to: '/candles' },
  { name: 'Backtest', to: '/backtest' },
  { name: 'Optimization', to: '/optimization' },
  { name: 'Paper Trade', to: '/paper-trade' },
  { name: 'Live Trade', to: '/live-trade' },
  { name: 'Dev Test', to: '/test' },
  { name: 'Pinia Test', to: '/pinia-test' },
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
    @apply text-gray-600 dark:text-gray-300 dark:hover:text-gray-100;
    @apply hover:bg-gray-50 dark:hover:bg-gray-900
  }
  .nav-item.nav-item-current {
    @apply bg-gray-200 dark:bg-backdrop-secondary-dark text-gray-900 dark:text-gray-100
  }
</style>
