<template>
  <svg v-if="object[name]" class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
    <!-- ... -->
  </svg>
</template>

<script>
export default {
  name: 'LoadingSvg',
  props: {
    object: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  }
}
</script>

