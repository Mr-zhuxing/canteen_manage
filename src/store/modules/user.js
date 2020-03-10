const state = {
    isLogin: false,
    userId: '',
  },
  mutations = {
    setLoginState(state, OK) {
      state.isLogin = OK;
    },
    getLoginState(state) {
      return state.isLogin;
    },
    setUserId(state, id) {
      state.userId = id;
    }
  },
  getters = {
    getLoginState: state => {
      return state.isLogin;
    },
    getUserId: state =>{
      return state.userId;
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
