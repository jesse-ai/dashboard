const getDefaultState = () => {
  return {
    isConnected: false
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE (state) {
    Object.assign(state, getDefaultState())
  },
  SET_IS_CONNECTED (state, payload) {
    state.isConnected = payload
  }
}

const getters = {
  isConnected: (state) => state.isConnected
}

const actions = {
  resetState ({ commit }) {
    commit('RESET_STATE')
  },
  setIsConnected ({ commit }) {
    commit('SET_IS_CONNECTED', true)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
