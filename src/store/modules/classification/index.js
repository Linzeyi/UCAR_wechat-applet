export default {
  namespaced: true,
  state: {
    selectClassIndex: 0
  },
  getters: {
    selectClassIndex: state => state.selectClassIndex
  },
  mutations: {
    SET_SELECTCLASSINDEX(state, index) {
      state.selectClassIndex = index
    }
  }
}
