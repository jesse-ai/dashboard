<template>
  <div class="p-6 mt-4">
    <div class="px-6">
      <h1>
        Tickets
      </h1>

      <br>

      <div v-if="tickets && tickets.length > 0" class="w-full">
        <router-link v-for="item in tickets" :key="item.id" to="#" class="p-2">
          <div class="w-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 border dark:border-gray-900 rounded-md">
            <div class="flex justify-between items-center">
              <div class="">
                {{ item.title }}
              </div>
              <div v-if="newMessage(item.messages)">
                New Message
              </div>
              <div class="text-xs text-gray-400">
                {{ createTime(item.messages[item.messages.length-1].created_at) }}
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <div v-else>
        You have'nt create any ticket.
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data () {
    return {
      tickets: []
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
