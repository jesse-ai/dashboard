import { createApp, markRaw } from 'vue'
import App from './App.vue'
import router from './router'
// Plugins
import websocket from './plugins/websocket'
// Sentry
// import * as Sentry from '@sentry/vue'
// import { Integrations } from '@sentry/tracing'

import './assets/styles/styles.css'


import { createPinia } from 'pinia'
const pinia = createPinia()

// create Vue instance
const app = createApp(App)

// // sentry
// Sentry.init({
//   app,
//   dsn: 'https://f5d14d55118a4ed5895272599a63ec60@sentry.jesse.trade/2',
//   integrations: [
//     new Integrations.BrowserTracing({
//       routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//       // tracingOrigins: ['localhost', 'my-site-url.com', /^\//],
//       // tracingOrigins: ['localhost', /^\//],
//       // allow tracingOrigins to be anything using regex
//       tracingOrigins: [/^\//],
//     }),
//   ],
//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
//   logErrors: true,
// })

app.use(pinia)
app.use(router)

let wsPath = ''
if (process.env.VUE_APP_SOCKET_PATH === '/') {
  wsPath = ((window.location.protocol === 'https:') ? 'wss://' : 'ws://') + window.location.host + '/ws'
} else {
  wsPath = `${process.env.VUE_APP_SOCKET_PATH}`
}
app.use(websocket, {
  socketPath: wsPath
})
pinia.use(({ store }) => {
  store.$router = markRaw(router)
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

// display a warning asking user if he's sure about closing the window when they try to close the browser tab
window.addEventListener('beforeunload', (event) => {
  event.returnValue = 'Are you sure you want to leave?'
})
