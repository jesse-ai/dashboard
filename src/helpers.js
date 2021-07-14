import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const helpers = {
  timestampToTime (timestamp) {
    return dayjs(timestamp).utc().format('YYYY-MM-DD HH:mm:ss')
  },

  timestampToDate (timestamp) {
    return dayjs(timestamp).utc().format('YYYY-MM-DD')
  },

  currentTime () {
    return dayjs().utc().format('HH:mm:ss')
  }
}

export default helpers
