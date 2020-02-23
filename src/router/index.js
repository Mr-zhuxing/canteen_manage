import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import goods from '@/components/pages/Goods';
import CategoryList from '@/components/pages/CategoryList.vue'
import Cart from '@/components/pages/Cart.vue'
import Main from '@/components/pages/Main.vue'
import Member from '@/components/pages/Member.vue'
import QueryGoods from '@/components/pages/QueryGoods.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/Main',
      name: 'Main',
      component: Main,
      children: [{
          path: '/',
          redirect: 'ShoppingMall',
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'ShoppingMall',
          name: 'ShoppingMall',
          component: ShoppingMall,
          meta: {
            requireAuth: true,
          },
        }, //path不要加 '/' 。否则判断为根路径下
        {
          path: 'CategoryList',
          name: 'CategoryList',
          component: CategoryList,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'Cart',
          name: 'Cart',
          component: Cart,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'Member',
          name: 'Member',
          component: Member,
          meta: {
            requireAuth: true,
          },
        },
      ],
    },
    {
      path: '/',
      name: 'root',
      redirect: '/Main',
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods,
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/QueryGoods',
      name: 'QueryGoods',
      component: QueryGoods,
      meta: {
        requireAuth: true,
      }
    },
  ]
})
