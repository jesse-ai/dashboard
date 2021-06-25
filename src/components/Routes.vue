<template>
  <div class="my-6 select-none">
    <div class="relative mb-4">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t-2 border-dashed border-gray-300" />
      </div>
      <div class="relative flex items-center justify-between">
        <span class="pr-3 bg-white text-lg font-medium text-gray-900">
          Routes
        </span>
        <button type="button" class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
          <PlusSmIcon class="-ml-1.5 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          <span>Add</span>
        </button>
      </div>
    </div>

    <div v-for="r in routes"
         :key="r.exchange"
         class="flex border rounded-lg mb-4">
      <select id="exchange" name="exchange"
              class="hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-lg">
        <option selected>{{ r.exchange }}</option>
        <option>Canada</option>
        <option>EU</option>
      </select>
      <select id="symbol" name="symbol"
              class="hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        <option selected>BTC-USDT</option>
        <option>Canada</option>
        <option>EU</option>
      </select>
      <select id="timeframe" name="timeframe"
              class="hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        <option selected>1h</option>
        <option>Canada</option>
        <option>EU</option>
      </select>
      <select id="strategy" name="strategy"
              class="hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        <option selected>TrendFollowing01</option>
        <option>Canada</option>
        <option>EU</option>
      </select>

      <div class="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 rounded-r-lg">
        <DotsVerticalIcon class="py-1 pr-1 mx-5 h-8 w-8 text-gray-400" />
      </div>
    </div>
  </div>
</template>


<script>
import { PlusSmIcon, DotsVerticalIcon } from '@heroicons/vue/solid'


export default {
  name: 'Routes',
  components: {
    PlusSmIcon,
    DotsVerticalIcon
  },
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
  },
  data () {
    return {
      routes: [
        {
          exchange: 'Binance',
        },
        {
          exchange: 'Binance Futures',
        }, {
          exchange: 'Binance Futures',
        },
      ]
    }
  }
}
</script>
