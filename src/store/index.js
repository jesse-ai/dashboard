import { createStore } from 'vuex'

// Modules
import socket from '@/store/modules/socket'
import backtest from '@/store/modules/backtest'
import importCandles from '@/store/modules/importCandles'
import paper from '@/store/modules/paper'


export default createStore({
  state: {
    modes: {
    }
  },
  mutations: {
  },
  getters: {
  },
  actions: {
  },
  modules: {
    socket,
    backtest,
    importCandles,
    paper
  },
  plugins: []
})
