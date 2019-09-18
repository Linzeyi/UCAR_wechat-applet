import ws from '@/api/socket.js'
export default {
  namespaced: true,
  state: {
    socket: undefined,
    newMessageList: []
  },
  getters: {
    socket: state => {
      state.socket = ws.initWebSocket()
      return state.socket
    }
  },
  mutations: {
    ADD_NEW_MESSAGE (state, message) {
      state.newMessageList.unshift(message)
    }
  },
  actions: {}
}
