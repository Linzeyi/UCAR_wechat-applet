import Vue from 'vue'
import Vuex from 'vuex'

import Index from './modules/index/index'
import Classification from './modules/classification/index'
import UserCenter from './modules/userCenter/index'
import GoodsDetail from './modules/goodsDetail/index'
import Order from './modules/order/index'
import UserInfo from './modules/userInfo/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Index,
    Classification,
    UserCenter,
    GoodsDetail,
    Order,
    UserInfo
  }
})

export default store
