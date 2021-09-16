<template>
  <div class="w-full p-6 mt-4">
    <TicketMessages :object="ticketMessage" :name="'open'" :new-message="newMessage" :ticket="selectedTicket"/>
    <SlideOver :object="openNewTicket" name="open" title="Create New Ticket" width="max-w-2xl">
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

      <br>
      
      <div class="flex justify-end">
        <button type="button" class="font-medium select-none items-center text-gray-700 dark:text-gray-300 hover:underline focus:outline-none text-base tracking-wide mr-4" @click="openNewTicket.open = false">
          Cancel
        </button>

        <button type="button" class="btn-primary w-48" :disabled="!description.length || !title.length" @click="createTicket()">
          Create
        </button>
      </div>
    </SlideOver>
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
          <button v-for="item in tickets" :key="item.id" class="border dark:border-gray-900 hover:shadow-sm flex justify-between items-center rounded-md"
                  @click="selectedTicket = item; ticketMessage.open = true">
            <div class="w-full flex items-center justify-between h-12 px-2">
              <div>
                {{ isNaN(parseInt(item.title)) ? '' : '#' }}{{ item.title }}
              </div>
              <div class="text-xs text-gray-400">
                {{ item.created_at == 'now' ? 'now' : createTime(item.messages[item.messages.length-1].created_at) }}
              </div>
            </div>
            <div v-if="newMessageFun(item.messages)" class="flex items-center justify-center h-12 w-40 text-green-700 dark:text-green-200 bg-green-200 dark:bg-green-700
                 rounded-r text-xs
                 select-none">
              New Message
            </div>
          </button>
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
import { mapActions, mapWritableState } from 'pinia'
import { useTicketsStore } from '@/stores/ticket'
import axios from 'axios'
import moment from 'moment'
import { PlusCircleIcon } from '@heroicons/vue/solid'
import SlideOver from '@/components/Functional/SlideOver'
import TicketMessages from '@/components/TicketMessages'

export default {
  components: {
    PlusCircleIcon,
    TicketMessages,
    SlideOver
  },
  data () {
    return {
      ticketMessage: { open: false },
      title: '',
      description: '',
      openNewTicket: { open: false },
      selectedTicket: {}
    }
  },
  computed: {
    ...mapWritableState(useTicketsStore, [
      'tickets', 'newMessage'
    ]),
  },
  watch: {
    ticketMessage: {
      handler () {
        this.ticketMessageCheck()
      },
      deep: true
    },
  },
  created () {
    this.ticketHasNewMessage()
  },
  methods: {
    ...mapActions(useTicketsStore, ['ticketHasNewMessage']),
    ticketMessageCheck () {
      if (this.ticketMessage.open === false) {
        setTimeout(() => {
          this.selectedTicket = {}
        }, 200)
      }
    },
    createTime (time) {
      const msTime = moment(time).valueOf()

      if (msTime > moment().subtract(1, 'days').valueOf()) {
        return moment(time).format('hh:mm')
      } else {
        return moment(time).format('MMM Do YY')
      }
    },
    newMessageFun (messages) {
      // this method check last ten messages of tickets for find unseen message
      let lastTen = messages
      if (messages.length > 10) {
        lastTen = messages.slice(messages.length - 11, messages.length)
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
          const newTicket = {}
          newTicket.title = this.title
          newTicket.description = this.description
          newTicket.created_at = 'now'
          newTicket.id = 1
          if (this.tickets.length > 0) {
            newTicket.id = this.tickets[0].id + 1
          }
          newTicket.messages = []

          const message = {}
          message.id = 1
          message.seen = true
          message.ticket = newTicket.id
          message.description = this.description

          newTicket.messages.push(message)

          this.description = ''
          this.title = ''
          this.openNewTicket.open = false
          
          this.tickets.unshift(newTicket)

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
