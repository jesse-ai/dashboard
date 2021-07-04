<template>
  <div class="h-screen flex overflow-hidden bg-white bg-backdrop dark:bg-backdrop-dark">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        static
        class="fixed inset-0 flex z-40 md:hidden"
        :open="sidebarOpen"
        @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75"/>
        </TransitionChild>

        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full">
          <div class="relative flex-1 flex flex-col max-w-xs w-full bg-backdrop dark:bg-backdrop-dark">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0">
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>

                  <XIcon class="h-6 w-6 text-white" aria-hidden="true"/>
                </button>
              </div>
            </TransitionChild>

            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div class="flex-shrink-0 flex items-center px-4">
                <span class="h2">Dashboard</span>
              </div>

              <Nav class="mt-5"/>
            </div>

            <div class="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
              <div class="flex items-center justify-center w-full">
                <span class="mr-2">Theme:</span>

                <ThemeSwitch/>
              </div>
            </div>
          </div>
        </TransitionChild>

        <div class="flex-shrink-0 w-14">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="bg-gray-50 flex flex-col h-0 flex-1 border-r border-gray-200 dark:border-gray-700 bg-backdrop dark:bg-backdrop-dark">
          <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div class="flex items-center flex-shrink-0 px-4">
              <span class="h2">Dashboard</span>
            </div>

            <Nav class="mt-5 flex-1"/>
          </div>

          <div class="border-b dark:border-gray-700"/>

          <p class="px-2 dark:text-gray-400">Is socket connected: {{ !!isConnected }}</p>

          <div class="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
            <div class="flex items-center justify-center w-full">
              <span class="mr-2 text-gray-600 dark:text-gray-500">Theme:</span>

              <ThemeSwitch/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div class="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
        <button
          class="-ml-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md menu-button"
          @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>

          <MenuIcon class="h-6 w-6" aria-hidden="true"/>
        </button>
      </div>

      <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none">
        <section class="h-full flex flex-col justify-between">
          <router-view/>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuIcon,
  UsersIcon,
  XIcon
} from '@heroicons/vue/outline'

import Nav from '@/components/Nav'
import ThemeSwitch from '@/components/ThemeSwitch'
import { useMainStore } from '@/stores/main'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false }
]

export default {
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    MenuIcon,
    XIcon,
    Nav,
    ThemeSwitch
  },
  setup () {
    const sidebarOpen = ref(false)
    const mainStore = useMainStore()

    return {
      navigation,
      sidebarOpen,
      isConnected: computed(() => mainStore.isConnected),
    }
  }
}
</script>

<style scoped>
  .menu-button {
    @apply text-gray-500 hover:text-gray-900 dark:hover:text-gray-200;
    @apply focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-primary-dark;
  }
</style>
