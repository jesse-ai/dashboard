<template>
  <Nav v-if="isAuthenticated"/>

  <router-view v-if="isAuthenticated"/>

  <Login v-else/>
</template>


<script>
import Nav from '@/components/Nav'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useMainStore } from '@/stores/main'
import Login from '@/views/Login'
import axios from '@/http'


export default {
  name: 'App',
  components: {
    Nav, Login
  },
  computed: {
    ...mapState(useMainStore, ['routes', 'settings']),
    ...mapWritableState(useMainStore, ['isAuthenticated']),
  },
  watch: {
    isAuthenticated (newValue, oldValue) {
      if (newValue === true) {
        this.initiate()
      }
    },
    settings: {
      handler: function (newValue, oldValue) {
        this.updateConfig()
      },
      deep: true
    }
  },
  created () {
    if (sessionStorage.getItem('auth_key') !== null) {
      if (!window.Cypress) {
        this.setAuth()
      }
    }
  },
  methods: {
    setAuth () {
      axios.defaults.headers.common.Authorization = sessionStorage.auth_key

      this.isAuthenticated = true
    },
    ...mapActions(useMainStore, ['initiate', 'updateConfig'])
  },
}
</script>
