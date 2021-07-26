<template>
  <div class="flex items-center justify-between">
    <div class="font-semibold">{{ title }}</div>

    <div>
      <RadioGroup v-model="object[name]">
        <RadioGroupLabel class="sr-only">{{ title }}</RadioGroupLabel>

        <div class="bg-white rounded-md flex">
          <RadioGroupOption v-for="(setting, settingIdx) in options" :key="setting"
                            v-slot="{ checked }"
                            class="flex-1"
                            as="template"
                            :value="setting">
            <div :class="[settingIdx === 0 ? 'rounded-l-md' : '', settingIdx === options.length - 1 ? 'rounded-r-md' : '', checked ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200', 'relative border px-4 py-3 flex cursor-pointer focus:outline-none']">
              <span :class="[checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300', 'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center']" aria-hidden="true">
                <span class="rounded-full bg-white w-1.5 h-1.5" />
              </span>
              <div class="ml-3 flex flex-col">
                <RadioGroupLabel as="span" :class="[checked ? 'text-indigo-900' : 'text-gray-900', 'block text-sm font-medium']">
                  {{ setting }}
                </RadioGroupLabel>
              </div>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
  </div>
</template>

<script>
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

export default {
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  },
  props: {
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
    options: {
      type: Array,
      required: true
    }
  },
}
</script>
