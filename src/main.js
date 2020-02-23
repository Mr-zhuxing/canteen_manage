// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/index.js'
import {
  Button,
  Row,
  Col,
  Swipe,
  SwipeItem,
  Lazyload,
  List,
  NavBar,
  Field,
  Cell,
  CellGroup,
  Tab,
  Tabs,
  PullRefresh,
  Stepper,
  Tabbar,
  TabbarItem,  
} from 'vant'




Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem)
  .use(List).use(NavBar).use(Field).use(CellGroup).use(Tab)
  .use(Tabs).use(PullRefresh).use(Stepper).use(Tabbar).use(TabbarItem)
  .use(Cell).use(Lazyload,{
    error: require('./assets/images/errorimg.png'),
  });

Vue.config.productionTip = false








//登录验证
router.beforeEach((to, from, next) => {
  // console.log(from, to)
  // console.log(store.state.user.isLogin)
  // console.log(store.getters['user/getLoginState'])
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (store.getters['user/getLoginState']) { // 通过Vuex中的状态判断
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    // 需要将上个页面路由记住
    // console.log(to.fullPath)
    next({
      query: {
        redirect: to.fullPath
      } // 将跳转的路由path作为参数，登录成功后跳转到该路由
    });
  }
});




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
