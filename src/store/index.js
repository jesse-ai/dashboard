import { createStore } from 'vuex'

export default createStore({
  state: {
    modes: {
      paper: {
        progressbar: {},
        positions: [],
        orders: [],
        general_info: []
      },
      backtest: {
        progressbar: {}
      },
      importCandles: {
        progressbar: {}
      }
    }
  },
  mutations: {
    updatePaperPositions (state, payload) {
      state.modes.paper.positions = payload.positions
    },
    updatePaperGeneralInfo (state, payload) {
      state.modes.paper.general_info = payload.general_info
    },
    updatePaperOrders (state, payload) {
      state.modes.paper.orders = payload.orders
    }
  },
  getters: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [
  ]
})
