import Vue from 'vue'
import Vuex from 'vuex'

import Index from './modules/index/index'
import Classification from './modules/classification/index'
import UserCenter from './modules/userCenter/index'
import Goods from './modules/goods/index'
import Order from './modules/order/index'
import ShoppingCart from './modules/shoppingCart/index'
import BaseStore from './modules/baseStore/index'
import Comment from './modules/comment/index'
import Message from './modules/message/index'
import SystemInfo from './modules/systemInfo/index'
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
    BaseStore,
    Comment,
    Message,
    SystemInfo,
    UserInfo
  }
})

export default store
