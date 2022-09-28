<template>
  <div id="make-strategy-modal" class="w-full select-none">
    <p>
      Filling this form will create a new strategy class with all the starting methods in it.
    </p>

    <br>

    <label for="strategy" class="input-label mb-2">Strategy name:</label>
    <input id="strategy"
           v-model="form.name"
           type="text"
           name="strategy"
           placeholder="ex: MyAwesomeStrategy01"
           class="input">

    <div v-if="form.name.length">
      <br>
      <p>The strategy will be located at:</p>
      <pre
        class="mt-2 text-sm whitespace-pre-line px-6 py-3 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 dark:border-gray-800 border border-gray-200 select-text"
      >
          {{ `strategies/${form.name}/__init__.py` }}
        </pre>
    </div>

    <div class="flex justify-end mt-8">
      <button data-cy="cancel-make-strategy-button" class="btn-link mr-8" @click="modals.makeStrategy = false">Cancel</button>
      <button data-cy="make-strategy-button" class="btn-primary w-32" @click="create">Create</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'pinia'
import { useMainStore } from '@/stores/main'
import notifier from '../notifier'

export default {
  name: 'MakeStrategy',
  data () {
    return {
      form: {
        name: '',
      },
    }
  },
  computed: {
    ...mapState(useMainStore, ['strategies', 'modals']),
  },
  methods: {
    create () {
      if (!this.form.name.length) {
        notifier.error('Please fill the strategy name.')
        return
      }

      axios.post('/make-strategy', {
        name: this.form.name,
      }).then((res) => {
        if (res.data.status === 'success') {
          notifier.success('Successfully created strategy')
          this.strategies.push(this.form.name)
          this.strategies.sort()
          this.modals.makeStrategy = false
        } else {
          notifier.error(res.data.message)
        }
      }).catch(error => {
        notifier.error(`[${error.response.status}]: ${error.response.statusText}`)
      })
    }
  }
}
</script>
