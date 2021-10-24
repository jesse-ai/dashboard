<template>
  <TransitionRoot as="template" :show="object[name]">
    <Dialog as="div" static class="fixed inset-0 overflow-hidden z-40" :open="object[name]"
            @close="object[name] = false">
      <div class="absolute inset-0 overflow-hidden">
        <TransitionChild as="template" enter="ease-in-out duration-400" enter-from="opacity-0" enter-to="opacity-100"
                         leave="ease-in-out duration-400" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="absolute inset-0 bg-gray-500 bg-opacity-95 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <TransitionChild as="template" enter="transform transition ease-in-out duration-400 sm:duration-400" enter-from="translate-x-full" enter-to="translate-x-0"
                           leave="transform transition ease-in-out duration-400 sm:duration-400" leave-from="translate-x-0" leave-to="translate-x-full">
            <div class="w-screen" :class="width">
              <div class="h-full flex flex-col py-6 bg-white dark:bg-backdrop-dark shadow-xl overflow-y-scroll">
                <div class="px-4 sm:px-6 border-b-2 dark:border-gray-800 pb-6">
                  <div class="flex items-start justify-between">
                    <DialogTitle data-cy="slideover-title" class="text-lg font-medium text-gray-900 dark:text-gray-100 select-none" v-text="title"/>

                    <div class="ml-3 h-7 flex items-center">
                      <slot name="buttons"/>

                      <button id="slideover-close-button" class="btn-nav" @click="object[name] = false">
                        <XIcon class="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-6 relative flex-1 px-4 sm:px-6">
                  <slot>
                    <div class="absolute inset-0 px-4 sm:px-6">
                      <div class="h-full border-2 border-dashed border-gray-200" aria-hidden="true" />
                    </div>
                  </slot>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    object: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: 'max-w-4xl'
      // max-w-lg
    }
  },
}
</script>
