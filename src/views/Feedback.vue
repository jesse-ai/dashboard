<template>
  <div class="w-full">
    <p>
      I would love to hear your feedback whether it's about a bug, suggestion, something you like, or something you hate about Jesse!
    </p>

    <br>

    <div class="mt-2">
      <div class="mt-1">
        <textarea id="description"
                  v-model="description"
                  name="description"
                  rows="8"
                  class="mt-1 input"
                  placeholder="Type here..." />
      </div>
    </div>

    <br>

    <CheckBox title="Send feedback as ticket" :object="ticket" name="send_ticket" />

    <br>

    <div class="flex justify-end">
      <button class="btn-link mr-8"
              @click="modals.feedback = false">
        Cancel
      </button>

      <button class="btn-primary w-48"
              :disabled="!description.length"
              @click="submit()">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'pinia'
import { useMainStore } from '@/stores/main'
import CheckBox from '@/components/Checkbox'

export default {
  name: 'Feedback',
  components: { CheckBox },
  data () {
    return {
      ticket: { send_ticket: false },
      description: '',
    }
  },
  computed: {
    ...mapState(useMainStore, ['modals'])
  },
  methods: {
    submit () {
      axios.post('/feedback', {
        description: this.description,
        ticket: this.ticket.send_ticket,
      }).then((res) => {
        if (res.data.status === 'success') {
          this.description = ''
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
