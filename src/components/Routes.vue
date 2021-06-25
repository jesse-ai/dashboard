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

        <span>
          <button type="button" class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-l-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
            <PlusSmIcon class="-ml-1.5 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            <span>Trading Route</span>
          </button>
          <button type="button" class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-r-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
            <PlusSmIcon class="-ml-1.5 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            <span>Extra Route</span>
          </button>
        </span>
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
        <Menu as="div" class="relative block h-full w-full">
          <MenuButton class="px-5 block text-left h-full w-full focus:outline-none">
            <DotsVerticalIcon class="h-8 w-8 text-gray-400" />
          </MenuButton>

          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
                    <TrashIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    Delete
                  </a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
                    <DuplicateIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    Duplicate
                  </a>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
                    <ArrowCircleUpIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    Move Up
                  </a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm']">
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
  </div>
</template>


<script>
import {
  PlusSmIcon, DotsVerticalIcon,
  ArchiveIcon,
  ArrowCircleRightIcon,
  ChevronDownIcon,
  DuplicateIcon,
  HeartIcon,
  PencilAltIcon,
  TrashIcon,
  UserAddIcon,
  ArrowCircleUpIcon,
  ArrowCircleDownIcon
} from '@heroicons/vue/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

export default {
  name: 'Routes',
  components: {
    PlusSmIcon,
    DotsVerticalIcon,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ArchiveIcon,
    ArrowCircleRightIcon,
    ChevronDownIcon,
    DuplicateIcon,
    HeartIcon,
    PencilAltIcon,
    TrashIcon,
    UserAddIcon,
    ArrowCircleUpIcon,
    ArrowCircleDownIcon
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
