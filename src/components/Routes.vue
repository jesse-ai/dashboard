<template>
  <div class="select-none">
    <div class="relative mb-4">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t-2 border-dashed border-gray-300 dark:border-gray-600"/>
      </div>

      <!-- Trading Routes-->
      <div class="relative flex items-center justify-between">
        <span class="pr-3 bg-white dark:bg-backdrop-dark text-lg font-medium text-gray-900 dark:text-gray-200">
          Routes
        </span>

        <span>
          <button type="button"
                  class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 dark:border-gray-600 text-sm leading-5 font-medium rounded-l-full text-gray-700 dark:text-gray-100 bg-white dark:bg-backdrop-dark hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none"
                  @click="addRoute">
            <PlusSmIcon class="-ml-1.5 mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
            <span>Trading Route</span>
          </button>
          <button type="button" class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 dark:border-gray-600 text-sm leading-5 font-medium rounded-r-full text-gray-700 dark:text-gray-100 bg-white dark:bg-backdrop-dark hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none"
                  @click="addExtraRoute">
            <PlusSmIcon class="-ml-1.5 mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
            <span>Extra Route</span>
          </button>
        </span>
      </div>
    </div>

    <!-- Trading Routes -->
    <div v-for="r in form.routes"
         :key="r.exchange + r.symbol"
         class="flex border dark:border-gray-600 rounded-lg mb-4">
      <select v-model="r.exchange"
              class="dark:bg-backdrop-dark dark:hover:bg-gray-800 hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-lg">
        <option v-for="item in exchanges" :key="item">{{ item }}</option>
      </select>
      <select v-model="r.symbol"
              class="dark:bg-backdrop-dark dark:hover:bg-gray-800 hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        <option v-for="item in symbols" :key="item">{{ item }}</option>
      </select>
      <select v-model="r.timeframe"
              class="dark:bg-backdrop-dark dark:hover:bg-gray-800 hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        <option v-for="item in timeframes" :key="item">{{ item }}</option>
      </select>
      <select v-model="r.strategy"
              class="dark:bg-backdrop-dark dark:hover:bg-gray-800 hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        <option v-for="item in strategies" :key="item">{{ item }}</option>
      </select>

      <!-- More Button -->
      <div class="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-r-lg">
        <Menu as="div" class="relative block h-full w-full">
          <MenuButton class="px-5 block text-left h-full w-full focus:outline-none">
            <DotsVerticalIcon class="h-8 w-8 text-gray-400" />
          </MenuButton>

          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-backdrop-dark z-10 ring-1 ring-black dark:ring-gray-600 ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-500 focus:outline-none">
              <div class="py-1">
                <MenuItem v-slot="{ active }" @click="deleteRoute(r)">
                  <a :class="[active ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300', 'group flex items-center px-4 py-2 text-sm']">
                    <TrashIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    Delete
                  </a>
                </MenuItem>
                <MenuItem v-slot="{ active }" @click="duplicateRoutes(r)">
                  <a :class="[active ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300', 'group flex items-center px-4 py-2 text-sm']">
                    <DuplicateIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    Duplicate
                  </a>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }" @click="moveUpRoutes(r)">
                  <a :class="[active ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300', 'group flex items-center px-4 py-2 text-sm']">
                    <ArrowCircleUpIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    Move Up
                  </a>
                </MenuItem>
                <MenuItem v-slot="{ active }" @click="moveDownRoutes(r)">
                  <a :class="[active ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300', 'group flex items-center px-4 py-2 text-sm']">
                    <ArrowCircleDownIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    Move Down
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>

    <!-- Extra Routes-->
    <Divider v-if="form.extra_routes.length">Extra Routes</Divider>

    <div v-for="r in form.extra_routes"
         :key="r.exchange + r.symbol + r.timeframe"
         class="flex border dark:border-gray-600 rounded-lg mb-4">
      <select v-model="r.exchange"
              class="dark:bg-backdrop-dark dark:hover:bg-gray-800 hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-l-lg">
        <option v-for="item in exchanges" :key="item">{{ item }}</option>
      </select>
      <select v-model="r.symbol"
              class="dark:bg-backdrop-dark dark:hover:bg-gray-800 hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        <option v-for="item in symbols" :key="item">{{ item }}</option>
      </select>
      <select v-model="r.timeframe"
              class="dark:bg-backdrop-dark dark:hover:bg-gray-800 hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        <option v-for="item in timeframes" :key="item">{{ item }}</option>
      </select>

      <!-- More Button -->
      <div class="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-r-lg">
        <Menu as="div" class="relative block h-full w-full">
          <MenuButton class="px-5 block text-left h-full w-full focus:outline-none">
            <DotsVerticalIcon class="h-8 w-8 text-gray-400"/>
          </MenuButton>

          <transition enter-active-class="transition ease-out duration-100"
                      enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems
              class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-backdrop-dark z-10 ring-1 ring-black dark:ring-gray-500 ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-500 focus:outline-none">
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a :class="[active ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300', 'group flex items-center px-4 py-2 text-sm']"
                     @click="deleteExtraRoute(r)">
                    <TrashIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true"/>
                    Delete
                  </a>
                </MenuItem>
                <MenuItem v-slot="{ active }" @click="duplicateExtraRoutes(r)">
                  <a
                    :class="[active ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300', 'group flex items-center px-4 py-2 text-sm']">
                    <DuplicateIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true"/>
                    Duplicate
                  </a>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }" @click="moveUpExtraRoutes(r)">
                  <a
                    :class="[active ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300', 'group flex items-center px-4 py-2 text-sm']">
                    <ArrowCircleUpIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true"/>
                    Move Up
                  </a>
                </MenuItem>
                <MenuItem v-slot="{ active }" @click="moveDownExtraRoutes(r)">
                  <a
                    :class="[active ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300', 'group flex items-center px-4 py-2 text-sm']">
                    <ArrowCircleDownIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                         aria-hidden="true"/>
                    Move Down
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
</template>

<script>
import {
  PlusSmIcon, DotsVerticalIcon,
  DuplicateIcon,
  TrashIcon,
  ArrowCircleUpIcon,
  ArrowCircleDownIcon
} from '@heroicons/vue/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import Divider from '@/components/Divider'

export default {
  name: 'Routes',
  components: {
    Divider,
    PlusSmIcon,
    DotsVerticalIcon,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    DuplicateIcon,
    TrashIcon,
    ArrowCircleUpIcon,
    ArrowCircleDownIcon
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    results: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // TODO: must be only existing candles?
      exchanges: ['Binance Futures', 'Bitfinex', 'Binance'],
      symbols: ['BTC-USDT', 'ETH-USDT', 'XRP-USDT'],
      timeframes: ['1m', '3m', '5m', '15m', '30m', '45m', '1h', '2h', '3h', '4h', '6h', '8h', '12h', '1D', '3D', '1W'],
      strategies: ['TestLiveMode01'],
    }
  },
  watch: {
    form () {
      this.fillEmptyRoutes()
    }
  },
  created () {
    this.fillEmptyRoutes()
  },

  methods: {
    fillEmptyRoutes () {
      if (this.form.routes.length) return

      this.form.routes.push({
        exchange: this.exchanges[0],
        symbol: this.symbols[0],
        timeframe: this.timeframes[0],
        strategy: this.strategies[0]
      })
    },
    addRoute () {
      // duplicate the last one
      this.form.routes.push({
        exchange: this.form.routes[this.form.routes.length - 1].exchange,
        symbol: this.symbols[0],
        timeframe: this.timeframes[0],
        strategy: this.strategies[0]
      })
    },
    addExtraRoute () {
      // duplicate the last one
      this.form.extra_routes.push({
        exchange: this.form.routes[this.form.routes.length - 1].exchange,
        symbol: this.form.routes[this.form.routes.length - 1].symbol,
        timeframe: this.timeframes[0]
      })
    },
    deleteRoute (item) {
      const index = this.form.routes.indexOf(item)
      if (index > -1) {
        this.form.routes.splice(index, 1)
      }
    },
    deleteExtraRoute (item) {
      const index = this.form.extra_routes.indexOf(item)
      if (index > -1) {
        this.form.extra_routes.splice(index, 1)
      }
    },
    duplicateRoutes (item) {
      const itemIndex = this.form.routes.indexOf(item)
      const newItem = {}
      newItem.exchange = item.exchange
      newItem.strategy = item.strategy
      newItem.symbol = item.symbol
      newItem.timeframe = item.timeframe


      this.form.routes.splice(itemIndex + 1, 0, newItem)
    },
    duplicateExtraRoutes (item) {
      const itemIndex = this.form.extra_routes.indexOf(item)
      const newItem = {}
      newItem.exchange = item.exchange
      newItem.strategy = item.strategy
      newItem.symbol = item.symbol
      newItem.timeframe = item.timeframe


      this.form.extra_routes.splice(itemIndex + 1, 0, newItem)
    },
    moveUpRoutes (item) {
      const itemIndex = this.form.routes.indexOf(item)
      if (itemIndex !== 0) {
        const lastItem = this.form.routes[itemIndex - 1]
        this.form.routes[itemIndex] = lastItem
        this.form.routes[itemIndex - 1] = item
      }
    },
    moveUpExtraRoutes (item) {
      const itemIndex = this.form.extra_routes.indexOf(item)
      if (itemIndex !== 0) {
        const lastItem = this.form.extra_routes[itemIndex - 1]
        this.form.extra_routes[itemIndex] = lastItem
        this.form.extra_routes[itemIndex - 1] = item
      }
    },
    moveDownRoutes (item) {
      const itemIndex = this.form.routes.indexOf(item)
      if (itemIndex !== (this.form.routes.length - 1)) {
        const followingItem = this.form.routes[itemIndex + 1]
        this.form.routes[itemIndex] = followingItem
        this.form.routes[itemIndex + 1] = item
      }
    },
    moveDownExtraRoutes (item) {
      const itemIndex = this.form.extra_routes.indexOf(item)
      if (itemIndex !== (this.form.extra_routes.length - 1)) {
        const followingItem = this.form.extra_routes[itemIndex + 1]
        this.form.extra_routes[itemIndex] = followingItem
        this.form.extra_routes[itemIndex + 1] = item
      }
    }
  }
}
</script>
