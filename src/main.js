import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
// import { pinia } from './stores'

// Plugins
import websocket from './plugins/websocket'
import notyf from '@/plugins/notyf'

import './assets/styles/styles.css'

import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
// app.use(store)
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

// import and register vue components globally
const files = require.context('./components', true, /\.vue$/i)
files.keys().map(key =>
  app.component(
    key
      .split('/')
      .pop()
      .split('.')[0],
    files(key).default
  )
)

app.mount('#app')
