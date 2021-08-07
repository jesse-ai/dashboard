<template>
  <TransitionRoot as="template" :show="object[name]">
    <Dialog as="div" static class="fixed z-10 inset-0 overflow-y-auto" :open="object[name]"
            @close="object[name] = false">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                         leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100"
                         leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div class="w-full flex justify-between items-center">
              <!-- head section -->
              <slot name="head" />
            </div>

            <!-- main section -->
            <slot name="main" />
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <!-- footer section -->
              <slot name="footer" />
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'

export default {
  name: 'CustomModal',
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  },
  props: {
    object: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}
</script>
