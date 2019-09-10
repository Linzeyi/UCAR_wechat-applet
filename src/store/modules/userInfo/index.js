export default {
  namespaced: true,
  state: {
    showToast: false,
    type: 'default',
    content: '',
    duration: 1500
  },
  getters: {
    showToast: state => state.showToast,
    type: state => state.type,
    content: state => state.content,
    duration: state => state.duration
  },
  mutations: {
    SHOW_TOAST(state, { type, content }) {
      state.showToast = true
      state.type = type
      state.content = content
    }
  },
  actions: {
    checkPhone({ commit }, phone) {
      if (phone === '') {
        commit('SHOW_TOAST', { type: 'error', content: '手机号不能为空' })
        return
      }
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        commit('SHOW_TOAST', { type: 'error', content: '手机号格式错误' })
        return
      }
      return true
    },
    checkCaptcha({commit}, captcha) {
      if (captcha === '') {
        commit('SHOW_TOAST', { type: 'error', content: '验证码不能为空' })
        return
      }
      if (!/^\d{8}$/.test(captcha)) {
        commit('SHOW_TOAST', { type: 'error', content: '验证码格式错误' })
        return
      }
      return true
    },
    checkPassword({commit}, password) {
      if (password === '') {
        commit('SHOW_TOAST', { type: 'error', content: '密码不能为空' })
        return
      }
      if (!/^[a-zA-Z0-9]{6,20}$/.test(password)) {
        commit('SHOW_TOAST', { type: 'error', content: '密码为6-20位字母或数字' })
        return
      }
      return true
    }
  }
}
