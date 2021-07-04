import moment from 'moment'

const helpers = {
  timestampToTime (timestamp) {
    return moment.utc(timestamp).format('YYYY-MM-DD HH:mm:ss')
  },

  timestampToDate (timestamp) {
    return moment.utc(timestamp).format('YYYY-MM-DD')
  }
}

export default helpers
