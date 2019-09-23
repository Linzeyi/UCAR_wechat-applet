export default {
  namespaced: true,
  state: {
    userInfo: {
      id: "",
      avatarUrl: "",
      nickname: "",
      email: "",
      sex: -1,
      phone: ''
    }
  },
  getters: {
    userInfo: state => state.userInfo
  },
  mutations: {
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    REMOVE_USERINFO(state) {
      state.userInfo = {}
    }
  }
}
