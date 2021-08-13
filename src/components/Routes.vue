<template>
  <div class="select-none">
    <DividerWithButtons title="Routes">
      <button type="button"
              class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 dark:border-gray-900 text-sm leading-5 font-medium rounded-l-full text-gray-700 dark:text-gray-100 bg-white dark:bg-backdrop-dark hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
              @click="addRoute">
        <PlusSmIcon class="-ml-1.5 mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
        <span>Trading Route</span>
      </button>
      <button type="button" class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 dark:border-gray-900 text-sm leading-5 font-medium rounded-r-full text-gray-700 dark:text-gray-100 bg-white dark:bg-backdrop-dark hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
              @click="addExtraRoute">
        <PlusSmIcon class="-ml-1.5 mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
        <span>Extra Route</span>
      </button>
    </DividerWithButtons>

    <!-- Trading Routes -->
    <div v-for="(r, i) in form.routes"
         :key="r.exchange + i"
         class="flex border dark:bg-backdrop-dark dark:border-gray-900 rounded-lg mb-4">
      <select v-model="r.exchange"
              class="dark:bg-backdrop-dark dark:border-gray-900 dark:hover:bg-gray-700 hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500  rounded-l-lg">
        <option v-for="item in exchanges" :key="item">{{ item }}</option>
      </select>

      <input v-model="r.symbol"
             type="text"
             class="dark:bg-backdrop-dark dark:border-gray-900 dark:hover:bg-gray-700 hover:bg-gray-50 w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 "
             placeholder="ex: BTC-USDT"
             @input="r.symbol = $event.target.value.toUpperCase()"
      >

      <select v-model="r.timeframe"
              class="dark:bg-backdrop-dark dark:border-gray-900 dark:hover:bg-gray-700 hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 ">
        <option v-for="item in routes.timeframes" :key="item">{{ item }}</option>
      </select>

      <select v-model="r.strategy"
              class="dark:bg-backdrop-dark dark:border-gray-900 dark:hover:bg-gray-700 hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 ">
        <option v-for="item in routes.strategies" :key="item">{{ item }}</option>
      </select>

      <!-- More Button -->
      <div class="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-lg">
        <Menu as="div" class="relative block h-full w-full">
          <MenuButton class="px-5 block text-left h-full w-full focus:outline-none">
            <DotsVerticalIcon class="h-8 w-8 text-gray-400" />
          </MenuButton>

          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-backdrop-dark z-10 ring-1 ring-black dark:ring-gray-600 ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-900 focus:outline-none">
              <div class="py-1">
                <MenuItem @click="deleteRoute(r)">
                  <a :class="[(form.routes.length > 1) ? 'dark:hover:bg-gray-700' : 'text-gray-200 dark:text-gray-600 cursor-not-allowed', 'group flex items-center px-4 py-2 text-sm']">
                    <TrashIcon :class="[(form.routes.length > 1) ? 'text-gray-400 group-hover:text-gray-500' : 'text-gray-200 group-hover:text-gray-200 dark:text-gray-600 dark:group-hover:text-gray-600' ,'mr-3 h-5 w-5']" aria-hidden="true" />
                    Delete
                  </a>
                </MenuItem>
                <MenuItem v-slot="{ active }" @click="duplicateRoutes(r)">
                  <a :class="[active ? 'bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300', 'group flex items-center px-4 py-2 text-sm']">
                    <DuplicateIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    Duplicate
                  </a>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem @click="moveUpRoutes(r)">
                  <a :class="[form.routes.indexOf(r) !== 0 ? 'dark:hover:bg-gray-700' : 'text-gray-200 dark:text-gray-600 cursor-not-allowed', 'group flex items-center px-4 py-2 text-sm']">
                    <ArrowCircleUpIcon :class="[form.routes.indexOf(r) !== 0 ? 'text-gray-400 group-hover:text-gray-500' : 'text-gray-200 group-hover:text-gray-200 dark:text-gray-600 dark:group-hover:text-gray-600' ,'mr-3 h-5 w-5']" aria-hidden="true" />
                    Move Up
                  </a>
                </MenuItem>
                <MenuItem @click="moveDownRoutes(r)">
                  <a :class="[form.routes.indexOf(r) !== (form.routes.length - 1) ? 'dark:hover:bg-gray-700' : 'text-gray-200 dark:text-gray-600 cursor-not-allowed', 'group flex items-center px-4 py-2 text-sm']">
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
    <!-- error section -->
    <div v-if="routes_error.length != 0" class="bg-red-50 text-sm text-red-700 p-2 rounded-lg mb-4" >
      <p v-html="routes_error"/>
    </div>

    <div v-if="symbol_error.length != 0" class="bg-red-50 text-sm text-red-700 p-2 rounded-lg mb-4" >
      <div v-for="item in symbol_error" :key="item">
        {{ item }}
      </div>
    </div>

    <!-- Extra Routes-->
    <Divider v-if="form.extra_routes.length">Extra Routes</Divider>

    <div v-for="(r, i) in form.extra_routes"
         :key="r.exchange + i + r.timeframe"
         class="flex border dark:bg-backdrop-dark dark:border-gray-900 rounded-lg mb-4">
      <select v-model="r.exchange"
              class="dark:bg-backdrop-dark dark:hover:bg-gray-700 hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 dark:border-gray-900 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500  rounded-l-lg">
        <option v-for="item in exchanges" :key="item">{{ item }}</option>
      </select>

      <input v-model="r.symbol"
             type="text"
             class="dark:bg-backdrop-dark dark:hover:bg-gray-700 hover:bg-gray-50 w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 dark:border-gray-900 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 "
             placeholder="ex: BTC-USDT"
             @input="r.symbol = $event.target.value.toUpperCase()"
      >

      <select v-model="r.timeframe"
              class="dark:bg-backdrop-dark dark:hover:bg-gray-700 hover:bg-gray-50 cursor-pointer w-full pl-3 pr-10 py-6 border-0 border-r border-gray-200 dark:border-gray-900 focus:outline-none focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 ">
        <option v-for="item in routes.timeframes" :key="item">{{ item }}</option>
      </select>

      <!-- More Button -->
      <div class="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-lg">
        <Menu as="div" class="relative block h-full w-full">
          <MenuButton class="px-5 block text-left h-full w-full focus:outline-none">
            <DotsVerticalIcon class="h-8 w-8 text-gray-400"/>
          </MenuButton>

          <transition enter-active-class="transition ease-out duration-100"
                      enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems
              class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-backdrop-dark dark:border-gray-900 z-10 ring-1 ring-black dark:ring-gray-500 ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-900 focus:outline-none">
              <div class="py-1">
                <MenuItem @click="deleteExtraRoute(r)">
                  <a class="dark:hover:bg-gray-700 group flex items-center px-4 py-2 text-sm">
                    <TrashIcon class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" aria-hidden="true" />
                    Delete
                  </a>
                </MenuItem>
                <MenuItem v-slot="{ active }" @click="duplicateExtraRoutes(r)">
                  <a
                    :class="[active ? 'bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300', 'group flex items-center px-4 py-2 text-sm']">
                    <DuplicateIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true"/>
                    Duplicate
                  </a>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem @click="moveUpExtraRoutes(r)">
                  <a :class="[form.extra_routes.indexOf(r) !== 0 ? 'dark:hover:bg-gray-700' : 'text-gray-200 dark:text-gray-600 cursor-not-allowed', 'group flex items-center px-4 py-2 text-sm']">
                    <ArrowCircleUpIcon :class="[form.extra_routes.indexOf(r) !== 0 ? 'text-gray-400 group-hover:text-gray-500' : 'text-gray-200 group-hover:text-gray-200 dark:text-gray-600 dark:group-hover:text-gray-600' ,'mr-3 h-5 w-5']" aria-hidden="true" />
                    Move Up
                  </a>
                </MenuItem>
                <MenuItem @click="moveDownExtraRoutes(r)">
                  <a :class="[form.extra_routes.indexOf(r) !== (form.extra_routes.length - 1) ? 'dark:hover:bg-gray-700' : 'text-gray-200 dark:text-gray-600 cursor-not-allowed', 'group flex items-center px-4 py-2 text-sm']">
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
    <div v-if="extra_routes_error.length != 0" class="bg-red-50 text-sm text-red-700 p-2 rounded-lg mb-4" >
      <div v-for="item in extra_routes_error" :key="item">
        {{ item }}
      </div>
    </div>

    <div v-if="extra_symbol_error.length != 0" class="bg-red-50 text-sm text-red-700 p-2 rounded-lg mb-4" >
      <div v-for="item in extra_symbol_error" :key="item">
        {{ item }}
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
    DividerWithButtons
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
      routes_error: [],
      extra_routes_error: [],
      symbol_error: [],
      extra_symbol_error: []
    }
  },
  computed: {
    ...mapState(useMainStore, ['routes']),
    exchanges () {
      const isLive = this.$route.name === 'Live'
      return isLive ? this.routes.liveExchanges : this.routes.exchanges
    }
  },
  watch: {
    form () {
      this.initiate()
    },
    copiedRoutes: {
      handler (val) {
        this.checkRoutes(val)
      },
      deep: true
    },
    copiedExtraRoutes: {
      handler (val) {
        this.checkExtraRoutes(val)
      },
      deep: true
    }
  },
  created () {
    this.initiate()
  },
  methods: {
    checkExtraRoutes (value) {
      this.extra_symbol_error = []
      for (const item of value.extra_routes) {
        if (!this.extra_symbol_error.includes('Symbol parameter length is exceeded.') && item.symbol.length > 9) {
          this.extra_symbol_error.push('Symbol parameter length is exceeded.')
        }
        const hasNumber = /\d/ 
        if (!this.extra_symbol_error.includes('Symbol parameter cannot have number character.') && hasNumber.test(item.symbol)) {
          this.extra_symbol_error.push('Symbol parameter cannot have number character.')
        }

        if (!this.extra_symbol_error.includes('Symbol parameter must contain "-" character.') && item.symbol.length >= 5) {
          let checkDash = false
          for (const item1 of item.symbol.substring(3, 5)) {
            if (item1 === '-') {
              checkDash = true
            }
          }
          if (!checkDash) {
            this.extra_symbol_error.push('Symbol parameter must contain "-" character.')
          }
        }
      }

      this.extra_routes_error = []
      let checkBreakLoop = false
      const tempRoutes = value.extra_routes
      for (const item of tempRoutes.slice(0, -1)) {
        for (const item1 of tempRoutes.slice(tempRoutes.indexOf(item) + 1,)) {
          if (item.exchange === item1.exchange && item.timeframe === item1.timeframe && item.symbol === item1.symbol && item.symbol.length !== 0) {
            this.extra_routes_error.push('Extra routes parameters (exchange, time frame and symbol) must be unique.')
            checkBreakLoop = true
            break
          }
        }
        if (checkBreakLoop) {
          break
        }
      }

      if (this.form.extra_routes.length > 0) {
        for (const item of tempRoutes) {
          for (const item1 of this.form.routes) {
            if (item.exchange === item1.exchange && item.symbol === item1.symbol && item.timeframe === item1.timeframe && item.symbol.length !== 0) {
              this.extra_routes_error.push('Extra routes time frame and routes time frame must be deferent.')
              return
            }
          }
        }
      }
    },
    checkRoutes (value) {
      this.symbol_error = []
      for (const item of value.routes) {
        if (!this.symbol_error.includes('Symbol parameter length is exceeded.') && item.symbol.length > 9) {
          this.symbol_error.push('Symbol parameter length is exceeded.')
        }
        const hasNumber = /\d/ 
        if (!this.symbol_error.includes('Symbol parameter cannot have number character.') && hasNumber.test(item.symbol)) {
          this.symbol_error.push('Symbol parameter cannot have number character.')
        }

        if (!this.symbol_error.includes('Symbol parameter must contain "-" character.') && item.symbol.length >= 5) {
          let checkDash = false
          for (const item1 of item.symbol.substring(3, 5)) {
            if (item1 === '-') {
              checkDash = true
            }
          }
          if (!checkDash) {
            this.symbol_error.push('Symbol parameter must contain "-" character.')
          }
        }
      }
      this.routes_error = []
      const tempRoutes = value.routes
      for (const item of tempRoutes.slice(0, -1)) {
        for (const item1 of tempRoutes.slice(tempRoutes.indexOf(item) + 1,)) {
          if (item.exchange === item1.exchange && item.strategy === item1.strategy && item.symbol === item1.symbol && item.symbol.length !== 0) {
            this.routes_error.push('Routes parameters (exchange, strategy and symbol) must be unique.')
            return
          }
        }
      }
    },
    initiate () {
      if (this.form.routes.length) {
        return
      }

      this.form.routes.push({
        exchange: this.exchanges[0],
        symbol: 'BTC-USDT',
        timeframe: this.routes.timeframes[0],
        strategy: this.routes.strategies[0]
      })
    },
    addRoute () {
      // duplicate the last one
      this.form.routes.push({
        exchange: this.form.routes[this.form.routes.length - 1].exchange,
        symbol: '',
        timeframe: this.routes.timeframes[0],
        strategy: this.routes.strategies[0]
      })
    },
    addExtraRoute () {
      // duplicate the last one
      this.form.extra_routes.push({
        exchange: this.form.routes[this.form.routes.length - 1].exchange,
        symbol: this.form.routes[this.form.routes.length - 1].symbol,
        timeframe: this.routes.timeframes[0]
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
