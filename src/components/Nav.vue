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
    <button class="btn-danger ml-2" @click="logoutFromJesseTrade">Logout</button>
  </ConfirmModal>

  <!-- Make strategy -->
  <SlideOver :object="modals" name="makeStrategy" title="Make a new strategy" width="max-w-lg">
    <MakeStrategy />
  </SlideOver>

  <Disclosure v-slot="{ open }" as="nav" class="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-900 select-none">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="block lg:hidden h-8 w-auto" src="@/assets/imgs/jesse-logo.svg" alt="Jesse Logo" >
            <img class="hidden lg:block h-8 w-auto" src="@/assets/imgs/jesse-logo.svg" alt="Jesse Logo" >
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.to"
                class="text-gray-700 dark:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                :class="$route.path.startsWith(item.to) ? 'bg-gray-200 dark:bg-gray-900' : 'hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200'"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex items-center">
            <button class="btn-secondary mr-4 text-sm" @click="openFeedback">
              Feedback
            </button>

            <ThemeSwitch />

            <button class="btn-nav"
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
              <MenuButton class="btn-nav">
                <span class="sr-only">Settings</span>
                <DotsVerticalIcon class="h-6 w-6" aria-hidden="true" />
              </MenuButton>

              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
                          leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="bg-white dark:bg-gray-700 origin-top-right absolute right-0 mt-2 w-64 rounded-md border-gray-200 dark:border-gray-900 shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 dark:divide-gray-900">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <button :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300']"
                              @click="modals.makeStrategy = true">
                        New Strategy
                      </button>
                    </MenuItem>
                  </div>

                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a href="https://docs.jesse.trade/" :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300']" target="_blank">
                        Documentation
                      </a>
                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                      <a href="https://jesse.trade/strategies" :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300']" target="_blank">
                        Strategies
                      </a>
                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                      <a href="https://jesse.trade/help" :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300']" target="_blank">
                        Help Center
                      </a>
                    </MenuItem>
                  </div>

                  <div class="py-1">
                    <MenuItem v-if="!isLoggedInToJesseTrade" v-slot="{ active }">
                      <button :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300']"
                              @click="modals.jesseTradeLogin = true">
                        Login to Jesse.Trade
                      </button>
                    </MenuItem>

                    <MenuItem v-else v-slot="{ active }">
                      <button :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300']"
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
        <div class="-mr-2 flex sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- Current: "bg-gray-300 text-gray-600", Default: "text-gray-700 hover:bg-gray-300 hover:text-gray-600" -->
        <a href="#" class="bg-gray-200 text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Dashboard</a>
        <a href="#" class="text-gray-700 hover:bg-gray-300 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Team</a>
        <a href="#" class="text-gray-700 hover:bg-gray-300 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Projects</a>
        <a href="#" class="text-gray-700 hover:bg-gray-300 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
      </div>
      <div class="pt-4 pb-3 border-t border-gray-700">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" >
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-600">Tom Cook</div>
            <div class="text-sm font-medium text-gray-400">tom@example.com</div>
          </div>
          <button class="ml-auto flex-shrink-0 bg-gray-200 p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-3 px-2 space-y-1">
          <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-300">Your Profile</a>
          <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-300">Settings</a>
          <a href="#" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-300">Sign out</a>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon, CogIcon, DotsVerticalIcon } from '@heroicons/vue/outline'
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
    BellIcon,
    MenuIcon,
    XIcon,
    SlideOver,
    CogIcon,
    DotsVerticalIcon,
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
          to: '/candles/'
        },
        {
          name: 'Backtest',
          to: '/backtest/'
        },
        {
          name: 'Live',
          to: '/live/'
        },
        // {
        //   name: 'Optimization',
        //   to: '/optimization/'
        // },
      ]
    }
  },
  computed: {
    ...mapState(useMainStore, ['modals']),
    ...mapWritableState(useMainStore, ['isLoggedInToJesseTrade'])
  },
  methods: {
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
