import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import _ from 'lodash'
dayjs.extend(utc)

const helpers = {
  timestampToTime (timestamp) {
    return dayjs(parseInt(timestamp)).utc().format('YYYY-MM-DD HH:mm:ss')
  },

  timestampToTimeOnly (timestamp) {
    return dayjs(parseInt(timestamp)).utc().format('HH:mm:ss')
  },

  timestampToDate (timestamp) {
    return dayjs(parseInt(timestamp)).utc().format('YYYY-MM-DD')
  },

  currentTime () {
    return dayjs().utc().format('HH:mm:ss')
  },

  localStorageSet (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  localStorageGet (key) {
    return JSON.parse(localStorage.getItem(key))
  },

  getDefaultFromLocalStorage (key, defaultForm) {
    return _.merge(defaultForm, helpers.localStorageGet(key))
  },

  secondsToHumanReadable (seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds - (hours * 3600)) / 60)
    const secondsLeft = _.round(
      seconds - (hours * 3600) - (minutes * 60),
      2
    )
    return `${hours}h ${minutes}m ${secondsLeft}s`
  },

  remainingTimeText (seconds) {
    if (Math.round(seconds) === 0) {
      return 'Please wait...'
    }

    if (seconds > 60) {
      const remainingSecondsInReadableFormat = this.secondsToHumanReadable(
        seconds
      )

      return `${remainingSecondsInReadableFormat} remaining...`
    }

    return `${Math.round(seconds)} seconds remaining...`
  },

  /**
   * A helper function that rounds the input to 2 decimals but only if the number is bigger than 1.
   * Used for displaying prices
   */
  roundPrice (price) {
    if (price > 1) {
      return _.round(price, 2)
    }

    return price
  },
}

export default helpers
