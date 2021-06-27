import WebSocketAsPromised from 'websocket-as-promised'
import store from '@/store'
import socketActions from '@/plugins/socketActions'

export default {
  install: (app, settings) => {
    const wsp = new WebSocketAsPromised(settings.socketPath, {
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
          await store.dispatch('socket/setIsConnected', true)

          if (openIntervalId) {
            clearInterval(openIntervalId)
          }

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

      await store.dispatch('socket/setIsConnected', false)
      if (openIntervalId) clearInterval(openIntervalId)

      if (reopenAttempts > 0) {
        // Trying to re-open web-socket
        openIntervalId = setInterval(() => {
          console.log('Trying to re-open web-socket')
          reopenAttempts--
          wsOpen()
        }, 3000)
      } else {
        console.log('Socket can\'t re-establish connection!')
      }
    })

    wsp.onUnpackedMessage.addListener(async message => {
      const event = message.event
      const actions = socketActions.get(event)

      // console.log(1, event, message)

      if (actions !== undefined) {
        actions.forEach(method => {
          store.dispatch(method, message)
        })
      }
    })

    app.config.globalProperties.$wsp = wsp
    app.wsp = app.config.globalProperties.$wsp
  }
}
