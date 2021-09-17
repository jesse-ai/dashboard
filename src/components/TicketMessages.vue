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
                        <div class="relative w-full flex justify-between items-start">
                          <div :class="((item.user_id === ticket.user_id) && messageEdit(item)) ? 'w-11/12' : 'w-full'" class="break-words">
                            {{ item.description }}
                          </div>

                          <!-- <button v-if="(item.user_id === ticket.user_id) && messageEdit(item)" class="w-6 p-1 focus:outline-none rounded-full dark:hover:bg-gray-700">
                            
                          </button> -->
                          <Menu v-if="(item.user_id === ticket.user_id) && messageEdit(item)" as="div" class="relative z-40">
                            <MenuButton class="w-6 p-1 focus:outline-none rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                              <span class="sr-only">Settings</span>
                              <DotsVerticalIcon class="w-4 h-4" />
                            </MenuButton>

                            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
                                        leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                              <MenuItems class="bg-white dark:bg-gray-700 origin-top-right absolute right-0 mt-2 w-64 rounded-md border border-gray-200 dark:border-gray-500 shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 dark:divide-gray-900">
                                <div class="py-1">
                                  <MenuItem v-slot="{ active }">
                                    <button :class="[active ? 'bg-gray-100 dark:bg-gray-600' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300']"
                                            @click="edit(item)">
                                      Edit
                                    </button>
                                  </MenuItem>
                                </div>
                              </MenuItems>
                            </transition>
                          </Menu>
                        </div>
                        <div class="w-full flex justify-end text-xs border-t dark:border-gray-900 mt-2 py-1">
                          {{ item.created_at === 'now' ? 'now' : createTime(item.created_at) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- edit message  -->
              <div v-if="editMode" class="w-full flex justify-between mt-6 bg-gray-300 dark:bg-gray-800 p-2 border-b border-gray-500 text-gray-500 dark:text-gray-400">
                <div class="bg-indigo-500 dark:bg-indigo-400 pr-1 mr-2" />
                <div class="w-full ">
                  <div class="text-xs font-semibold">
                    Edit Ticket
                  </div>
                  <div class="text-xs mt-1">
                    {{ editItem.description.length > 30 ? editItem.description.substring(0, 30) + '...' : editItem.description }}
                  </div>
                </div>
                <button class="hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-full" @click="message = ''; editMode = false">
                  <XIcon class="h-5 w-5" />
                </button>
              </div>

              <!-- send or edit message -->
              <div :class="editMode ? '' : 'mt-6'" class="flex items-center bg-gray-300 dark:bg-gray-800 rounded-b-lg">
                <textarea id="content" v-model="message"
                          placeholder="Inert your message..."
                          required
                          name="content"
                          rows="3"
                          class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-0 focus:border-gray-300 dark:focus:border-gray-800 sm:text-sm bg-gray-300 dark:bg-gray-800 dark:border-gray-800 rounded-b-lg" />

                <button v-if="editMode" class="h-full rounded-b-lg rounded-l-none px-2" :disabled="message.length == 0 || message == editItem.description" @click="editMessage()">
                  <CheckCircleIcon class="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                </button>

                <button v-else class="h-full rounded-b-lg rounded-l-none px-2" :disabled="message.length == 0" @click="sendMessage()">
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
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { XIcon, PaperAirplaneIcon, DotsVerticalIcon, CheckCircleIcon } from '@heroicons/vue/outline'
import { mapActions } from 'pinia'
import { useTicketsStore } from '@/stores/ticket'
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'TicketMessages',
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    XIcon,
    PaperAirplaneIcon,
    DotsVerticalIcon,
    CheckCircleIcon
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
    },
    opened: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      editItem: {},
      editMode: false,
      message: '',
      firstUnReadMessageID: null,
      displayUnRead: false
    }
  },
  watch: {
    opened: {
      handler () {
        this.checkTickets()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(useTicketsStore, ['ticketHasNewMessage']),
    editMessage () {
      axios.post('/edit-message', {
        ticket_id: this.ticket.id,
        message_id: this.editItem.id,
        description: this.message
      }).then(res => {
        if (res.data.status === 'success') {
          const editItem = this.ticket.messages.find(element => element === this.editItem)
          editItem.description = this.message

          this.editItem = {}
          this.editMode = false
          this.message = ''
        }
      })
    },
    edit (item) {
      this.editMode = true
      this.message = item.description
      this.editItem = item
      this.checkTickets()
    },
    messageEdit (item) {
      const msTime = moment(item.created_at).valueOf()

      if (msTime > moment().subtract(1, 'days').valueOf()) {
        return true
      }
      return false
    },
    checkTickets () {
      // got to end of page when page create
      setTimeout(() => {
        if (this.ticket.messages && this.opened) {
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
              this.ticketHasNewMessage()
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
          tempMessage.user_id = this.ticket.user_id

          this.ticket.messages.push(tempMessage)
          this.message = ''

          this.notyf.success(res.data.message)
        } else if (res.data.status === 'error') {
          this.notyf.error(res.data.message)
        }
      }).catch(error => {
        console.log(error)
        this.notyf.error(`[${error.response.status}]: ${error.response.statusText}`)
      })
    }
  }
}
</script>
