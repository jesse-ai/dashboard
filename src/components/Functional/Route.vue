<template>
  <div class="flex border rounded-lg select-none">
    <select id="exchange" name="exchange"
            class="cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-lg">
      <option selected>Binance</option>
      <option>Canada</option>
      <option>EU</option>
    </select>
    <select id="symbol" name="symbol"
            class="cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
      <option selected>BTC-USDT</option>
      <option>Canada</option>
      <option>EU</option>
    </select>
    <select id="timeframe" name="timeframe"
            class="cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
      <option selected>1h</option>
      <option>Canada</option>
      <option>EU</option>
    </select>
    <select id="strategy" name="strategy"
            class="cursor-pointer w-full pl-3 pr-10 py-6 border-0 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-lg">
      <option selected>TrendFollowing01</option>
      <option>Canada</option>
      <option>EU</option>
    </select>
  </div>
</template>


<script>
export default {
  name: 'Route',
  props: {
    exchanges: {
      type: Array,
      required: true
    },
    symbols: {
      type: Array,
      required: true
    },
    timeframes: {
      type: Array,
      required: true
    },
    strategies: {
      type: Array,
      required: true
    },
  }
}
</script>
