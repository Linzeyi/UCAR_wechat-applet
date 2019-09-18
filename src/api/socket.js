let connection = 10 // 断开重连次数
let socket = {}
// let firstConnect = true // 初次连接
export function initWebSocket () {
  try {
    socket = wx.connectSocket({
      url: 'ws://10.112.12.45:8080/trainljsys/websocket/' + 123,
      // url: 'ws://10.112.11.18:8090',
      // url: 'ws://localhost:8181',
      success () {
        console.log('[Socket] 创建连接…')
        // firstConnect = false
      }
    })
    wx.onSocketOpen(() => {
      console.log('[Socket] 连接成功！')
      connection = 10
      wx.sendSocketMessage({
        data: '前端连接成功！'
      })
    })
    wx.onSocketClose(() => {
      if (connection > 0) {
        console.log(`[Socket] 重新连接…${11 - connection}`)
        connection--
        setTimeout(initWebSocket, 5000)
      } else {
        console.log('[Socket] 连接超时')
      }
    })
    wx.onSocketMessage(res => {
      console.log('[Socket] 收到一条消息：', res.data)
      // todo 处理data，去除‘/’
      this.$store.commit('Message/ADD_NEW_MESSAGE', res.data)
    })
    return socket
  } catch (e) {
    console.log('[Socket Error]', e)
  }
}
// }

export function closeWebSocket () {
  console.log('关闭socket')
  wx.closeSocket()
}

export default {
  initWebSocket,
  closeWebSocket
}
