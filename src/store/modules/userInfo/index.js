export default {
  namespaced: true,
  state: {
    id: '',
    avatarUrl: '',
    email: '',
    nickname: '',
    sex: ''
  },
  getters: {
    id: state => state.id,
    avatarUrl: state => state.avatarUrl,
    email: state => state.email,
    nickname: state => state.nickname,
    sex: state => state.sex
  },
  mutations: {
    SET_USERINFO(state, userInfo) {
      state.id = userInfo.id
      state.avatarUrl = userInfo.avatarUrl
      state.email = userInfo.email
      state.nickname = userInfo.nickname
      state.sex = userInfo.sex
    }
  },
  actions: {
  }
}
