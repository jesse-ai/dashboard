import WebSocketAsPromised from 'websocket-as-promised'
// import store from '@/store'
import socketActions from '@/plugins/socketActions'

import { useMainStore } from '@/stores/main'

export default {
  install: (app, settings) => {
    const wsp = new WebSocketAsPromised(settings.socketPath, {
      packMessage: data => JSON.stringify(data),
      unpackMessage: data => JSON.parse(data),
      attachRequestId: (data, requestId) => Object.assign({ id: requestId }, data),
      extractRequestId: data => data && data.id
    })

    const store = useMainStore()

    let openIntervalId = null
    let reopenAttempts = 3

    function wsOpen () {
      wsp.open()
        .then(async () => {
          store.isConnected = true

          if (openIntervalId) {
            clearInterval(openIntervalId)
          }

          // Reset reopen attempts after ws reopened
          reopenAttempts = 3
        })
        .catch(error => {
          console.error('Socket encountered error.', error)

          if (process.env.VUE_APP_IS_DEBUG === 'yes') {
            app.notyf.error(error.message)
          }
        })
    }

    wsOpen()

    wsp.onClose.addListener(async () => {
      console.log('Connection closed.')

      store.isConnected = false
      if (openIntervalId) clearInterval(openIntervalId)

      if (reopenAttempts > 0) {
        // Trying to re-open web-socket after close
        openIntervalId = setInterval(() => {
          console.log('Trying to re-open web-socket')
          reopenAttempts--
          wsOpen()
        }, 3000)
      } else {
        console.log('Socket can\'t re-establish connection!')
      }
    })

    // Listen ws events and pass data to vuex's actions
    wsp.onUnpackedMessage.addListener(async message => {
      const event = message.event
      const actions = socketActions.get(event)

      if (actions !== undefined) {
        // todo
        // actions.forEach(method => {
        //   store.dispatch(method, message)
        // })
      }
    })

    app.config.globalProperties.$wsp = wsp
    app.wsp = app.config.globalProperties.$wsp
  }
}
