const getDefaultState = () => {
  return {
    candlesInfo: {},
    routesInfo: [],
    progressbar: {
      current: 0,
      estimated_remaining_seconds: 0
    },
    metrics: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE (state) {
    Object.assign(state, getDefaultState())
  },
  SET_CANDLES_INFO (state, payload) {
    state.candlesInfo = payload
  },
  SET_ROUTES_INFO (state, payload) {
    state.routesInfo = payload
  },
  SET_PROGRESSBAR (state, payload) {
    state.progressbar = payload
  },
  SET_METRICS (state, payload) {
    state.metrics = payload
  }
}

// The Vuex state, except of mutations, should always be accessed by getters, including actions
const getters = {
  candlesInfo: (state) => state.candlesInfo,
  routesInfo: (state) => state.routesInfo,
  progressbar: (state) => state.progressbar,
  currentRoundedProgress: (state) => {
    return Math.round(state.progressbar.current)
  },
  metrics: (state) => state.metrics
}

// Every state change from outside of a module should be invoked as an action
const actions = {
  resetState ({ commit }) {
    commit('RESET_STATE')
  },
  /* Socket Events */

  // Name of action event repeat's socket's method name in camelCase
  candlesInfo ({ commit }, { data }) {
    console.log('candlesInfo', data)
    commit('SET_CANDLES_INFO', data)
  },
  routesInfo  ({ commit }, { data }) {
    commit('SET_ROUTES_INFO', data)
  },
  progressbar  ({ commit }, { data }) {
    commit('SET_PROGRESSBAR', data)
  },
  metrics  ({ commit }, { data }) {
    commit('SET_METRICS', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
