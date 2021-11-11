<template>
  <TransitionRoot as="template" :show="object[name]">
    <Dialog as="div" static class="fixed z-10 inset-0 overflow-y-auto" :open="object[name]"
            @close="object[name] = false">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 select-none">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                         leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100"
                         leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div class="w-full flex justify-between items-center">
              <div class="flex items-center">
                <div v-if="type === 'info'" class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <InformationCircleIcon check-icon :class="colors.text" class="h-7 w-7" aria-hidden="true" />
                </div>
                <div v-else-if="type === 'danger'" class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <BanIcon check-icon :class="colors.text" class="h-7 w-7" aria-hidden="true" />
                </div>
                <div v-else-if="type === 'success'" class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <CheckIcon :class="colors.text" class="h-7 w-7" aria-hidden="true" />
                </div>
                <div v-else class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon :class="colors.text" check-icon class="h-7 w-7 " aria-hidden="true" />
                </div>

                <!-- title -->
                <DialogTitle as="h3" :class="colors.text" class="font-semibold ml-2">
                  {{ title }}
                </DialogTitle>
              </div>

              <button class="btn-nav" @click="object[name] = false">
                <XIcon class="h-5 w-5 text-gray-400 rounded-full" />
              </button>
            </div>

            <div :class="[description ? '' : 'items-center', 'flex items-start justify-start']">
              <div class="mt-3 sm:mt-0 sm:ml-4 text-left">
                <div v-if="description" class="my-4 ml-8">
                  <p class="text-sm text-gray-500 dark:text-gray-300">
                    {{ description }}
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-5 sm:mt-4 flex justify-end">
              <!-- action button which must insert in main component -->
              <button ref="cancelButtonRef" type="button" class="font-medium select-none items-center text-gray-700 dark:text-gray-300 hover:underline focus:outline-none text-base tracking-wide mr-4" @click="object[name] = false">
                {{ type === 'danger' ? 'Cancel' : 'Close' }}
              </button>

              <slot />
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { BanIcon, ExclamationIcon, CheckIcon, XIcon, InformationCircleIcon } from '@heroicons/vue/outline'

export default {
  name: 'ConfirmModal',
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    ExclamationIcon,
    CheckIcon,
    BanIcon,
    XIcon,
    InformationCircleIcon
  },
  props: {
    object: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['success', 'danger', 'info', 'warning'].includes(value)
      },
    }
  },
  computed: {
    colors () {
      const color = {}
      switch (this.type) {
        case 'info':
          color.text = 'text-gray-600 dark:text-gray-200'
          return color
        case 'warning':
          color.text = 'text-yellow-600 dark:text-yellow-400'
          return color
        case 'success':
          color.text = 'text-green-400 dark:text-green-600'
          return color
        case 'danger':
          color.text = 'text-red-600 dark:text-red-400'
          return color
      }
      return color
    },
  }
}
</script>
