<template>
  <p>
    If you think something is wrong with your running live session, you can submit a report.
    By submitting this form, the logs of this session will be sent to Jesse's developers so we can see what's going on.
  </p>
  <br>
  <p>Your exchange API keys and strategies are safe and <b>are never sent to us.</b></p>
  <br>

  <FormInput title="Email (optional)"
             description="Enter your email address for us to know who sent the email and possibly reply back to you."
             input-type="email"
             placeholder="Email address..."
             name="email"
             :object="form"
  />

  <br>

  <FormTextarea title="Description (optional):"
                placeholder="Describe what you think is wrong in this session..."
                name="description"
                :object="form"
                :rows="10"
  />

  <br>

  <div class="flex justify-end item-center">
    <button class="btn-link text-indigo-600 dark:text-indigo-400 mr-4" @click="close">Cancel</button>
    <button class="btn-primary" @click="report">Submit</button>
  </div>
</template>

<script>
import FormInput from '@/components/Functional/FormInput'
import FormTextarea from '@/components/Functional/FormTextarea'
import axios from 'axios'
import notifier from '../notifier'

export default {
  name: 'ReportLiveSession',
  components: {
    FormInput,
    FormTextarea
  },
  props: {
    sessionId: {
      type: String,
      required: true,
    }
  },
  emits: ['close'],
  data () {
    return {
      form: {
        description: '',
        email: ''
      },
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    report () {
      axios.post('/report-exception', {
        description: this.form.description,
        email: this.form.email,
        traceback: 'manual report',
        mode: 'live',
        attach_logs: true,
        session_id: this.sessionId
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
    }
  }
}
</script>
