<template>
  <div class="container mx-auto py-5">
    <HelloWorld/>

    <ThemeSwitch/>

    <div class="text-primary dark:text-primary-dark">
      Primary color
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import ThemeSwitch from '@/components/ThemeSwitch'


export default {
  name: 'Home',
  components: {
    HelloWorld,
    ThemeSwitch
  }
}
</script>
