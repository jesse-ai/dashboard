import { createStore } from 'vuex'

export default createStore({
  state: {
    modes: {
      paper: {
        positions: []
      }
    }
  },
  mutations: {
    updatePaperModeData (state, payload) {
      state.modes.paper.positions = payload.positions
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
