import moment from 'moment'

const helpers = {
  timestampToTime (timestamp) {
    return moment.utc(timestamp).format('YYYY-MM-DD HH:mm:ss')
  }
}

export default helpers
