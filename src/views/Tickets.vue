<template>
  <div class="p-6 mt-4">
    <div class="px-6">
      <div class="flex justify-between items-center">
        <h1>
          Tickets
        </h1>
      
        <button v-if="tickets.length > 0" class="flex items-center focus:outline-none lg:ml-20">
          <div class="mr-1 text-sm text-indigo-600 dark:text-indigo-400">
            Create new ticket 
          </div>
          <PlusCircleIcon class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </button>
      </div>

      <br>

      <div v-if="tickets && tickets.length > 0">
        <div class="w-full grid grid-cols-1 gap-4">
          <router-link v-for="item in tickets" :key="item.id" to="#"
                       class="py-2">
            <div class="w-full relative p-2 hover:bg-gray-50 dark:hover:bg-gray-700 border dark:border-gray-900 rounded-md">
              <div class="flex justify-between items-center">
                <div class="">
                  # {{ item.title }}
                </div>
                <div class="text-xs text-gray-400">
                  {{ createTime(item.messages[item.messages.length-1].created_at) }}
                </div>
              </div>
              <div v-if="newMessage(item.messages)" class=" absolute right-0 bottom-8">
                <div class="w-4 h-4 bg-green-400 dark:bg-green-500 rounded-full" />
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div v-else class="px-2 mt-8">
        <div class="w-full">
          <div class="text-base">
            You have not created any tickets.
          </div>

          <button class="flex items-center focus:outline-none mt-6">
            <div class="mr-1 text-indigo-600 hover:underline dark:text-indigo-400">
              Create new ticket 
            </div>
            <PlusCircleIcon class="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { PlusCircleIcon } from '@heroicons/vue/solid'

export default {
  components: {
    PlusCircleIcon,
  },
  data () {
    return {
      tickets: [],
    }
  },
  created () {
    axios.get('/get-tickets').then(res => {
      if (res.data.status === 'success') {
        this.tickets = res.data.data
      }
    }).catch(error => {
      this.notyf.error(`[${error.response.status}]: ${error.response.statusText}`)
    })
  },
  methods: {
    createTime (time) {
      const msTime = moment(this.time).valueOf()
      
      if (msTime > moment().subtract(1, 'days').valueOf()) {
        return moment(this.time).format('hh:mm')
      } else {
        return moment(this.time).format('MMM Do YY')
      }
    },
    newMessage (messages) {
      // this method check last ten messages of tickets for find unseen message
      let lastTen = messages
      if (messages.length > 10) {
        lastTen = messages.slice(messages.length - 11, messages.length - 1)
      }

      for (const item of lastTen) {
        if (item.seen === false) {
          return true
        }
      }
    }
  }
}
</script>
