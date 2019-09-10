import { goodsList } from '@/fake.js'
export default {
  namespaced: true,
  state: {
    goods: {},
    goodsList: goodsList,
    isShowTypeDialog: false
  },
  getters: {
    goodsList: state => state.goodsList,
    goods: state => state.goods,
    isShowTypeDialog: state => state.isShowTypeDialog
  },
  mutations: {
    SET_GOODS (state, goods) {
      state.goods = goods
    },
    SET_SHOWTYPEDIALOG (state, flag) {
      state.isShowTypeDialog = flag
    },
    SET_GOODSTYPE (state, type) {
      state.goods.type = type
    }
  },
  actions: {
  }
}
