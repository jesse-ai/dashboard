const getDefaultState = () => {
  return {
    someData: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE (state) {
    Object.assign(state, getDefaultState())
  }
}

const getters = {
  someData: (state) => state.someData
}

const actions = {
  resetState ({ commit }) {
    commit('RESET_STATE')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
