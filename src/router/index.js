import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import WithSidebar from '@/layouts/WithSidebar'

// Views
import Test from '@/views/Test' // For debug purpose
import Backtest from '@/views/Backtest'
import LiveTrade from '@/views/LiveTrade'
import Optimization from '@/views/Optimization'
import PaperTrade from '@/views/PaperTrade'


const routes = [
  {
    path: '/',
    component: WithSidebar,
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
