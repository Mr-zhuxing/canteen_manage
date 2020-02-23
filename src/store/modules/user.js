const state = {
    isLogin: false,
  },
  mutations = {
    setLoginState(state, OK) {
      state.isLogin = OK;
    },
    getLoginState(state) {
      return state.isLogin;
    },
  },
  getters = {
    getLoginState: state => {
      return state.isLogin;
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
