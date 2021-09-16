<template>
  <div>
    <TransitionRoot as="template" :show="object[name]">
      <Dialog as="div" static class="fixed z-10 inset-0 overflow-y-auto" :open="object[name]"
              @close="object[name] = false">
        <div id="chat" class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                           leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100"
                           leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div class="h-full my-4 inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-left shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full ">
              <div class="w-full flex justify-between items-center px-4 mt-4">
                <h2>
                  {{ ticket.title }}
                </h2>

                <button @click="object[name] = false">
                  <XIcon class="h-5 w-5 text-gray-400 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-600" />
                </button>
              </div>

              <!-- main section -->
              <div class="mt-4 px-4">
                <div >
                  <div v-for="item in ticket.messages" :key="item.id" class="w-full">
                    <div v-if="checkSeen(item) && displayUnRead" class="flex items-center mb-2" >
                      <div class="w-full pt-0.5 bg-gray-200
                         dark:bg-gray-900" />
                      <div class="w-full flex justify-center border-2 border-gray-200 dark:border-gray-900 rounded-3xl text-xs p-1">
                        New messages
                      </div>
                      <div class="w-full pt-0.5 bg-gray-200 dark:bg-gray-900" />
                    </div>
                    <div :class="item.user_id === ticket.user_id ? 'justify-end' : 'justify-start'" class="w-full flex mb-2">
                      <div class="w-2/3 p-2 bg-gray-100 dark:bg-gray-600 text-sm rounded-md">
                        <div>
                          {{ item.description }}
                        </div>
                        <div class="w-full flex justify-end text-xs border-t dark:border-gray-900 mt-2 py-1">
                          {{ item.created_at === 'now' ? 'now' : createTime(item.created_at) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex items-center bg-gray-300 dark:bg-gray-800 rounded-b-lg">
                <textarea id="content" v-model="message"
                          placeholder="Inert your message..."
                          required
                          name="content"
                          rows="2"
                          class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-0 focus:border-gray-300 dark:focus:border-gray-800 sm:text-sm bg-gray-300 dark:bg-gray-800 dark:border-gray-800 rounded-b-lg" />

                <button class="h-full rounded-b-lg rounded-l-none px-2" :disabled="message.length == 0" @click="sendMessage()">
                  <PaperAirplaneIcon class="w-6 h-6 rotate-90 text-indigo-500 dark:text-indigo-400" />
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script>
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon, PaperAirplaneIcon } from '@heroicons/vue/outline'
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'TicketMessages',
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    XIcon,
    PaperAirplaneIcon
  },
  props: {
    object: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    ticket: {
      type: Object,
      required: true
    },
    newMessage: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      message: '',
      firstUnReadMessageID: null,
      displayUnRead: false
    }
  },
  watch: {
    ticket: {
      handler () {
        this.checkTickets()
      },
      deep: true
    },
  },
  methods: {
    checkTickets () {
      setTimeout(() => {
        // got to end of page when page create
        if (this.ticket.messages) {
          const container = document.getElementById('chat')
          container.scrollIntoView(false)
        }
      }, 20)
    },
    checkSeen (item) {
      if (!this.firstUnReadMessageID && !item.seen) {
        this.firstUnReadMessageID = item.id
        this.displayUnRead = true
        setTimeout(() => {
          this.displayUnRead = false
        }, 5000)
        this.seenMessage()
      }

      return this.firstUnReadMessageID === item.id
    },
    createTime (time) {
      const msTime = moment(time).valueOf()

      if (msTime > moment().subtract(1, 'days').valueOf()) {
        return moment(time).format('hh:mm')
      } else {
        return moment(time).format('MMM Do YY hh:mm')
      }
    },
    seenMessage () {
      axios.post('/seen-message', {
        ticket_id: this.ticket.id
      }).then((res) => {
        if (res.status === 200) {
          for (const item of this.ticket.messages) {
            if (!item.seen) {
              item.seen = true
              this.newMessage.haveMessage = false
            }
          }
        }
      })
    },
    sendMessage () {
      axios.post('/message', {
        ticket_id: this.ticket.id,
        description: this.message
      }).then((res) => {
        if (res.data.status === 'success') {
          const tempMessage = {}
          tempMessage.id = Math.floor(Math.random() * (9999 - 1111) + 1111)
          tempMessage.ticket_id = this.ticket.id
          tempMessage.description = this.message
          tempMessage.created_at = 'now'
          tempMessage.seen = true

          this.ticket.messages.push(tempMessage)
          this.message = ''

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
