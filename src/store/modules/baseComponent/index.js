export default {
  namespaced: true,
  state: {
    showActionSheet: false
  },
  getters: {
    showActionSheet: state => state.showActionSheet
  },
  mutations: {
    SET_SHOWACTIONSHEET(state, flag) {
      state.showActionSheet = flag
    }
  },
  actions: {
  }
}
