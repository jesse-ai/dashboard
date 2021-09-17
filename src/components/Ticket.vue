<template>
  <button class="w-full border dark:border-gray-900 hover:shadow-sm flex justify-between items-center rounded-md"
          @click="ticketMessage.open = true">
    <div class="w-full flex items-center justify-between h-12 px-2">
      <div>
        {{ isNaN(parseInt(ticket.title)) ? '' : '#' }}{{ ticket.title }}
      </div>
      <div class="text-xs text-gray-400">
        {{ ticket.created_at == 'now' ? 'now' : createTime(ticket.messages[ticket.messages.length-1].created_at) }}
      </div>
    </div>
    <div v-if="newMessageFun(ticket.messages)" class="flex items-center tickets-center justify-center h-12 w-40 text-green-700 dark:text-green-200 bg-green-200 dark:bg-green-700
                 rounded-r text-xs
                 select-none">
      New Message
    </div>

    <TicketMessages :object="ticketMessage" :name="'open'" :opened="ticketMessage.open" :new-message="newMessage"
                    :ticket="ticket"/>
  </button>
</template>

<script>
import TicketMessages from '@/components/TicketMessages'
import moment from 'moment'

export default {
  name: 'Ticket',
  components: {
    TicketMessages
  },
  props: {
    ticket: {
      type: Object,
      required: true,
    },
    newMessage: {
      type: Object,
      required: true,
    }
  },
  data () {
    return {
      ticketMessage: { open: false },
    }
  },
  methods: {
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
    createTime (time) {
      const msTime = moment(time).valueOf()

      if (msTime > moment().subtract(1, 'days').valueOf()) {
        return moment(time).format('hh:mm')
      } else {
        return moment(time).format('MMM Do YY')
      }
    },
  }
}
</script>
