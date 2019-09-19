import Utils from '@/utils/index.js'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    socket: undefined,
    messageList: undefined, // status: 0未读 1已读
    connection: 10 // 断开重新连接次数
  },
  getters: {
    socket: state => state.socket,
    newMessageList: state => {
      return (state.messageList ? false : []) ||
        state.messageList.filter(item => item.status === 0)
          .map(item => {
            item.dateTime = Utils.timestampTo(item.createTime)
            Vue.set(item, 'isRead', false)
            Vue.set(item, 'isShow', false)
            return item
          })
    },
    oldMessageList: state => {
      return (state.messageList ? false : []) ||
        state.messageList.filter(item => item.status === 1)
          .map(item => {
            item.dateTime = Utils.timestampTo(item.createTime)
            Vue.set(item, 'isShow', true)
            return item
          })
    }
  },
  mutations: {
    SET_MESSAGE_LIST (state, list) {
      state.messageList = list
    },
    INIT_WEBSOCKET (state) {
      let that = this
      try {
        state.socket = wx.connectSocket({
          // todo 123 = uid
          url: 'ws://10.112.12.45:8080/trainljsys/websocket/' + 123,
          // url: 'ws://10.112.11.18:8090',
          // url: 'ws://localhost:8181',
          success () {
            console.log('[Socket] 创建连接…')
          }
        })
        wx.onSocketOpen(() => {
          console.log('[Socket] 连接成功！')
          state.connection = 10
          wx.sendSocketMessage({
            data: '前端连接成功！'
          })
        })
        wx.onSocketClose(() => {
          if (state.connection > 0) {
            console.log(`[Socket] 重新连接…${11 - state.connection}`)
            state.connection--
            setTimeout(() => that.commit('Message/INIT_WEBSOCKET'), 5000)
          } else {
            console.log('[Socket] 连接超时')
          }
        })
        wx.onSocketMessage(res => {
          console.log('[Socket] 收到一条消息：', res.data)
          // todo 处理data，去除‘/’
          that.commit('Message/ADD_NEW_MESSAGE', res.data)
        })
      } catch (e) {
        console.log('[Socket Error]', e)
      }
    },
    CLOSE_WEBSOCKET (state) {
      if (state.socket) {
        state.socket.closeSocket()
      }
      console.log('[Socket] 关闭socket')
    },
    ADD_NEW_MESSAGE (state, message) {
      state.newMessageList.unshift(message)
    }
  },
  actions: {
    initWebSocket (state) {
      let that = this
      try {
        state.socket = wx.connectSocket({
          // url: 'ws://10.112.12.45:8080/trainljsys/websocket/' + 123,
          // url: 'ws://10.112.11.18:8090',
          url: 'ws://localhost:8181',
          success () {
            console.log('[Socket] 创建连接…')
          }
        })
        wx.onSocketOpen(() => {
          console.log('[Socket] 连接成功！')
          state.connection = 10
          wx.sendSocketMessage({
            data: '前端连接成功！'
          })
        })
        wx.onSocketClose(() => {
          if (state.connection > 0) {
            console.log(`[Socket] 重新连接…${11 - state.connection}`)
            state.connection--
            setTimeout(that.commit('Message/INIT_WEBSOCKET'), 5000)
          } else {
            console.log('[Socket] 连接超时')
          }
        })
        wx.onSocketMessage(res => {
          console.log('[Socket] 收到一条消息：', res.data)
          // todo 处理data，去除‘/’
          that.commit('Message/ADD_NEW_MESSAGE', res.data)
        })
      } catch (e) {
        console.log('[Socket Error]', e)
      }
    }
  }
}
