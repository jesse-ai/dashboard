<template>
  <!-- new version announcement -->
  <UpdateBanner />

  <!-- Settings -->
  <SlideOver name="settings"
             :object="modals"
             title="Settings">
    <Settings/>
  </SlideOver>

  <!-- Feedback -->
  <SlideOver :object="modals" name="feedback" title="Feedback">
    <Feedback/>
  </SlideOver>

  <!-- Make strategy -->
  <SlideOver :object="modals" name="makeStrategy" title="Make a new strategy" width="max-w-lg">
    <MakeStrategy/>
  </SlideOver>

  <!-- Make strategy -->
  <SlideOver :object="modals" name="about" title="About" width="max-w-lg">
    <About />
  </SlideOver>

  <Disclosure v-slot="{ open }" as="nav" class="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-900 select-none">
    <div class="mx-auto px-4 lg:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <!-- light -->
            <img class="h-9 w-auto dark:hidden" src="@/assets/imgs/logo-light.png" alt="Jesse Logo">
            <!-- dark -->
            <img class="hidden dark:block h-10 w-auto" src="@/assets/imgs/logo-dark.svg" alt="Jesse Logo">
          </div>
          <div class="hidden lg:block lg:ml-6">
            <div class="flex space-x-4">
              <router-link
                v-for="item in navigation"
                :id="convertToSlug(item.name) + '-page-button'"
                :key="item.name"
                :to="item.to"
                class="flex items-center text-gray-700 dark:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                :class="($route.path.startsWith(item.to) && item.to !== '/') || $route.path === item.to ? 'bg-gray-200 dark:bg-gray-900' : 'hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200'"
              >
                <component :is="item.icon"
                           :class="[($route.path.startsWith(item.to) && item.to !== '/') || $route.path === item.to ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-400', 'flex-shrink-0 -ml-1 mr-2 h-6 w-6']"
                           aria-hidden="true"/>

                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="hidden lg:ml-6 lg:block">
          <div class="flex items-center">
            <ThemeSwitch/>

            <button data-cy="settings-icon" class="btn-nav"
                    @click="modals.settings = true">
              <span class="sr-only">Settings</span>
              <CogIcon class="h-6 w-6" aria-hidden="true"/>
            </button>

            <!-- Notifications -->
            <!--            <button class="p-1 mx-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none">-->
            <!--              <span class="sr-only">View notifications</span>-->
            <!--              <BellIcon class="h-6 w-6" aria-hidden="true" />-->
            <!--            </button>-->

            <!-- Profile dropdown -->
            <Menu as="div" class="relative z-40">
              <MenuButton data-cy="nav-dropdown-menu-button" class="btn-nav">
                <span class="sr-only">Settings</span>
                <DotsVerticalIcon class="h-6 w-6" aria-hidden="true"/>
              </MenuButton>

              <transition enter-active-class="transition ease-out duration-100"
                          enter-from-class="transform opacity-0 scale-95"
                          enter-to-class="transform opacity-100 scale-100"
                          leave-active-class="transition ease-in duration-75"
                          leave-from-class="transform opacity-100 scale-100"
                          leave-to-class="transform opacity-0 scale-95">
                <MenuItems data-cy="nav-dropdown-menu-items"
                           class="bg-white dark:bg-gray-700 origin-top-right absolute right-0 mt-2 w-64 rounded-md border-gray-200 dark:border-gray-900 shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 dark:divide-gray-900">
                  <div class="px-4 py-3 select-text">
                    <p class="text-sm text-gray-500 dark:text-gray-300">Active License: <span class="truncate text-sm font-medium text-gray-800 dark:text-gray-200 opacity-100 uppercase">{{ planInfo.plan }}</span></p>
                  </div>

                  <div class="py-1">
                    <MenuItem v-if="shouldShowUpgradeButton" v-slot="{ active }">
                      <a href="https://jesse.trade/pricing"
                         :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'flex justify-start items-center w-full text-left px-4 py-2 text-sm text-yellow-500 dark:text-yellow-300']"
                         target="_blank">
                        <SparklesIcon class="w-5 h-5 mr-2"/>
                        Upgrade License
                      </a>
                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                      <button data-cy="nav-create-strategy"
                              :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'flex justify-left items-center w-full text-left px-4 py-2 text-sm text-indigo-700 dark:text-indigo-300']"
                              @click="modals.makeStrategy = true">
                        <DocumentAddIcon class="w-5 h-5 mr-2"/>
                        New Strategy
                      </button>
                    </MenuItem>
                  </div>

                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <button data-cy="nav-create-strategy"
                              :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'flex justify-left items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300']"
                              @click="openFeedback">
                        <ChatAltIcon class="w-5 h-5 mr-2"/>
                        Feedback
                      </button>
                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                      <a data-cy="nav-documentation-link" href="https://docs.jesse.trade/"
                         :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'flex justify-start items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300']"
                         target="_blank">
                        <CollectionIcon class="w-5 h-5 mr-2"/>
                        Documentation
                      </a>
                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                      <a href="https://jesse.trade/strategies" data-cy="nav-strategies-link"
                         :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'flex justify-start items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300']"
                         target="_blank">
                        <DocumentTextIcon class="w-5 h-5 mr-2"/>
                        Sample Strategies
                      </a>
                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                      <a data-cy="nav-help-center-link" href="https://jesse.trade/help"
                         :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'flex justify-start items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300']"
                         target="_blank">
                        <QuestionMarkCircleIcon class="w-5 h-5 mr-2"/>
                        Help Center
                      </a>
                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                      <button data-cy="nav-help-center-link"
                              href="https://jesse.trade/help"
                              :class="[active ? 'bg-gray-100 dark:bg-gray-800' : '', 'flex justify-start items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300']"
                              target="_blank"
                              @click="modals.about = true"
                      >
                        <IdentificationIcon class="w-5 h-5 mr-2"/>
                        About
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
        <div class="-mr-2 flex lg:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:focus:ring-gray-800">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true"/>
            <XIcon v-else class="block h-6 w-6" aria-hidden="true"/>
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="lg:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <div v-for="item in navigation" :id="convertToSlug(item.name) + '-page-button'" :key="item.name"
             :class="[$route.path.startsWith(item.to) ? 'bg-gray-200 dark:bg-gray-900' : 'hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200', 'rounded-md']">
          <router-link
            :to="item.to"
            class="text-gray-700 dark:text-gray-300 text-sm font-medium"
          >
            <div class="flex items-center w-full p-2">
              <component :is="item.icon"
                         :class="[$route.path.startsWith(item.to) ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-400', 'flex-shrink-0 mr-2 h-6 w-6']"
                         aria-hidden="true"/>
              {{ item.name }}
            </div>
          </router-link>
        </div>
      </div>

      <div class="px-2 py-2 space-y-1 border-t border-gray-200 dark:border-gray-900">
        <a v-if="shouldShowUpgradeButton"
           href="https://jesse.trade/pricing" target="_blank"
           class="flex justify-start items-center w-full text-left px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 rounded-md"
        >
          <DocumentAddIcon class="w-5 h-5 mr-2"/>
          Upgrade License
        </a>

        <button
          class="flex justify-start items-center w-full text-left px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 rounded-md"
          @click="modals.makeStrategy = true">
          <DocumentAddIcon class="w-5 h-5 mr-2"/>
          New Strategy
        </button>
      </div>

      <!-- docs, help and strategies links -->
      <div class="px-2 py-2 space-y-1 border-t border-gray-200 dark:border-gray-900">
        <div class="w-full">
          <a href="https://docs.jesse.trade/"
             class="flex justify-start items-center w-full text-left px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 rounded-md"
             target="_blank">
            <CollectionIcon class="w-5 h-5 mr-2"/>
            Documentation
          </a>
        </div>

        <div class="w-full">
          <a href="https://jesse.trade/strategies"
             class="flex justify-start items-start w-full text-left px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 rounded-md"
             target="_blank">
            <DocumentTextIcon class="w-5 h-5 mr-2"/>
            Sample Strategies
          </a>
        </div>

        <div class="w-full">
          <a href="https://jesse.trade/help"
             class="flex justify-start items-center w-full text-left px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 rounded-md"
             target="_blank">
            <QuestionMarkCircleIcon class="w-5 h-5 mr-2"/>
            Help Center
          </a>
        </div>

        <div class="w-full">
          <button href="https://jesse.trade/strategies"
                  class="flex justify-start items-start w-full text-left px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 rounded-md"
                  target="_blank"
                  @click="modals.makeStrategy = true">
            <IdentificationIcon class="w-5 h-5 mr-2"/>
            About
          </button>
        </div>
      </div>

      <!-- options and feedback button -->
      <div class="flex justify-between items-center px-2 py-2 space-y-1 border-t border-gray-200 dark:border-gray-900">
        <button class="btn-nav ml-0"
                @click="modals.settings = true">
          <span class="sr-only">Settings</span>
          <CogIcon class="h-6 w-6" aria-hidden="true"/>
        </button>

        <ThemeSwitch/>
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
  DownloadIcon,
  DocumentAddIcon,
  LoginIcon,
  LogoutIcon,
  DocumentTextIcon,
  IdentificationIcon,
  QuestionMarkCircleIcon,
  CollectionIcon,
  HomeIcon,
  SparklesIcon,
  ChatAltIcon
} from '@heroicons/vue/outline'
import SlideOver from '@/components/Functional/SlideOver'
import { mapState } from 'pinia'
import { useMainStore } from '@/stores/main'
import Feedback from '@/views/Feedback'
import Settings from '@/components/Settings'
import ConfirmModal from '@/components/Modals/ConfirmModal'
import MakeStrategy from '@/views/MakeStrategy'
import About from '@/views/About'
import ThemeSwitch from '@/components/ThemeSwitch'
import Announcement from '@/components/UpdateBanner'

export default {
  name: 'Nav',
  components: {
    Announcement,
    ConfirmModal,
    Settings,
    Feedback,
    MakeStrategy,
    About,
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
    SparklesIcon,
    ChatAltIcon,
    CalculatorIcon,
    ChipIcon,
    CurrencyDollarIcon,
    SaveIcon,
    DocumentAddIcon,
    LoginIcon,
    LogoutIcon,
    DocumentTextIcon,
    IdentificationIcon,
    QuestionMarkCircleIcon,
    CollectionIcon,
    HomeIcon,
    ThemeSwitch
  },
  setup () {
    const open = ref(false)

    return {
      open,
    }
  },
  computed: {
    ...mapState(useMainStore, ['modals', 'hasLivePluginInstalled', 'planInfo']),
    shouldShowUpgradeButton () {
      return this.planInfo && this.planInfo.plan !== 'premium'
    },
    navigation () {
      const arr = [
        {
          name: 'Home',
          to: '/',
          icon: HomeIcon
        },
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
        {
          name: 'Optimization',
          to: '/optimization/',
          icon: ChipIcon
        },
      ]

      if (this.hasLivePluginInstalled) {
        arr.push({
          name: 'Live',
          to: '/live/',
          icon: CurrencyDollarIcon
        })
      }

      return arr
    }
  },
  methods: {
    convertToSlug (Text) {
      return Text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
    },
    openFeedback () {
      this.modals.feedback = true
    }
  }
}
</script>
