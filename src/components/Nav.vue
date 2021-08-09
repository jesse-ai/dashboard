<template>
  <SlideOver name="settings"
             :object="modals"
             title="Settings">
    <Settings />
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
                :class="$route.path.startsWith(item.to) ? 'bg-gray-200 dark:bg-gray-900' : 'hover:bg-gray-200 dark:hover:bg-gray-900 hover:text-gray-600 dark:hover:text-gray-200'"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex items-center">
            <button class="btn-success mr-4 text-sm" @click="feedback_object.open = true">
              Feedback
            </button>

            <ThemeSwitch/>

            <button class="p-1 mx-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                    @click="modals.settings = true">
              <span class="sr-only">Settings</span>
              <CogIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <button class="p-1 mx-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none">
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton class="bg-gray-200 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" >
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
                          leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Your Profile</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</a>
                  </MenuItem>
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

  <SlideOver :object="feedback_object" :name="'open'" :title="'Feedback'" >
    <div class="w-full">
      <div class="mt-2">
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <div class="mt-1">
          <textarea id="description" v-model="form.description" name="description" rows="3"
                    class="dark:bg-backdrop-dark shadow-sm focus:ring-indigo-500 dark:ring-0 focus:border-indigo-500 dark:focus:border-gray-500 mt-1 block w-full sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md"
                    placeholder="Type your feed back" />
        </div>
        <div v-if="feedback_error.length != 0">
          <p class="text-red-500 dark:text-red-400 text-sm mt-1" v-html="feedback_error" />
        </div>
      </div>

      <div class="w-full flex justify-between mt-4">
        <button class="w-1/4 btn-secondary" @click="feedback_object.open = false">Cancel</button>
        <button class="w-2/3 btn-primary" @click="send_feedback()">Submit</button>
      </div>
    </div>
  </SlideOver>
</template>

<script>
import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon, CogIcon } from '@heroicons/vue/outline'
import SlideOver from '@/components/Functional/SlideOver'
import axios from 'axios'
import { mapState } from 'pinia'
import { useMainStore } from '@/stores/main'

export default {
  name: 'Nav',
  components: {
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
    CogIcon
  },
  setup () {
    const open = ref(false)

    return {
      open,
    }
  },
  data () {
    return {
      feedback_error: [],
      feedback_object: { open: false },
      form: {
        description: ''
      },
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
    ...mapState(useMainStore, ['modals'])
  },
  methods: {
    send_feedback () {
      this.feedback_error = []

      if (!this.form.description) {
        this.feedback_error.push('Description required')
      }

      if (this.feedback_error.length === 0) {
        const payload = new FormData()
        payload.append('description', this.form.description)

        axios.post('http://jesse-trade.test/api/feedback', payload, {
          headers: 'Authorization:Bearer bFS0KX2eWvpxRMi1J1a2akTp9TtGAri6DoTWKM1b'
        }).then((res) => {
          if (res.data === 'done') {
            this.feedback_error = []
            this.form.description = ''
          }
        })
      }
    },
  }
}
</script>
