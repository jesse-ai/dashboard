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
  }
}

export default helpers
