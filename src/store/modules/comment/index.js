export default {
  namespaced: true,
  state: {
    order: {},
    comment: {}
  },
  getters: {
    order: state => state.order,
    comment: state => state.comment
  },
  mutations: {
    SET_ORDER (state, order) {
      state.order = order
    },
    SET_COMMENT (state, comment) {
      state.comment = comment
    }
  },
  actions: {
  }
}
