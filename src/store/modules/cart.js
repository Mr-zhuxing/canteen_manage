const state = {
    cartInfo: [],
  },
  mutations = {
    init(state, arr) {
      state.cartInfo = arr;
    },
    changeGoodsCount(state, info) {
      return state.cartInfo.find((item, index) => {
        if (item.goodsId == info.goodsId) {
          state.cartInfo[index]['count'] = info.count;
          // console.log(info)
        }
        return item.goodsId == info.goodsId;
      })
    },
    clearCartInfo(state) {
      state.cartInfo = [];
    }
  },
  getters = {
    getCartInfo: state => {
      return state.cartInfo;
    }
  },
  actions = {
    init({
      commit,
    }) {
      if (localStorage.cartInfo) {
        let arr = JSON.parse(localStorage.cartInfo)
        commit('init', arr)
      }
    },
    changeGoodsCount({
      state,
      commit,
      getters
    }, info) {
      commit('changeGoodsCount', info);
      localStorage.setItem('cartInfo', JSON.stringify(getters.getCartInfo));
    },
    clearCartInfo({
      state,
      commit
    }) {
      commit('clearCartInfo');
      localStorage.cartInfo = JSON.stringify([]);
    }
  };




export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
