export default {
  namespaced: true,
  state: {
    id: '',
    avatarUrl: '',
    email: '',
    nickname: '',
    sex: '',
    phone: ''
  },
  getters: {
    id: state => state.id,
    avatarUrl: state => state.avatarUrl,
    email: state => state.email,
    nickname: state => state.nickname,
    sex: state => state.sex,
    phone: state => state.phone
  },
  mutations: {
    SET_USERINFO(state, userInfo) {
      state.id = userInfo.id
      state.avatarUrl = userInfo.avatarUrl
      state.email = userInfo.email
      state.nickname = userInfo.nickname
      state.sex = userInfo.sex
      state.phone = userInfo.phone
    },
    REMOVE_USERINFO(state) {
      state.id = ''
      state.avatarUrl = ''
      state.email = ''
      state.nickname = ''
      state.sex = ''
      state.phone = ''
    }
  },
  actions: {
  }
}
