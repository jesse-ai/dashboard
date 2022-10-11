<template>
  <div class="select-none">
    <DividerWithButtons title="Routes">
      <button data-cy="add-route" type="button"
              class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 dark:border-gray-900 text-sm leading-5 font-medium rounded-l-full text-gray-700 dark:text-gray-100 bg-white dark:bg-backdrop-dark hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
              @click="addRoute">
        <PlusSmIcon class="-ml-1.5 mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
        <span>Trading Route</span>
      </button>
      <button data-cy="add-extra-route" type="button" class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 dark:border-gray-900 text-sm leading-5 font-medium rounded-r-full text-gray-700 dark:text-gray-100 bg-white dark:bg-backdrop-dark hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
              @click="addExtraRoute">
        <PlusSmIcon class="-ml-1.5 mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
        <span>Extra Route</span>
      </button>
    </DividerWithButtons>

    <!--
     ================================
      Trading Routes
     ================================
    -->
    <div v-for="(r, i) in form.routes"
         :key="r.exchange + i"
         :data-cy="'trading-route' + i"
         class="flex border dark:bg-backdrop-dark dark:border-gray-900 rounded-lg mb-4">
      <!-- exchange -->

      <select v-model="r.exchange" :data-cy="'trading-route-exchange' + i"
              class="dark:bg-backdrop-dark dark:border-gray-900 dark:hover:bg-gray-700 hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500  rounded-l-lg">
        <option v-for="item in exchanges" :key="item.name" :disabled="!allowedToTradeIn(item.name)">{{ item.name }} {{ allowedToTradeIn(item.name) ? '' : ' (premium only)' }}</option>
      </select>

      <!-- symbol -->
      <input v-model="r.symbol"
             :data-cy="'trading-route-symbol' + i"
             type="text"
             class="dark:bg-backdrop-dark dark:border-gray-900 dark:hover:bg-gray-700 hover:bg-gray-50 w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 "
             placeholder="ex: BTC-USDT"
      >

      <!-- timeframe -->
      <select v-model="r.timeframe"
              :data-cy="'trading-route-timeframe' + i"
              class="dark:bg-backdrop-dark dark:border-gray-900 dark:hover:bg-gray-700 hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 ">
        <option v-for="item in getSupportedTimeframes(r.exchange)" :key="item">{{ item }}</option>
      </select>

      <select v-model="r.strategy"
              :data-cy="'trading-route-strategy' + i"
              class="dark:bg-backdrop-dark dark:border-gray-900 dark:hover:bg-gray-700 hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 ">
        <option v-for="item in strategies" :key="item">{{ item }}</option>
      </select>

      <!-- More Button -->
      <div class="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-lg">
        <Menu as="div" class="relative block h-full w-full">
          <MenuButton :data-cy="'trading-route-menu-button' + i" class="px-5 block text-left h-full w-full focus:outline-none">
            <DotsVerticalIcon class="h-8 w-8 text-gray-400" />
          </MenuButton>

          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-backdrop-dark z-10 ring-1 ring-black dark:ring-gray-900 ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-900 focus:outline-none">
              <div class="py-1">
                <MenuItem @click="deleteRoute(r)">
                  <a :name="'trading-delete-menu' + i" :class="[(form.routes.length > 1) ? 'dark:hover:bg-gray-700' : 'text-gray-200 dark:text-gray-600 cursor-not-allowed', 'group flex items-center px-4 py-2 text-sm']">
                    <TrashIcon :class="[(form.routes.length > 1) ? 'text-gray-400 group-hover:text-gray-500' : 'text-gray-200 group-hover:text-gray-200 dark:text-gray-600 dark:group-hover:text-gray-600' ,'mr-3 h-5 w-5']" aria-hidden="true" />
                    Delete
                  </a>
                </MenuItem>
                <MenuItem v-slot="{ active }" @click="duplicateRoutes(r)">
                  <a :name="'trading-duplicate-menu' + i" :class="[active ? 'bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300', 'group flex items-center px-4 py-2 text-sm']">
                    <DuplicateIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    Duplicate
                  </a>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem @click="moveUpRoutes(r)">
                  <a :name="'trading-moveup-menu' + i" :class="[form.routes.indexOf(r) !== 0 ? 'dark:hover:bg-gray-700' : 'text-gray-200 dark:text-gray-600 cursor-not-allowed', 'group flex items-center px-4 py-2 text-sm']">
                    <ArrowCircleUpIcon :class="[form.routes.indexOf(r) !== 0 ? 'text-gray-400 group-hover:text-gray-500' : 'text-gray-200 group-hover:text-gray-200 dark:text-gray-600 dark:group-hover:text-gray-600' ,'mr-3 h-5 w-5']" aria-hidden="true" />
                    Move Up
                  </a>
                </MenuItem>
                <MenuItem @click="moveDownRoutes(r)">
                  <a :name="'trading-movedown-menu' + i" :class="[form.routes.indexOf(r) !== (form.routes.length - 1) ? 'dark:hover:bg-gray-700' : 'text-gray-200 dark:text-gray-600 cursor-not-allowed', 'group flex items-center px-4 py-2 text-sm']">
                    <ArrowCircleDownIcon :class="[form.routes.indexOf(r) !== (form.routes.length - 1) ? 'text-gray-400 group-hover:text-gray-500' : 'text-gray-200 group-hover:text-gray-200 dark:text-gray-600 dark:group-hover:text-gray-600' ,'mr-3 h-5 w-5']" aria-hidden="true" />
                    Move Down
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>

    <!--
     ================================
      Extra Routes
     ================================
    -->
    <Divider v-if="form.extra_routes.length" title="Extra Routes" />

    <div v-for="(r, i) in form.extra_routes"
         :key="r.exchange + i + r.timeframe"
         :data-cy="'extra-route' + i"
         class="flex border dark:bg-backdrop-dark dark:border-gray-900 rounded-lg mb-4">
      <!-- exchange -->
      <select v-model="r.exchange" :data-cy="'extra-route-exchange' + i"
              class="dark:bg-backdrop-dark dark:hover:bg-gray-700 hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 dark:border-gray-900 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500  rounded-l-lg">
        <option v-for="item in exchanges" :key="item.name" :disabled="!allowedToTradeIn(item.name)">{{ item.name }} {{ allowedToTradeIn(item.name) ? '' : ' (premium only)' }}</option>
      </select>

      <!-- symbol -->
      <input v-model="r.symbol"
             :data-cy="'extra-route-symbol' + i"
             type="text"
             class="dark:bg-backdrop-dark dark:hover:bg-gray-700 hover:bg-gray-50 w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 dark:border-gray-900 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 "
             placeholder="ex: BTC-USDT"
      >

      <!-- timeframe -->
      <select v-model="r.timeframe"
              :data-cy="'extra-route-timeframe' + i"
              class="dark:bg-backdrop-dark dark:hover:bg-gray-700 hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 dark:border-gray-900 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 ">
        <option v-for="item in getSupportedTimeframes(r.exchange)" :key="item">{{ item }}</option>
      </select>

      <!-- More Button -->
      <div class="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-lg">
        <Menu as="div" class="relative block h-full w-full">
          <MenuButton :data-cy="'extra-route-menu-button' + i" class="px-5 block text-left h-full w-full focus:outline-none">
            <DotsVerticalIcon class="h-8 w-8 text-gray-400"/>
          </MenuButton>

          <transition enter-active-class="transition ease-out duration-100"
                      enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems
              class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-backdrop-dark dark:border-gray-900 z-10 ring-1 ring-black dark:ring-gray-900 ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-900 focus:outline-none">
              <div class="py-1">
                <MenuItem @click="deleteExtraRoute(r)">
                  <a :name="'extra-delete-menu' + i" class="dark:hover:bg-gray-700 group flex items-center px-4 py-2 text-sm">
                    <TrashIcon class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" aria-hidden="true" />
                    Delete
                  </a>
                </MenuItem>
                <MenuItem v-slot="{ active }" @click="duplicateExtraRoutes(r)">
                  <a
                    :name="'extra-duplicate-menu' + i"
                    :class="[active ? 'bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300', 'group flex items-center px-4 py-2 text-sm']">
                    <DuplicateIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true"/>
                    Duplicate
                  </a>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem @click="moveUpExtraRoutes(r)">
                  <a :name="'extra-moveup-menu' + i" :class="[form.extra_routes.indexOf(r) !== 0 ? 'dark:hover:bg-gray-700' : 'text-gray-200 dark:text-gray-600 cursor-not-allowed', 'group flex items-center px-4 py-2 text-sm']">
                    <ArrowCircleUpIcon :class="[form.extra_routes.indexOf(r) !== 0 ? 'text-gray-400 group-hover:text-gray-500' : 'text-gray-200 group-hover:text-gray-200 dark:text-gray-600 dark:group-hover:text-gray-600' ,'mr-3 h-5 w-5']" aria-hidden="true" />
                    Move Up
                  </a>
                </MenuItem>
                <MenuItem @click="moveDownExtraRoutes(r)">
                  <a :name="'extra-movedown-menu' + i" :class="[form.extra_routes.indexOf(r) !== (form.extra_routes.length - 1) ? 'dark:hover:bg-gray-700' : 'text-gray-200 dark:text-gray-600 cursor-not-allowed', 'group flex items-center px-4 py-2 text-sm']">
                    <ArrowCircleDownIcon :class="[form.extra_routes.indexOf(r) !== (form.extra_routes.length - 1) ? 'text-gray-400 group-hover:text-gray-500' : 'text-gray-200 group-hover:text-gray-200 dark:text-gray-600 dark:group-hover:text-gray-600' ,'mr-3 h-5 w-5']" aria-hidden="true" />
                    Move Down
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>

    <!-- error section -->
    <div id="error-section" class="text-sm text-red-400 p-2 rounded-lg mb-4" >
      <div v-for="(item, i) in totalRoutesError" :key="i" class="flex justify-start items-center mb-2">
        <ExclamationIcon class="-ml-1.5 mr-1 h-5 w-5"/>

        <div :data-cy="'error' + i" v-html="item" />
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
  ArrowCircleDownIcon,
  ExclamationIcon
} from '@heroicons/vue/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import Divider from '@/components/Divider'
import { mapState } from 'pinia'
import { useMainStore } from '@/stores/main'
import DividerWithButtons from '@/components/DividerWithButtons'

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
    ArrowCircleDownIcon,
    DividerWithButtons,
    ExclamationIcon
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
      copiedExtraRoutes: { extra_routes: this.form.extra_routes },
      copiedRoutes: { routes: this.form.routes },
      totalRoutesError: [],
    }
  },
  computed: {
    ...mapState(useMainStore, ['routes', 'jesseSupportedTimeframes', 'exchangeInfo', 'settings', 'strategies', 'planInfo']),
    isLive () {
      return this.$route.name === 'Live'
    },
    exchanges () {
      const arr = []

      for (const key in this.exchangeInfo) {
        if (this.isLive) {
          if (this.exchangeInfo[key].modes.live_trading) {
            arr.push(this.exchangeInfo[key])
          }
        } else {
          if (this.exchangeInfo[key].modes.backtesting) {
            arr.push(this.exchangeInfo[key])
          }
        }
      }

      // sort by item.name alphabetically, however,
      // if item.name starts with "Bitget", put it first
      arr.sort((a, b) => {
        if (a.name.startsWith('Bitget')) {
          return -1
        } else if (b.name.startsWith('Bitget')) {
          return 1
        } else {
          return a.name.localeCompare(b.name)
        }
      })

      return arr
    }
  },
  watch: {
    form () {
      this.initiate()
    },
    copiedRoutes: {
      handler () {
        this.checkRoutes()
      },
      deep: true
    },
    copiedExtraRoutes: {
      handler () {
        this.checkRoutes()
      },
      deep: true
    }
  },
  created () {
    this.initiate()
  },
  methods: {
    allowedToTradeIn (exchangeName) {
      // can trade everywhere if it's not for live mode
      if (!this.isLive) return true

      // premium plans can trade everywhere
      if (this.planInfo.plan === 'premium') {
        return true
      }

      // otherwise, can trade if "required_live_plan" property of the exchange is "free"
      return this.exchangeInfo[exchangeName].required_live_plan === 'free'
    },
    checkRoutes () {
      this.totalRoutesError = []
      const symbolErrors = []

      const ERRORS = {
        uniqueRoutesErrorMessage: 'each exchange-symbol pair can be traded only once! <br> More info: https://docs.jesse.trade/docs/routes.html#trading-multiple-routes',
        maxSymbolLengthErrorMessage: 'Maximum symbol length is exceeded!',
        mustContainDashErrorMessage: 'Symbol parameter must contain "-" character!',
        timeframeMustBeDifferentErrorMessage: 'Extra routes timeframe and routes timeframe must be different',
      }

      if (this.form.extra_routes.length > 0) {
        for (const item of this.form.extra_routes) {
          if (!symbolErrors.includes(ERRORS.maxSymbolLengthErrorMessage) && item.symbol.length > 9) {
            symbolErrors.push(ERRORS.maxSymbolLengthErrorMessage)
          }

          if (!symbolErrors.includes(ERRORS.mustContainDashErrorMessage) && item.symbol.length >= 5) {
            let checkDash = false
            for (const item1 of item.symbol.substring(3, 5)) {
              if (item1 === '-') {
                checkDash = true
              }
            }
            if (!checkDash) {
              symbolErrors.push(ERRORS.mustContainDashErrorMessage)
            }
          }
        }
      }

      for (const item of this.form.routes) {
        if (!symbolErrors.includes(ERRORS.maxSymbolLengthErrorMessage) && item.symbol.length > 19) {
          symbolErrors.push(ERRORS.maxSymbolLengthErrorMessage)
        }

        if (!symbolErrors.includes(ERRORS.mustContainDashErrorMessage) && item.symbol.length >= 5) {
          let checkDash = false
          for (const item1 of item.symbol.substring(3, 5)) {
            if (item1 === '-') {
              checkDash = true
            }
          }
          if (!checkDash) {
            symbolErrors.push(ERRORS.mustContainDashErrorMessage)
          }
        }
      }

      const routesError = []
      let checkBreakLoop = false
      const tempRoutes = this.form.routes
      for (const item of tempRoutes.slice(0, -1)) {
        if (routesError.includes(ERRORS.uniqueRoutesErrorMessage)) {
          break
        }
        for (const item1 of tempRoutes.slice(tempRoutes.indexOf(item) + 1,)) {
          if (item.exchange === item1.exchange && item.strategy === item1.strategy && item.symbol === item1.symbol && item.symbol.length !== 0) {
            routesError.push(ERRORS.uniqueRoutesErrorMessage)
            checkBreakLoop = false
            break
          }
        }
        if (checkBreakLoop) {
          break
        }
      }

      let checkBreakExtraLoop = false
      const tempExtraRoutes = this.form.extra_routes
      for (const item of tempExtraRoutes.slice(0, -1)) {
        if (routesError.includes(ERRORS.uniqueRoutesErrorMessage)) {
          break
        }
        for (const item1 of tempExtraRoutes.slice(tempExtraRoutes.indexOf(item) + 1,)) {
          if (item.exchange === item1.exchange && item.timeframe === item1.timeframe && item.symbol === item1.symbol && item.symbol.length !== 0) {
            routesError.push(ERRORS.uniqueRoutesErrorMessage)
            checkBreakExtraLoop = true
            break
          }
        }
        if (checkBreakExtraLoop) {
          break
        }
      }

      checkBreakExtraLoop = false
      if (this.form.extra_routes.length > 0) {
        for (const item of tempExtraRoutes) {
          if (routesError.includes(ERRORS.timeframeMustBeDifferentErrorMessage)) {
            break
          }
          for (const item1 of this.form.routes) {
            if (item.exchange === item1.exchange && item.symbol === item1.symbol && item.timeframe === item1.timeframe && item.symbol.length !== 0) {
              routesError.push(ERRORS.timeframeMustBeDifferentErrorMessage)
              checkBreakExtraLoop = true
              break
            }
          }
          if (checkBreakLoop) {
            break
          }
        }
      }

      for (const item of symbolErrors) {
        this.totalRoutesError.push(item)
      }
      for (const item of routesError) {
        this.totalRoutesError.push(item)
      }
    },
    initiate () {
      // if already loaded, return
      if (this.form.routes.length) {
        return
      }

      // else, fill it with sample data
      this.form.routes.push({
        exchange: this.exchanges[0].name,
        symbol: 'BTC-USDT',
        timeframe: this.jesseSupportedTimeframes[0],
        strategy: this.strategies[0]
      })
    },
    addRoute () {
      // duplicate the last one
      this.form.routes.push({
        exchange: this.form.routes[this.form.routes.length - 1].exchange,
        symbol: '',
        timeframe: this.jesseSupportedTimeframes[0],
        strategy: this.strategies[0]
      })
    },
    addExtraRoute () {
      // duplicate the last one
      this.form.extra_routes.push({
        exchange: this.form.routes[this.form.routes.length - 1].exchange,
        symbol: '',
        timeframe: this.jesseSupportedTimeframes[0]
      })
    },
    deleteRoute (item) {
      const index = this.form.routes.indexOf(item)
      if ((this.form.routes.length !== 1) && index > -1) {
        this.form.routes.splice(index, 1)
      }
    },
    deleteExtraRoute (item) {
      const index = this.form.extra_routes.indexOf(item)
      if ((this.form.extra_routes.length !== 0) && index > -1) {
        this.form.extra_routes.splice(index, 1)
      }
    },
    duplicateRoutes (item) {
      const itemIndex = this.form.routes.indexOf(item)
      const newItem = {}
      newItem.exchange = item.exchange
      newItem.strategy = item.strategy
      newItem.symbol = ''
      newItem.timeframe = item.timeframe
      this.form.routes.splice(itemIndex + 1, 0, newItem)
    },
    duplicateExtraRoutes (item) {
      const itemIndex = this.form.extra_routes.indexOf(item)
      const newItem = {}
      newItem.exchange = item.exchange
      newItem.strategy = item.strategy
      newItem.symbol = ''
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
    },
    getSupportedTimeframes (exchange) {
      // if exchange is not selected, return empty array
      if (!exchange) {
        return []
      }

      // if not live, return jesseSupportedTimeframes
      if (this.$route.name !== 'Live') {
        return this.jesseSupportedTimeframes
      }

      // if settings.live.generate_candles_from_1m is true, return this.jesseSupportedTimeframes
      if (this.settings.live.generate_candles_from_1m) {
        return this.jesseSupportedTimeframes
      }

      // if the this.exchangeInfo does not include exchange, return empty array
      if (!this.exchangeInfo[exchange]) {
        return []
      }

      // if it does, return the supported timeframes
      return this.exchangeInfo[exchange].supported_timeframes
    },
  }
}
</script>
