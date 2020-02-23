import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import user from './modules/user.js'
import cart from './modules/cart.js'
import goods from './modules/goods.js'




export default new Vuex.Store({
  modules: {
    user,
    cart,
    goods
  }
});
