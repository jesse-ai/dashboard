<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <SwitchGroup as="div" class="w-full flex items-center justify-between mb-3">
    <span class="flex-grow flex flex-col">
      <SwitchLabel as="span" class="font-medium text-gray-700 dark:text-gray-200" passive>{{ title }}</SwitchLabel>
      <SwitchDescription as="span" class="text-gray-500 dark:text-gray-400">{{ description }}</SwitchDescription>
    </span>
    <Switch v-model="value" :class="[value ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-gray-200 dark:bg-gray-600', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none']">
      <span aria-hidden="true" :class="[value ? 'translate-x-5 dark:bg-gray-800' : 'translate-x-0 dark:bg-gray-400', 'bg-white  pointer-events-none inline-block h-5 w-5 rounded-full shadow transform ring-0 transition ease-in-out duration-200']" />
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
    value: {
      type: Boolean,
      required: true
    }
  },
}
</script>
