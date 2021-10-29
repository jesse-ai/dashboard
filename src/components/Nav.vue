<template>
  <!-- Settings -->
  <SlideOver name="settings"
             :object="modals"
             title="Settings">
    <Settings />
  </SlideOver>

  <!-- Feedback -->
  <SlideOver :object="modals" name="feedback" title="Feedback" >
    <Feedback/>
  </SlideOver>

  <!-- Jesse.Trade Login -->
  <SlideOver :object="modals" name="jesseTradeLogin" title="Login to your Jesse account" width="max-w-lg">
    <JesseTradeLogin />
  </SlideOver>

  <!-- Jesse.Trade Logout -->
  <ConfirmModal
    title="Logout Confirm"
    description="Are you sure you want to log out from your Jesse account?"
    type="info" :object="modals" name="jesseTradeLogout"
  >
    <button data-cy="confirm-logout-button" class="btn-danger ml-2" @click="logoutFromJesseTrade">Logout</button>
  </ConfirmModal>

  <!-- Make strategy -->
  <SlideOver :object="modals" name="makeStrategy" title="Make a new strategy" width="max-w-lg">
    <MakeStrategy />
  </SlideOver>

  <Disclosure v-slot="{ open }" as="nav" class="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-900 select-none">
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="block lg:hidden h-8 w-auto" src="@/assets/imgs/jesse.png" alt="Jesse Logo" >
            <img class="hidden lg:block h-8 w-auto" src="@/assets/imgs/jesse.png" alt="Jesse Logo" >
          </div>
          <div class="hidden md:block md:ml-6">
            <div class="flex space-x-4">
              <router-link
                v-for="item in navigation"
                :id="convertToSlug(item.name) + '-page-button'"
                :key="item.name"
                :to="item.to"
                class="flex items-center text-gray-700 dark:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                :class="$route.path.startsWith(item.to) ? 'bg-gray-200 dark:bg-gray-900' : 'hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200'"
              >
                <component :is="item.icon" :class="[$route.path.startsWith(item.to) ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-400', 'flex-shrink-0 -ml-1 mr-2 h-6 w-6']" aria-hidden="true" />

                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="hidden md:ml-6 md:block">
          <div class="flex items-center">
            <button id="open-feedback-button" class="btn-secondary mr-4 text-sm" @click="openFeedback">
              Feedback
            </button>

            <ThemeSwitch />

            <button data-cy="settings-icon" class="btn-nav"
                    @click="modals.settings = true">
              <span class="sr-only">Settings</span>
              <CogIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!--            <button class="p-1 mx-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none">-->
            <!--              <span class="sr-only">View notifications</span>-->
            <!--              <BellIcon class="h-6 w-6" aria-hidden="true" />-->
            <!--            </button>-->

            <!-- Profile dropdown -->
            <Menu as="div" class="relative z-40">
              <MenuButton data-cy="nav-dropdown-menu-button" class="btn-nav">
                <span class="sr-only">Settings</span>
                <DotsVerticalIcon class="h-6 w-6" aria-hidden="true" />
              </MenuButton>

              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
                          leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems data-cy="nav-dropdown-menu-items" class="bg-white dark:bg-gray-700 origin-top-right absolute right-0 mt-2 w-64 rounded-md border-gray-200 dark:border-gray-900 shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 dark:divide-gray-900">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <button data-cy="nav-create-strategy" :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300']"
                              @click="modals.makeStrategy = true">
                        New Strategy
                      </button>
                    </MenuItem>
                  </div>

                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a data-cy="nav-documentation-link" href="https://docs.jesse.trade/" :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300']" target="_blank">
                        Documentation
                      </a>
                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                      <a href="https://jesse.trade/strategies" :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300']" target="_blank">
                        Sample Strategies
                      </a>
                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                      <a data-cy="nav-help-center-link" href="https://jesse.trade/help" :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300']" target="_blank">
                        Help Center
                      </a>
                    </MenuItem>
                  </div>

                  <div class="py-1">
                    <MenuItem v-if="!isLoggedInToJesseTrade" v-slot="{ active }">
                      <button name="nav-login-button" :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300']"
                              @click="modals.jesseTradeLogin = true">
                        Login to Jesse.Trade
                      </button>
                    </MenuItem>

                    <MenuItem v-else v-slot="{ active }">
                      <button name="nav-logout-button" :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300']"
                              @click="modals.jesseTradeLogout = true">
                        Logout from Jesse.Trade
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:focus:ring-gray-800">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- Current: "bg-gray-300 text-gray-600", Default: "text-gray-700 hover:bg-gray-300 hover:text-gray-600" -->
        <div v-for="item in navigation" :id="convertToSlug(item.name) + '-page-button'" :key="item.name" :class="[$route.path.startsWith(item.to) ? 'bg-gray-200 dark:bg-gray-900' : 'hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200', 'rounded-md']">
          <router-link
            :to="item.to"
            class="text-gray-700 dark:text-gray-300 text-sm font-medium"
          >
            <div class="flex items-center w-full p-2">
              <component :is="item.icon" :class="[$route.path.startsWith(item.to) ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-400', 'flex-shrink-0 mr-2 h-6 w-6']" aria-hidden="true" />
              {{ item.name }}
            </div>
          </router-link>
        </div>
      </div>

      <div class="px-2 py-2 space-y-1 border-t border-gray-200 dark:border-gray-900">
        <button class="w-full text-left block px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 rounded-md"
                @click="modals.makeStrategy = true">
          New Strategy
        </button>
      </div>

      <!-- docs, help and strategies links -->
      <div class="px-2 py-2 space-y-1 border-t border-gray-200 dark:border-gray-900">
        <div class="w-full">
          <a href="https://docs.jesse.trade/" class="w-full text-left block px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 rounded-md" target="_blank">
            Documentation
          </a>
        </div>

        <div class="w-full">
          <a href="https://jesse.trade/strategies" class="w-full text-left block px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 rounded-md" target="_blank">
            Sample Strategies
          </a>
        </div>

        <div class="w-full">
          <a href="https://jesse.trade/help" class="w-full text-left block px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 rounded-md" target="_blank">
            Help Center
          </a>
        </div>
      </div>

      <div class="px-2 py-2 space-y-1 border-t border-gray-200 dark:border-gray-900">
        <button v-if="!isLoggedInToJesseTrade" class="w-full text-left block px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 rounded-md"
                @click="modals.jesseTradeLogin = true">
          Login to Jesse.Trade
        </button>

        <button v-else class="w-full text-left block px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 rounded-md"
                @click="modals.jesseTradeLogout = true">
          Logout from Jesse.Trade
        </button>
      </div>

      <!-- options and feedback button -->
      <div class="flex justify-between items-center px-2 py-2 space-y-1 border-t border-gray-200 dark:border-gray-900">
        <button class="btn-nav ml-0"
                @click="modals.settings = true">
          <span class="sr-only">Settings</span>
          <CogIcon class="h-6 w-6" aria-hidden="true" />
        </button>

        <button class="btn-secondary text-sm" @click="openFeedback">
          Feedback
        </button>

        <ThemeSwitch />
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  SaveIcon,
  CalculatorIcon,
  ChipIcon,
  CurrencyDollarIcon,
  MenuIcon,
  XIcon,
  CogIcon,
  DotsVerticalIcon,
  DownloadIcon
} from '@heroicons/vue/outline'
import SlideOver from '@/components/Functional/SlideOver'
import { mapState, mapWritableState } from 'pinia'
import { useMainStore } from '@/stores/main'
import Feedback from '@/views/Feedback'
import Settings from '@/components/Settings'
import JesseTradeLogin from '@/views/JesseTradeLogin'
import ConfirmModal from '@/components/Modals/ConfirmModal'
import axios from 'axios'
import MakeStrategy from '@/views/MakeStrategy'

export default {
  name: 'Nav',
  components: {
    JesseTradeLogin,
    ConfirmModal,
    Settings,
    Feedback,
    MakeStrategy,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuIcon,
    XIcon,
    SlideOver,
    CogIcon,
    DotsVerticalIcon,
    CalculatorIcon,
    ChipIcon,
    CurrencyDollarIcon,
    SaveIcon
  },
  setup () {
    const open = ref(false)

    return {
      open,
    }
  },
  data () {
    return {
      navigation: [
        {
          name: 'Import Candles',
          to: '/candles/',
          icon: DownloadIcon
        },
        {
          name: 'Backtest',
          to: '/backtest/',
          icon: CalculatorIcon
        },
        // {
        //   name: 'Optimization',
        //   to: '/optimization/',
        //   icon: ChipIcon
        // },
        {
          name: 'Live',
          to: '/live/',
          icon: CurrencyDollarIcon
        },
      ]
    }
  },
  computed: {
    ...mapState(useMainStore, ['modals']),
    ...mapWritableState(useMainStore, ['isLoggedInToJesseTrade'])
  },
  methods: {
    convertToSlug (Text) {
      return Text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
    },
    logoutFromJesseTrade () {
      axios.post('/logout-jesse-trade').then(res => {
        this.isLoggedInToJesseTrade = false
        this.modals.jesseTradeLogout = false
        this.notyf.success(res.data.message)
      }).catch(error => {
        this.notyf.error(`[${error.response.status}]: ${error.response.statusText}`)
      })
    },
    openFeedback () {
      if (!this.isLoggedInToJesseTrade) {
        this.notyf.error('You need to login to your Jesse account to be able to send a feedback')
        this.modals.jesseTradeLogin = true
        return
      }

      this.modals.feedback = true
    }
  }
}
</script>
