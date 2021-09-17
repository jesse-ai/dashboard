<template>
  <div class="w-full p-6 mt-4">
    <!-- create ticket slide over -->
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
      
        <!-- create ticket button when there is ticket -->
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
          <div v-for="ticket in tickets" :key="ticket.id" class="w-full">
            <Ticket :ticket="ticket" :new-message="newMessage" />
          </div>
        </div>
      </div>

      <div v-else class="px-2 mt-8">
        <div class="w-full">
          <div class="text-base">
            You have not created any tickets.
          </div>

          <!-- create ticket button when there's no ticket -->
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
import { PlusCircleIcon } from '@heroicons/vue/solid'
import SlideOver from '@/components/Functional/SlideOver'
import Ticket from '@/components/Ticket'

export default {
  components: {
    PlusCircleIcon,
    SlideOver,
    Ticket
  },
  data () {
    return {
      title: '',
      description: '',
      openNewTicket: { open: false },
    }
  },
  computed: {
    ...mapWritableState(useTicketsStore, [
      'tickets', 'newMessage'
    ]),
  },
  created () {
    this.ticketHasNewMessage()
  },
  methods: {
    ...mapActions(useTicketsStore, ['ticketHasNewMessage']),
    createTicket () {
      axios.post('/ticket', {
        description: this.description,
        title: this.title,
      }).then((res) => {
        if (res.data.status === 'success') {
          // create temp ticket
          const newTicket = {}
          newTicket.title = this.title
          newTicket.description = this.description
          newTicket.created_at = 'now'
          newTicket.id = res.data.ticket_id
          newTicket.messages = []

          // create temp message for created ticket
          const message = {}
          message.id = Math.floor(Math.random() * (9999 - 1111) + 1111)
          message.seen = true
          message.ticket_id = newTicket.id
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
