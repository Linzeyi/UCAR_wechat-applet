export default {
  namespaced: true,
  state: {
    systemInfo: ''
  },
  getters: {
    systemInfo: state => state.systemInfo
  },
  mutations: {
    INIT_SYSTEMINFO(state, systemInfo) {
      state.systemInfo = systemInfo
    }
  },
  actions: {
    InitSystemInfo({ commit }) {
      const systemInfo = wx.getSystemInfoSync()
      commit('INIT_SYSTEMINFO', systemInfo)
    }
  }
}
