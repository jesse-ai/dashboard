<template>
  <Login />

  <Nav />

  <router-view />
</template>


<script>
import Nav from '@/components/Nav'
import { mapActions, mapState } from 'pinia'
import { useMainStore } from '@/stores/main'
import Login from '@/views/Login'

export default {
  name: 'App',
  components: {
    Nav, Login
  },
  computed: {
    ...mapState(useMainStore, ['routes', 'settings'])
  },
  created () {
    this.initiate()
  },
  methods: {
    ...mapActions(useMainStore, ['initiate'])
  }
}
</script>
