export default {
  namespaced: true,
  state: {
    systemInfo: '',
    menuInfo: '',
    navHeight: ''
  },
  getters: {
    systemInfo: state => state.systemInfo,
    usableHeight: state => state.usableHeight,
    usableWidth: state => state.usableHeight,
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
      state.usableHeight = systemInfo.windowHeight - customNavHeight// 初始化可用高度：首页设置自定义导航栏时，可用高度需减去自定义导航栏高度
      state.usableWidth = systemInfo.windowWidth
      state.scale = systemInfo.windowWidth / 750
    }
  },
  actions: {
    InitSystemInfo({ commit }) {
      commit('INIT_SYSTEMINFO')
    }
  }
}
