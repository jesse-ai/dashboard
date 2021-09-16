import { defineStore } from 'pinia'
import axios from '@/http'

export const useTicketsStore = defineStore({
  id: 'ticket',
  state: () => ({
    tickets: [],
    newMessage: { haveMessage: false }
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
      this.getTickets()
      setTimeout(() => {
        for (const item of this.tickets) {
          for (const item2 of item.messages) {
            if (!item2.seen) {
              this.newMessage.haveMessage = true
              return
            }
          }
        }
      }, 1000)
    }
  }
})
