<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
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
          <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
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
                  type="button"
                  class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="h-6 w-6 text-white" aria-hidden="true"/>
                </button>
              </div>
            </TransitionChild>

            <div class="flex-shrink-0 flex items-center px-4">
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
                alt="Workflow">
            </div>

            <div class="mt-5 flex-1 h-0 overflow-y-auto">
              <Nav/>
            </div>
          </div>
        </TransitionChild>

        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden bg-indigo-700 md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <!-- Logo -->
          <div class="flex items-center flex-shrink-0 px-4">
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
              alt="Workflow">
          </div>

          <div class="mt-5 flex-1 flex flex-col">
            <Nav class="flex-1"/>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          type="button"
          class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>

          <MenuAlt2Icon class="h-6 w-6" aria-hidden="true"/>
        </button>

        <div class="flex-1 px-4 flex justify-between">
          <div class="flex-1 flex"/>

          <div class="ml-4 flex items-center md:ml-6">
            <ThemeSwitch/>
          </div>
        </div>
      </div>

      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <router-view/>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'

import {
  MenuAlt2Icon,
  XIcon
} from '@heroicons/vue/outline'

import ThemeSwitch from '@/components/ThemeSwitch'
import Nav from '@/components/Nav'

export default {
  name: 'WithSidebar',
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    MenuAlt2Icon,
    XIcon,
    ThemeSwitch,
    Nav
  },
  setup () {
    const sidebarOpen = ref(false)

    return {
      sidebarOpen
    }
  }
}
</script>
