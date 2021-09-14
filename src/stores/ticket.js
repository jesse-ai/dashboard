import { defineStore } from 'pinia'
import axios from '@/http'

export const useTicketsStore = defineStore({
  id: 'ticket',
  state: () => ({
    tickets: []
  }),
  actions: {
    getTickets () {
      axios.get('/get-tickets').then(res => {
        if (res.data.status === 'success') {
          this.tickets = res.data.data
        }
      }).catch(error => {
        this.notyf.error(`[${error.response.status}]: ${error.response.statusText}`)
      })
    },
    ticketHasNewMessage () {
      for (const item of this.tickets.messages) {
        if (!item.seen) {
          return true
        }
      }
    }
  }
})
