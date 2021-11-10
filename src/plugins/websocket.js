import WebSocketAsPromised from 'websocket-as-promised'
import socketActions from '@/plugins/socketActions'

import { useMainStore } from '@/stores/main'

export default {
  install: (app, settings) => {
    const mainStore = useMainStore()

    const loginWatchInterval = setInterval(function () {
      if (mainStore.isAuthenticated) {
        let url = settings.socketPath
        if (window.Cypress) {
          url = 'ws://127.0.0.1:8001/ws'
        }

        const wsp = new WebSocketAsPromised(`${url}?token=${sessionStorage.auth_key}`, {
          packMessage: data => JSON.stringify(data),
          unpackMessage: data => JSON.parse(data),
          attachRequestId: (data, requestId) => Object.assign({ id: requestId }, data),
          extractRequestId: data => data && data.id
        })

        let openIntervalId = null
        let reopenAttempts = 3

        function wsOpen () {
          wsp.open()
            .then(async () => {
              mainStore.isConnected = true

              if (openIntervalId) {
                clearInterval(openIntervalId)
              }

              if (reopenAttempts < 3) {
                app.notyf.success('WebSocket reconnected')
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



        wsp.onClose.addListener(async () => {
          console.log('Connection closed.')

          mainStore.isConnected = false
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

        // Listen ws events and pass data to Pinia's actions
        wsp.onUnpackedMessage.addListener(async message => {
          const event = message.event
          const data = message.data
          const id = message.id
          const actions = socketActions().get(event)

          // console.log(event, id, data)

          if (actions !== undefined) {
            actions.forEach(action => {
              action(id, data)
            })
          }
        })

        app.config.globalProperties.$wsp = wsp
        app.wsp = app.config.globalProperties.$wsp
        wsOpen()
        clearInterval(loginWatchInterval)
      }
    }, 1000)
  }
}
