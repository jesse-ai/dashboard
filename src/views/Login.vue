<template>
  <section v-if="open" class="absolute top-o l-0 w-full h-screen bg-white z-40 select-none flex items-center justify-center">
    <div class="text-center">
      <div class="w-full text-center">
        <img class="animate-bounce h-32 w-auto mx-auto" src="@/assets/imgs/jesse-logo.svg" alt="Jesse Logo" >
      </div>

      <br>
      <br>

      <h1 class="text-gray-700">Welcome Back!</h1>

      <br>

      <p class="opacity-70">Enter your password to continue:</p>

      <br>

      <div>
        <form action="/login" @submit.prevent="login">
          <div class="mt-1 flex">
            <div class="relative flex items-stretch flex-grow focus-within:z-10">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input id="password" v-model="password"
                     type="password"
                     name="password"
                     class="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded pl-10 sm:text-sm border-gray-300"
                     placeholder="Password..." >
            </div>

            <button type="submit"
                    class="relative inline-flex items-center px-4 py-4 rounded bg-indigo-600 dark:bg-indigo-400 hover:bg-indigo-700 dark:hover:bg-indigo-300 focus:outline-none text-white dark:text-black text-base tracking-wide ml-2">
              <ArrowNarrowRightIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { ArrowNarrowRightIcon, LockClosedIcon } from '@heroicons/vue/outline/esm'
import axios from '@/http'

export default {
  name: 'Login',
  components: {
    LockClosedIcon,
    ArrowNarrowRightIcon
  },
  data () {
    return {
      open: true,
      password: '',
    }
  },
  created () {
    if (sessionStorage.getItem('auth_key') !== null) {
      axios.defaults.headers.common.Authorization = sessionStorage.auth_key
      this.open = false
    }
  },
  methods: {
    login () {
      axios.post('/auth', {
        password: this.password,
      }).then(res => {
        sessionStorage.auth_key = res.data.auth_token

        axios.defaults.headers.common.Authorization = sessionStorage.auth_key

        this.open = false
      }).catch(error => {
        if (error.response.status === 401) {
          this.notyf.error('Incorrect password')
        } else {
          this.notyf.error(`[${error.response.status}]: ${error.response.statusText}`)
        }
      })
    }
  }
}
</script>
