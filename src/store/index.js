import { createStore } from 'vuex'

// Modules
import socket from '@/store/modules/socket'
import backtest from '@/store/modules/backtest'
import importCandles from '@/store/modules/importCandles'
import paper from '@/store/modules/paper'


export default createStore({
  state: {
    modes: {
      // paper: {
      //   progressbar: {},
      //   positions: [],
      //   orders: [],
      //   general_info: []
      // },
      // backtest: {
      //   progressbar: {}
      // },
      // importCandles: {
      //   progressbar: {}
      // }
    }
  },
  mutations: {
    // updatePaperPositions (state, payload) {
    //   state.modes.paper.positions = payload.positions
    // },
    // updatePaperGeneralInfo (state, payload) {
    //   state.modes.paper.general_info = payload.general_info
    // },
    // updatePaperOrders (state, payload) {
    //   state.modes.paper.orders = payload.orders
    // }
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
