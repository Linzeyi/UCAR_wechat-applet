import Vue from 'vue'
import Vuex from 'vuex'

import Index from './modules/index/index'
import Classification from './modules/classification/index'
import UserCenter from './modules/userCenter/index'
import Goods from './modules/goods/index'
import Order from './modules/order/index'
import ShoppingCart from './modules/shoppingCart/index'
import UserInfo from './modules/userInfo/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Index,
    Classification,
    UserCenter,
    Goods,
    Order,
    ShoppingCart,
    UserInfo
  }
})

export default store
