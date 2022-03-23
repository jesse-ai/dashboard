<template>
  <div v-if="show.flag"
       class="relative bg-indigo-600 dark:bg-indigo-400 select-none text-white dark:text-black">
    <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
      <div class="pr-16 sm:text-center sm:px-16">
        <p class="font-medium">
          <span class="md:inline">
            {{ show.message }}
          </span>
          <span class="block sm:ml-2 sm:inline-block">
            <a href="https://docs.jesse.trade/docs/getting-started/update.html"
               target="_blank"
               class="font-bold underline"> Update Guide <span aria-hidden="true">&rarr;</span></a>
          </span>
        </p>
      </div>
      <div class="absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start">
        <button type="button"
                class="flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-0"
                @click="skip(show.type, show.version)"
        >
          <XIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { XIcon } from '@heroicons/vue/outline'
import { mapState } from 'pinia'
import { useMainStore } from '@/stores/main'
import helpers from '@/helpers'

export default {
  components: {
    XIcon,
  },
  data () {
    return {
      skipped: false
    }
  },
  computed: {
    ...mapState(useMainStore, ['updateInfo', 'systemInfo']),
    show () {
      // don't show if update info is not available
      if (this.skipped || !this.updateInfo || !this.updateInfo.is_update_info_available) {
        return {
          flag: false,
          message: '',
          type: '',
          version: '',
        }
      }

      // fetch skipped versions from the local storage
      const skippedJesseVersions = helpers.localStorageGet('skippedJesseVersions') || []
      const skippedLivePluginVersions = helpers.localStorageGet('skippedLivePluginVersions') || []

      // if the newest version of jesse is bigger than the current version
      if (this.updateInfo.jesse_latest_version > this.systemInfo.jesse_version && !skippedJesseVersions.includes(this.updateInfo.jesse_latest_version)) {
        return {
          flag: true,
          message: `Version "${this.updateInfo.jesse_latest_version}" of Jesse is available. You are currently running version "${this.systemInfo.jesse_version}".`,
          type: 'jesse',
          version: this.updateInfo.jesse_latest_version,
        }
      }

      // if the newest version of live_plugin_version is bigger than the current version
      if (this.updateInfo.jesse_live_latest_version > this.systemInfo.live_plugin_version && !skippedLivePluginVersions.includes(this.updateInfo.jesse_live_latest_version)) {
        return {
          flag: true,
          message: `Version "${this.updateInfo.jesse_live_latest_version}" of the live plugin is available. You are running "${this.systemInfo.live_plugin_version}".`,
          type: 'live',
          version: this.updateInfo.jesse_live_latest_version,
        }
      }

      return {
        flag: false,
        message: '',
        type: '',
        version: '',
      }
    }
  },
  methods: {
    skip (type, version) {
      // if the type is jesse, set in the local storage the version as skipped
      if (type === 'jesse') {
        const skippedJesseVersions = helpers.localStorageGet('skippedJesseVersions') || []
        skippedJesseVersions.push(version)
        helpers.localStorageSet('skippedJesseVersions', skippedJesseVersions)
        this.skipped = true
      }

      // if it's the live
      if (type === 'live') {
        const skippedLivePluginVersions = helpers.localStorageGet('skippedLivePluginVersions') || []
        skippedLivePluginVersions.push(version)
        helpers.localStorageSet('skippedLivePluginVersions', skippedLivePluginVersions)
        this.skipped = true
      }
    },
  },
}
</script>
