const getDefaultState = () => {
  return {
    progressbar: {},
    positions: [],
    orders: [],
    general_info: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE (state) {
    Object.assign(state, getDefaultState())
  },
  SET_PROGRESSBAR ({ state }, payload) {
    state.progressbar = payload
  },
  SET_POSITIONS ({ state }, payload) {
    state.positions = payload
  },
  SET_ORDERS ({ state }, payload) {
    state.orders = payload
  },
  SET_GENERAL_INFO ({ state }, payload) {
    state.general_info = payload
  }
}

// The Vuex state, except of mutations, should always be accessed by getters, including actions
const getters = {
  progressbar: (state) => state.progressbar,
  positions: (state) => state.positions,
  orders: (state) => state.orders,
  general_info: (state) => state.general_info
}

// Every state change from outside of a module should be invoked as an action.
const actions = {
  resetState ({ commit }) {
    commit('RESET_STATE')
  },
  /* Socket Events */

  // Name of action event repeat's socket's method name in camelCase
  backtestCandlesInfo ({ commit }, { data }) {

  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
