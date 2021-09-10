<template>
  <div class="p-6 mt-4">
    <CustomModal :object="openNewTicket" name="open">
      <template #head>
        Create New Ticket
      </template>

      <template #main>
        <label class="font-semibold">Title:</label>
        <input id="content" v-model="title"
               placeholder="Title"
               required
               name="content"
               class="input mt-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 sm:text-sm border border-gray-300" >
        <br>
        <label class="font-semibold">Description:</label>
        <textarea id="content" v-model="description"
                  placeholder="Inert your ticket..."
                  required
                  name="content"
                  rows="10"
                  class="dark:bg-gray-800 dark:border-gray-900 mt-2 block w-full focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 sm:text-sm border border-gray-300 rounded" />

        <br>
      </template>

      <template #footer>
        <button type="button" class="btn-primary" :disabled="!description.length || !title.length" @click="createTicket()">
          Create
        </button>
        <button type="button" class="font-medium select-none items-center text-gray-700 dark:text-gray-300 hover:underline focus:outline-none text-base tracking-wide mr-4" @click="openNewTicket.open = false">
          Cancel
        </button>
      </template>
    </CustomModal>
    <div class="px-6">
      <div class="flex justify-between items-center">
        <h1>
          Tickets
        </h1>
      
        <button v-if="tickets.length > 0" class="flex items-center focus:outline-none lg:ml-20" @click="openNewTicket.open = true">
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

          <button class="flex items-center focus:outline-none mt-6" @click="openNewTicket.open = true">
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
import CustomModal from '@/components/Modals/CustomModal'

export default {
  components: {
    PlusCircleIcon,
    CustomModal
  },
  data () {
    return {
      title: '',
      description: '',
      tickets: [],
      openNewTicket: { open: true }
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
    },
    createTicket () {
      axios.post('/ticket', {
        description: this.description,
        title: this.title,
      }).then((res) => {
        if (res.data.status === 'success') {
          this.description = ''
          this.title = ''
          this.notyf.success(res.data.message)
        } else if (res.data.status === 'error') {
          this.notyf.error(res.data.message)
        }
      }).catch(error => {
        this.notyf.error(`[${error.response.status}]: ${error.response.statusText}`)
      })
    }
  }
}
</script>
