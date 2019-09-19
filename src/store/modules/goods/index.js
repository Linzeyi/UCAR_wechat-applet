import { goodsList } from '@/fake.js'
export default {
  namespaced: true,
  state: {
    goods: {},
    goodsList: goodsList,
    isShowTypeDialog: false,
    property: {}
  },
  getters: {
    goodsList: state => state.goodsList,
    goods: state => state.goods,
    isShowTypeDialog: state => state.isShowTypeDialog,
    property: state => state.property
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
    },
    SET_NUM (state, num) {
      state.goods.num = num
    },
    SET_PROPERTY (state, property) {
      state.property = property
    }
  },
  actions: {
  }
}
