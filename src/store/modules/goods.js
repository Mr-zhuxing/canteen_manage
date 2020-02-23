const state = {
    queryGoods: [],
  },
  mutations = {
    setQueryGoods(state, arr) {
      state.queryGoods = arr;
    },
  },
  getters = {
    getQueryGoods: state => {
      return state.queryGoods;
    }
  },
  actions = {

  };




export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
