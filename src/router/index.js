import { createRouter, createWebHistory } from 'vue-router'
import { useMainStore } from '@/stores/main'

// Layouts
import WithSidebar from '@/layouts/WithSidebar'

// Views
import Test from '@/views/Test' // For debug purpose
import Backtest from '@/views/Backtest'
import LiveTrade from '@/views/LiveTrade'
import Optimization from '@/views/Optimization'
import PaperTrade from '@/views/PaperTrade'
import PiniaTest from '@/views/PiniaTest'

import { watch } from 'vue'

// Check whether socket is connected or not
const isSocketConnected = (to, from, next) => {
  const store = useMainStore()

  if (store.isConnected) {
    next()
  } else {
    watch(store,
      (state) => {
        if (state.isConnected) {
          next()
        }
      },
      { deep: true }
    )
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
  },
  {
    path: '/pinia-test',
    component: WithSidebar,
    beforeEnter: isSocketConnected,
    children: [
      {
        path: '',
        name: 'PiniaTest',
        component: PiniaTest
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
