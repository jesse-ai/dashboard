import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
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
}

export default helpers
