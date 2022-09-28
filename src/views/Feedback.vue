<template>
  <div class="w-full">
    <p id="feedback-description">
      I would love to hear your feedback whether it's about a bug, suggestion, something you like, or something you hate about Jesse!
    </p>

    <br>

    <FormTextarea title="Description"
                  placeholder="Type here..."
                  name="description"
                  :object="form"
    />

    <br>

    <div v-if="!hasLivePluginInstalled">
      <FormInput title="Email (must be registered with on Jesse.Trade)"
                 description="Enter your email address for us to know who sent the feedback and possibly reply back to you. It must be the email address of your account on Jesse.Trade"
                 input-type="email"
                 placeholder="Email address..."
                 name="email"
                 :object="form"
      />
      <br>
    </div>

    <div class="flex justify-end">
      <button id="feedback-cancel-button" class="btn-link mr-8"
              @click="close">
        Cancel
      </button>

      <button id="feedback-submit-button" class="btn-primary w-48"
              :disabled="!form.description.length || (!form.email.length && !hasLivePluginInstalled)"
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
import FormInput from '@/components/Functional/FormInput'
import FormTextarea from '@/components/Functional/FormTextarea'
import notifier from '../notifier'

export default {
  name: 'Feedback',
  components: { FormInput, FormTextarea },
  data () {
    return {
      form: {
        email: '',
        description: '',
      }
    }
  },
  computed: {
    ...mapState(useMainStore, ['modals', 'hasLivePluginInstalled'])
  },
  methods: {
    submit () {
      axios.post('/feedback', {
        description: this.form.description,
        email: this.form.email
      }).then((res) => {
        if (res.data.status === 'success') {
          this.form.description = ''
          this.form.email = ''
          notifier.success(res.data.message)
          this.close()
        } else if (res.data.status === 'error') {
          notifier.error(res.data.message)
        }
      }).catch(error => {
        notifier.error(`[${error.response.status}]: ${error.response.statusText}`)
      })
    },
    close () {
      this.modals.feedback = false
    }
  }
}
</script>
