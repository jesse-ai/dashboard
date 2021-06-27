import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Plugins
import websocket from './plugins/websocket'
import notyf from '@/plugins/notyf'

import './assets/styles/styles.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(notyf, {
  duration: 5000,
  dismissible: true,
  ripple: false,
  position: { x: 'right', y: 'bottom' },
  types: [
    {
      type: 'info',
      background: '#009efa'
    }
  ]
})
app.use(websocket, {
  socketPath: process.env.VUE_APP_SOCKET_PATH
})
app.mount('#app')
