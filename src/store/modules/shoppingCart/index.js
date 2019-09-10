import { shoppingCartGoodsList } from '@/fake.js'
export default {
  namespaced: true,
  state: {
    goodsList: shoppingCartGoodsList
  },
  getters: {
    goodsList: state => state.goodsList
  },
  mutations: {
    SET_GOODSLIST (state, goodsList) {
      state.goodsList = goodsList
    },
    ADD_GOODS (state, goods) {
      state.goodsList.push(goods)
    }
  },
  actions: {
  }
}
