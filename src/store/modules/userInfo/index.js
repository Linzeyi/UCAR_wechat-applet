import $http from '@/api/http.js'
export default {
  namespaced: true,
  state: {
    userInfo: {
      id: "",
      avatarUrl: "",
      fid: undefined,
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
  },
  actions: {
    async getUserInfo({ commit }) {
      const result = await $http.get("/action/user/getInfo");
      const userInfo = result.data.memberInfo;
      if (userInfo) {
        commit('SET_USERINFO', userInfo)
      }
    }
  }
}
