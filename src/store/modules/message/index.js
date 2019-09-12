import ws from '@/api/socket.js'
export default {
  namespaced: true,
  state: {
    socket: undefined
  },
  getters: {
    socket: state => {
      state.socket = ws.initWebSocket()
      return state.socket
    }
  },
  mutations: {},
  actions: {}
}
