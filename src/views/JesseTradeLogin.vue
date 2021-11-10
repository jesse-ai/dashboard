<template>
  <div class="w-full select-none">
    <div id="login-modal-description" class="bg-gray-100 dark:bg-gray-700 p-4 rounded">
      <h3>Why login?</h3>
      <div class="opacity-80">
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
      <h3>Not registered?</h3>
      <div class="opacity-80">
        <p class="mt-2">
          Creating an account is free and takes only a few seconds. You can register <a class="underline" href="https://jesse.trade/register" target="_blank">here</a>.
        </p>
      </div>
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

      <div class="flex justify-end mt-8">
        <button data-cy="login-cancel-button" class="btn-link mr-8" type="reset" @click="modals.jesseTradeLogin = false">Cancel</button>
        <button data-cy="login-submit-button" class="btn-primary w-32" type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapWritableState } from 'pinia'
import { useMainStore } from '@/stores/main'

export default {
  name: 'JesseTradeLogin',
  data () {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  computed: {
    ...mapState(useMainStore, ['modals']),
    ...mapWritableState(useMainStore, ['isLoggedInToJesseTrade']),
  },
  methods: {
    submit () {
      axios.post('/login-jesse-trade', {
        email: this.form.email,
        password: this.form.password,
      }).then((res) => {
        if (res.data.status === 'success') {
          this.notyf.success(res.data.message)
          this.isLoggedInToJesseTrade = true
          this.modals.jesseTradeLogin = false
        } else {
          this.notyf.error(res.data.message)
        }
      }).catch(error => {
        this.notyf.error(`[${error.response.status}]: ${error.response.statusText}`)
      })
    }
  }
}
</script>
