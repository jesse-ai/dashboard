import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

// Layouts
import WithSidebar from '@/layouts/WithSidebar'

// Views
import Test from '@/views/Test' // For debug purpose
import Backtest from '@/views/Backtest'
import LiveTrade from '@/views/LiveTrade'
import Optimization from '@/views/Optimization'
import PaperTrade from '@/views/PaperTrade'

// Check whether socket is connected or not
const isSocketConnected = (to, from, next) => {
  if (store.state.socket.isConnected) {
    next()
  } else {
    // Wait socket to be connected if page reloaded
    const unwatch = store.watch(state => state.socket.isConnected, (connected) => {
      if (connected) {
        next()
        // https://vuex.vuejs.org/api/#watch
        unwatch()
      }
    })
  }
}

const routes = [
  {
    path: '/',
    component: WithSidebar,
    beforeEnter: isSocketConnected,
    children: [
      {
        path: '',
        name: 'Backtest',
        component: Backtest
      }
    ]
  },
  {
    path: '/live-trade',
    component: WithSidebar,
    beforeEnter: isSocketConnected,
    children: [
      {
        path: '',
        name: 'LiveTrade',
        component: LiveTrade
      }
    ]
  },
  {
    path: '/optimization',
    component: WithSidebar,
    beforeEnter: isSocketConnected,
    children: [
      {
        path: '',
        name: 'Optimization',
        component: Optimization
      }
    ]
  },
  {
    path: '/paper-trade',
    component: WithSidebar,
    beforeEnter: isSocketConnected,
    children: [
      {
        path: '',
        name: 'PaperTrade',
        component: PaperTrade
      }
    ]
  },
  {
    path: '/test',
    component: WithSidebar,
    beforeEnter: isSocketConnected,
    children: [
      {
        path: '',
        name: 'Test',
        component: Test
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
