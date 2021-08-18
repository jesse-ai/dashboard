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

export default {
  name: 'Feedback',
  data () {
    return {
      description: '',
    }
  },
  computed: {
    ...mapState(useMainStore, ['modals'])
  },
  methods: {
    submit () {
      const payload = new FormData()
      payload.append('description', this.description)

      axios.post('http://jesse-trade.test/api/feedback', payload, {
        headers: 'Authorization:Bearer bFS0KX2eWvpxRMi1J1a2akTp9TtGAri6DoTWKM1b'
      }).then((res) => {
        if (res.data === 'done') {
          this.description = ''
        }
      })
    }
  }
}
</script>
