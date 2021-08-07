import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_HTTP_PATH

export default axios
