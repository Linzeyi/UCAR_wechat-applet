export default {
  namespaced: true,
  state: {
    goodsList: []
  },
  getters: {
    goodsList: state => state.goodsList
  },
  mutations: {
    SET_GOODSLIST (state, goodsList) {
      state.goodsList = goodsList
    }
  },
  actions: {
    ShowStore ({commit}) {
      console.log('indexStore')
      return 'index'
    }
  }
}
