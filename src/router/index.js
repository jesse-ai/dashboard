import { createRouter, createWebHistory } from 'vue-router'
import { useMainStore } from '@/stores/main'

// Views
import Candles from '@/views/Candles'
import Backtest from '@/views/Backtest'
import Test from '@/views/Test' // For debug purpose
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
  { path: '/', redirect: '/backtest/1' },
  { path: '/backtest', redirect: '/backtest/1' },
  { path: '/candles', redirect: '/candles/1' },
  {
    path: '/candles/:id',
    component: Candles,
    name: 'Candles',
    beforeEnter: isSocketConnected,
  },
  {
    path: '/backtest/:id',
    component: Backtest,
    name: 'Backtest',
    beforeEnter: isSocketConnected,
  },
  {
    path: '/live-trade',
    component: LiveTrade,
    name: 'LiveTrade',
    beforeEnter: isSocketConnected,
  },
  {
    path: '/optimization',
    component: Optimization,
    name: 'Optimization',
    beforeEnter: isSocketConnected,
  },
  {
    path: '/paper-trade',
    component: PaperTrade,
    name: 'PaperTrade',
    beforeEnter: isSocketConnected,
  },
  {
    path: '/test',
    component: Test,
    name: 'Test',
    beforeEnter: isSocketConnected,
  },
  {
    path: '/pinia-test',
    component: PiniaTest,
    name: 'PiniaTest',
    beforeEnter: isSocketConnected,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
