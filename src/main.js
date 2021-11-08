import { createApp, markRaw } from 'vue'
import App from './App.vue'
import router from './router'
// Plugins
import websocket from './plugins/websocket'
import notyf from '@/plugins/notyf'
// Sentry
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'

import 'notyf/notyf.min.css'
import './assets/styles/styles.css'


import { createPinia } from 'pinia'
const pinia = createPinia()

// create Vue instance
const app = createApp(App)

// sentry
Sentry.init({
  app,
  dsn: 'https://f5d14d55118a4ed5895272599a63ec60@sentry.jesse.trade/2',
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      // tracingOrigins: ['localhost', 'my-site-url.com', /^\//],
      tracingOrigins: ['localhost', /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  logErrors: true,
})

app.use(pinia)
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
  store.notyf = markRaw(app.notyf)
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
