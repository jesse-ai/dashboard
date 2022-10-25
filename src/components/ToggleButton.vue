<template>
  <SwitchGroup as="div" class="w-full flex items-center justify-between mb-3 select-none">
    <span class="flex-grow flex flex-col">
      <SwitchLabel as="span" class="font-medium text-gray-700 dark:text-gray-200" passive>
        {{ title }} <span v-if="disabledGuide" class="opacity-70 uppercase text-sm">({{ disabledGuide }})</span>
      </SwitchLabel>
      <SwitchDescription as="span" class="text-sm text-gray-500 dark:text-gray-400">{{ description }}</SwitchDescription>
    </span>

    <Switch v-model="object[name]" :disabled="disabled" :class="[object[name] ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-gray-200 dark:bg-gray-600', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none']">
      <span aria-hidden="true" :class="[object[name] ? 'translate-x-5 dark:bg-backdrop-dark' : 'translate-x-0 dark:bg-gray-400', 'bg-white  pointer-events-none inline-block h-5 w-5 rounded-full shadow transform ring-0 transition ease-in-out duration-200']" />
    </Switch>
  </SwitchGroup>
</template>

<script>
import { Switch, SwitchDescription, SwitchGroup, SwitchLabel } from '@headlessui/vue'

export default {
  name: 'ToggleButton',
  components: {
    Switch,
    SwitchDescription,
    SwitchGroup,
    SwitchLabel,
  },
  props: {
    description: {
      type: String,
      required: false,
      default: ''
    },
    title: {
      type: String,
      required: true
    },
    object: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    disabledGuide: {
      type: String,
      required: false,
      default: ''
    },
  },
  created () {
    if (this.disabled) {
      this.object[this.name] = false
    }
  },
}
</script>
