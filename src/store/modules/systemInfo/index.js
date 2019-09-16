export default {
  namespaced: true,
  state: {
    systemInfo: '',
    menuInfo: '',
    navHeight: ''
  },
  getters: {
    scale: state => state.scale,
    menuInfo: state => state.menuInfo,
    customNavHeight: state => state.customNavHeight
  },
  mutations: {
    INIT_SYSTEMINFO(state) {
      const systemInfo = wx.getSystemInfoSync()
      state.systemInfo = systemInfo
      const menuInfo = wx.getMenuButtonBoundingClientRect()
      state.menuInfo = menuInfo
      const customNavHeight =
        menuInfo.height +
        systemInfo.statusBarHeight +
        (menuInfo.top - systemInfo.statusBarHeight) * 2;
      state.customNavHeight = customNavHeight
      state.scale = systemInfo.windowWidth / 750
    }
  },
  actions: {
    InitSystemInfo({ commit }) {
      commit('INIT_SYSTEMINFO')
    }
  }
}
