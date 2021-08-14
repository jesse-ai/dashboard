<template>
  <div class="w-full select-none">
    <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded">
      <h3>
        Why login?
      </h3>

      <p class="mt-2">
        You need to login to your account at <a href="https://jesse.trade" class="underline" target="_blank">Jesse.Trade</a> to be able to:
      </p>

      <ul class="ml-4 mt-2">
        <li>1. Send feedbacks</li>
        <li>2. Send exception reports to receive support easier</li>
        <li>3. Use the live trade plugin</li>
      </ul>
    </div>

    <br>

    <form action="/login" method="post" @submit.prevent="submit">
      <label for="email" class="input-label mb-2">Email</label>
      <input id="email"
             v-model="form.email"
             type="email"
             name="email"
             placeholder="Your email address at Jesse.Trade..."
             class="input">

      <br>

      <label for="password" class="input-label mb-2">Password</label>
      <input id="password"
             v-model="form.password"
             type="password"
             name="password"
             placeholder="Your password address at Jesse.Trade..."
             class="input">

      <br>

      <div class="flex justify-end">
        <button class="btn-link mr-8" @click="modals.jesseTradeLogin = false">Cancel</button>
        <button class="btn-primary w-32" :disabled="!description.length" type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'pinia'
import { useMainStore } from '@/stores/main'

export default {
  name: 'Feedback',
  data () {
    return {
      form: {
        email: '',
        password: '',
      },
      description: ''
    }
  },
  computed: {
    ...mapState(useMainStore, ['modals'])
  },
  methods: {
    submit () {
      const payload = new FormData()
      payload.append('description', this.description)

      axios.post('https://jesse-trade.test/api/feedback', payload, {
        headers: 'Authorization:Bearer bFS0KX2eWvpxRMi1J1a2akTp9TtGAri6DoTWKM1b'
      }).then((res) => {
        this.notify.success('Logged in successfully')
      }).catch(error => {
        this.notyf.error(`[${error.response.status}]: ${error.response.statusText}`)
      })
    }
  }
}
</script>
