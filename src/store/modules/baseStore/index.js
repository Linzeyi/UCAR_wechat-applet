export default {
  namespaced: true,
  state: {
    showToast: false,
    type: 'default',
    content: '',
    duration: 2000
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
    checkCaptcha({ commit }, captcha) {
      if (captcha === '') {
        commit('SHOW_TOAST', { type: 'error', content: '验证码不能为空' })
        return
      }
      if (!/^\d{6}$/.test(captcha)) {
        commit('SHOW_TOAST', { type: 'error', content: '验证码格式错误' })
        return
      }
      return true
    },
    checkPassword({ commit }, password) {
      if (password === '') {
        commit('SHOW_TOAST', { type: 'error', content: '密码不能为空' })
        return
      }
      if (!/^(?=.*\d)(?=.*[a-z])[a-zA-Z\d]{6,20}$/.test(password)) {
        commit('SHOW_TOAST', { type: 'error', content: '密码为6-20位字母数字组合' })
        return
      }
      return true
    },
    checkEmail({ commit }, email) {
      if (email === '') {
        commit('SHOW_TOAST', { type: 'error', content: '邮箱不能为空' })
        return
      }
      if (!/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(email)) {
        commit('SHOW_TOAST', { type: 'error', content: '邮箱格式错误' })
        return
      }
      return true
    },
    checkNickname({ commit }, nickname) {
      if (nickname === '') {
        commit('SHOW_TOAST', { type: 'error', content: '昵称不能为空' })
        return
      }
      if (!/^[A-Za-z0-9\u4e00-\u9fa5]{2,10}$/.test(nickname)) {
        commit('SHOW_TOAST', { type: 'error', content: '昵称为2-10位字母数字或中文字符' })
        return
      }
      return true
    }
  }
}
